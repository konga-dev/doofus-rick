<script lang="ts">
    import Quote from '../../../components/quote.svelte'
    import type { PageData } from './$types'

    export let data: PageData
    let quote = data.quote
</script>

<Quote {quote} />
