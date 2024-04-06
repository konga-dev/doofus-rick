<script lang="ts">
    import { formatDate, getAnniversaryYears } from '$lib/date'
    import type { PageData } from '../routes/$types'
    import ExternalIcon from './icons/external-icon.svelte'
    import Card from './ui/card.svelte'
    type Quote = PageData['quotes'][0]

    export let quote: Quote

    $: anniversaryYears = getAnniversaryYears(new Date(quote.timestamp))
</script>

<Card>
    <svelte:fragment slot="content">
        <span class="font-serif text-8xl text-zinc-300">”</span>
        <p class="whitespace-pre-line text-lg italic">{quote.content}</p>
    </svelte:fragment>

    <svelte:fragment slot="footer">
        <div class="flex flex-col items-center space-x-2 space-y-2 text-neutral-400 md:flex-row md:space-y-0">
            <span>Festgehalten von</span>
            <div class="flex space-x-2">
                <img class="h-6 rounded-full" src={quote.creator?.avatar} alt={`${quote.creator?.name}'s avatar`} />
                <span>{quote.creator?.name}</span>
            </div>
            <span>
                am{' '}
                {formatDate(new Date(quote.timestamp))}
            </span>
            <a
                href="/quote/{quote._id?.toString()}"
                class="hover:text-neutral-300"
                title="Direktlink besuchen"
                target="_blank"><ExternalIcon /></a>
        </div>
        {#if anniversaryYears !== null}
            <span class="font-semibold text-neutral-400"
                >Heute vor {anniversaryYears} Jahr{anniversaryYears !== 1 ? 'en' : ''} 🎉</span>
        {/if}
    </svelte:fragment>
</Card>
