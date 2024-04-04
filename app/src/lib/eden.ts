import { edenFetch, edenTreaty } from '@elysiajs/eden'
import type { Server } from '../../../server/src/elysia/Server'

const target =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://doofus-rick-api.josholaus.com'

export const treaty = edenTreaty<Server>(target)

export const fetch = edenFetch<Server>(target)
