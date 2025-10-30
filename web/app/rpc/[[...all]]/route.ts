import { RPCHandler } from '@orpc/server/fetch'
import { router } from '../../../lib/rpc/router'

const handler = new RPCHandler(router)

const handleRequest = async (request: Request) => {
	const { response } = await handler.handle(request, {
		prefix: '/rpc',
		context: {},
	})

	return (
		response ?? new Response('No suitable RPC route found', { status: 404 })
	)
}

export const HEAD = handleRequest
export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const PATCH = handleRequest
export const DELETE = handleRequest
