import { dev } from '$app/environment'
import { edenFetch, edenTreaty } from '@elysiajs/eden'
import type { Server } from '../../../server/src/elysia/Server'

const target = dev ? 'http://localhost:3000' : 'http://doofus-rick:3000'

export const treaty = edenTreaty<Server>(target)

export const fetch = edenFetch<Server>(target)
