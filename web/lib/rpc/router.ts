import { os } from '@orpc/server'
import { cakeday, create, random } from './quote'

export const router = {
	quote: { random, cakeday, create },
}
