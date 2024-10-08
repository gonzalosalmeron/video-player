import { publicProcedure, router } from './trpc'

import { ResponseTMDB } from '@/types'

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
})

export type AppRouter = typeof appRouter
