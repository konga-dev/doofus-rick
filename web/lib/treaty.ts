import { treaty } from '@elysiajs/eden'
import type { Server } from '../../server/src/elysia/Server'

const client = treaty<Server>(process.env.PRIVATE_BACKEND ?? "localhost:3000")

export { client }
