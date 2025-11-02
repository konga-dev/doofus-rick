import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { RouterClient } from '@orpc/server'
import { router } from '@server/rpc/orpc'

const link = new RPCLink({
	url: `${process.env.SERVER_URL}/rpc`,
})

export const client: RouterClient<typeof router> = createORPCClient(link)
