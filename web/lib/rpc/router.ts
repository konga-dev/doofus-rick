import { os } from '@orpc/server'
import { create, random } from './quote'

export const router = os.router({
	quote: { random, create },
})
