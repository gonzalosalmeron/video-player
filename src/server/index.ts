import { publicProcedure, router } from './trpc'

export const appRouter = router({
  getMovies: publicProcedure.query(async () => {
    return 10
  }),
})

export type AppRouter = typeof appRouter
