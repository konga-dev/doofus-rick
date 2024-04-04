import { fetch } from '$lib/eden'
import { error as emitError, redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
    const { data, error } = await fetch('/quote/random', {})
    if (error) {
        emitError(error.status, error.message)
    }
    if (!data) {
        emitError(404, 'Quote not found')
    }
    throw redirect(307, '/quote/' + data)
}
