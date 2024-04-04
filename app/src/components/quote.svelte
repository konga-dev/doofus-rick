<script lang="ts">
    import Card from './ui/card.svelte'
    import type { PageData } from '../routes/$types'
    type Quote = PageData['quotes'][0]

    export let quote: Quote
</script>

<Card>
    <svelte:fragment slot="content">
        <span class="font-serif text-8xl text-zinc-300">”</span>
        <p class="whitespace-pre-line text-lg italic">{quote.content}</p>
    </svelte:fragment>
    <div slot="footer" class="flex flex-col items-center space-x-2 space-y-2 text-neutral-400 md:flex-row md:space-y-0">
        <span>Festgehalten von</span>
        <div class="flex space-x-2">
            <img class="h-6 rounded-full" src={quote.creator?.avatar} alt={`${quote.creator?.name}'s avatar`} />
            <span>{quote.creator?.name}</span>
        </div>
        <span>
            am{' '}
            {new Date(quote.timestamp).toLocaleDateString('de-AT', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}
        </span>
    </div>
</Card>
