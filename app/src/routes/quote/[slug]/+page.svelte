<script lang="ts">
    import { formatDate } from '$lib/date'
    import Quote from '../../../components/quote.svelte'
    import type { PageData } from './$types'

    export let data: PageData
    let quote = data.quote
</script>

<svelte:head>
    <meta property="og:title" content="doofus-rick Zitat vom {formatDate(new Date(quote.timestamp))}" />
    <meta property="og:description" content="{quote.content}" />
    <meta property="og:url" content={`https://doofus-rick.com/quote/${quote._id?.toString()}`} />
    <meta property="og:image" content={quote.creator?.avatar} />
    <meta property="og:image:alt" content={`${quote.creator?.name}'s avatar`} />
    <meta property="og:type" content="article" />
</svelte:head>

<Quote {quote} />
