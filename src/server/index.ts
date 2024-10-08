import { publicProcedure, router } from './trpc'
import { z } from 'zod'

import { MovieDetails, ResponseTMDB, VideosResponse } from '@/types'

const apiUrl = process.env.TMDB_URL ?? ''
const apiKey = process.env.TMDB_API_KEY ?? ''

export const appRouter = router({
  getMovies: publicProcedure.query(async () => {
    try {
      const res = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`)
      const data: ResponseTMDB = await res.json()
      return data
    } catch (error) {
      console.error('Error fetching movies:', error)
      throw new Error('Failed to fetch movies')
    }
  }),
  getMovie: publicProcedure
    .input(
      z.object({
        movieId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { movieId } = input

      try {
        // fetch movie details and trailers concurrently
        const [movieRes, videosRes] = await Promise.all([
          fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`),
          fetch(`${apiUrl}/movie/${movieId}/videos?api_key=${apiKey}`),
        ])

        // check if both responses are successful
        if (!movieRes.ok || !videosRes.ok) {
          throw new Error(
            `Failed to fetch movie or trailers for ID: ${movieId}`
          )
        }

        const movieData: MovieDetails = await movieRes.json()
        const videosData: VideosResponse = await videosRes.json()

        if (videosData?.results) {
          // return just Trailer videos type
          videosData.results = videosData.results.filter(
            (video) => video.type === 'Trailer'
          )
        }

        return {
          movie: movieData,
          trailers: videosData.results,
        }
      } catch (error) {
        console.error(
          `Error fetching movie or videos for ID: ${movieId}`,
          error
        )
        throw new Error('Failed to fetch movie info or videos')
      }
    }),
})

export type AppRouter = typeof appRouter
