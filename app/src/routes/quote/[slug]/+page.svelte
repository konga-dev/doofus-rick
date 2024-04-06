<script lang="ts">
    import Quote from '../../../components/quote.svelte'
    import type { PageData } from './$types'

    export let data: PageData
    let quote = data.quote
</script>

<svelte:head>
    <title>doofus-rick - {quote.content.substring(0, 25)}...</title>
</svelte:head>

<Quote {quote} />
