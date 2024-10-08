import { publicProcedure, router } from './trpc'
import { z } from 'zod'

import prisma from '@/lib/db'
import { MovieDetails, ResponseTMDB, VideosResponse } from '@/types'

const apiUrl = process.env.TMDB_URL ?? ''
const apiKey = process.env.TMDB_API_KEY ?? ''

const fetchTMDB = async <T>(endpoint: string): Promise<T> => {
  const url = `${apiUrl}${endpoint}?api_key=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`TMDB API request failed: ${res.statusText}`)
  }
  return res.json()
}

export const appRouter = router({
  getMovies: publicProcedure.query(async () => {
    try {
      return await fetchTMDB<ResponseTMDB>('/movie/popular')
    } catch (error) {
      console.error('Error fetching movies:', error)
      throw new Error('Failed to fetch movies')
    }
  }),
  getMovie: publicProcedure
    .input(z.object({ movieId: z.string() }))
    .query(async ({ input }) => {
      try {
        const [movie, videos] = await Promise.all([
          fetchTMDB<MovieDetails>(`/movie/${input.movieId}`),
          fetchTMDB<VideosResponse>(`/movie/${input.movieId}/videos`),
        ])

        const trailers =
          videos.results?.filter((video) => video.type === 'Trailer') || []

        const trailerStats = await prisma.trailer.findMany({
          where: {
            id: {
              in: trailers.map((trailer) => trailer.id),
            },
          },
          select: {
            id: true,
            views: true,
            likes: true,
          },
        })

        const statsMap = new Map(trailerStats.map((stat) => [stat.id, stat]))

        const trailersWithStats = trailers.map((trailer) => ({
          ...trailer,
          views: statsMap.get(trailer.id)?.views || 0,
          likes: statsMap.get(trailer.id)?.likes || 0,
        }))

        return {
          movie,
          trailers: trailersWithStats,
        }
      } catch (error) {
        console.error(
          `Error fetching movie or videos for ID: ${input.movieId}`,
          error
        )
        throw new Error('Failed to fetch movie info or videos')
      }
    }),
  incrementViews: publicProcedure
    .input(z.object({ trailerId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await prisma.trailer.upsert({
          where: { id: input.trailerId },
          update: { views: { increment: 1 } },
          create: { id: input.trailerId, views: 1 },
        })
      } catch (error) {
        console.error(
          `Error incrementing views for trailer ID: ${input.trailerId}`,
          error
        )
        throw new Error('Failed to increment trailer views')
      }
    }),
  toggleLike: publicProcedure
    .input(
      z.object({
        trailerId: z.string(),
        liked: z.boolean(),
      })
    )
    .mutation(async ({ input: { trailerId, liked } }) => {
      try {
        await prisma.trailer.upsert({
          where: { id: trailerId },
          update: { likes: liked ? { increment: 1 } : { decrement: 1 } },
          create: { id: trailerId, likes: 1 },
        })
      } catch (error) {
        console.error(
          `Error incrementing likes for trailer ID: ${trailerId}`,
          error
        )
        throw new Error('Failed to increment trailer likes')
      }
    }),
})

export type AppRouter = typeof appRouter
