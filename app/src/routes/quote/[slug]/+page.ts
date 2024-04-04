import { fetch } from '$lib/eden'
import { error as emitError } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
    const { data, error } = await fetch('/quote/byId/:id', {
        params: {
            id: params.slug,
        },
    })
    if (error) {
        emitError(error.status, error.message)
    }
    if (!data) {
        emitError(404, 'Quote not found')
    }
    return {
        quote: data,
    }
}
