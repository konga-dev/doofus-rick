<script lang="ts">
    import Quote from '../components/quote.svelte'
    import TextInput from '../components/ui/textinput.svelte'
    import type { PageData } from './$types'

    export let data: PageData

    let searchValue = ''

    $: filteredQuotes = data.quotes.filter((quote) => {
        return quote.content.toLowerCase().includes(searchValue.toLowerCase())
    })
</script>

<TextInput placeholder="Search..." bind:value={searchValue} />

<section class="flex flex-col space-y-4">
    {#if filteredQuotes.length === 0}
        <div class="flex flex-col items-center space-y-8">
            <img class="h-52" src="/poopybutthole.png" alt="Mr. Poopybutthole" />
            <p class="text-lg font-semibold italic">ooh wee</p>
        </div>
    {:else}
        {#each filteredQuotes as quote}
            <Quote {quote} />
        {/each}
    {/if}
</section>
