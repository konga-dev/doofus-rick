import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { RouterClient } from '@orpc/server'
import type { router } from '../../web/lib/rpc/router.ts'

const link = new RPCLink({
	url: `${process.env.WEB_URL}/rpc`,
})

export const client: RouterClient<typeof router> = createORPCClient(link)
