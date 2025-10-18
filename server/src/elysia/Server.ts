import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { serverTiming } from '@elysiajs/server-timing'
import { quotePlugin, discordPlugin } from './plugins'
import { auth } from "./Auth";

const server = new Elysia()
	.state('name', 'doofus-rick API')
	.state('version', 1)
	.use(cors({
		origin: Bun.env.WEB_URL,
		credentials: true
	}))
	.use(swagger())
	.use(serverTiming())
	.all('/api/auth/*', ({ request }) => {
		console.log("Incoming cookies:", request.headers.get("cookie"));
		return auth.handler(request)
	})
	.get('/', ({ store: { name, version } }) => ({ name, version }))
	.use(quotePlugin)
	.use(discordPlugin)

export { server }
export type Server = typeof server
