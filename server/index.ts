import { client } from './discord/client'
import { handler } from './rpc/orpc'

await client.login(process.env.DISCORD_TOKEN)

Bun.serve({
	port: process.env.PORT,
	async fetch(request: Request) {
		const { matched, response } = await handler.handle(request, {
			prefix: '/rpc',
			context: {},
		})

		if (matched) {
			return response
		}

		return new Response('No suitable RPC route found', { status: 404 })
	},
})
