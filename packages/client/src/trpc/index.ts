import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../../server/src/trpc/router'

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

async function main() {
  const result = await client.greet.query('tRPC')

  // Type safe
  console.log(result.greeting.toUpperCase())
}

void main()