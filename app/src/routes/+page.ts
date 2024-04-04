import { fetch } from '$lib/eden'
import { error as emitError } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
    const { data, error } = await fetch('/quote', {})
    if (error) {
        emitError(error.status, error.message)
    }
    return {
        quotes: data,
    }
}
