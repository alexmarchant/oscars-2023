import {
  createTRPCProxyClient,
  httpBatchLink,
  TRPCClientError,
  HTTPHeaders,
} from '@trpc/client'
import type { AppRouter } from '@am-oscar-2023/server'
import { useAuthStore } from '../stores/auth'

export function isTRPCClientError(
  cause: unknown,
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError
}

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      headers() {
        const headers: HTTPHeaders = {}

        const { token } = useAuthStore.getState()
        if (token) {
          headers.Authorization = `Bearer ${token}`
        }

        return headers
      },
    }),
  ],
})

export type UserSession = Awaited<ReturnType<typeof client.session.query>>