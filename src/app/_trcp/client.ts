import { createTRPCReact } from '@trpc/react-query'

import { type AppRouter } from '@/server'

const trpc = createTRPCReact<AppRouter>({})

export default trpc
