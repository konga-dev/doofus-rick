<script>
    import '../app.css'
    import SparklesIcon from '../components/icons/sparkles-icon.svelte'
    import Button from '../components/ui/button.svelte'

    const year = new Date().getFullYear()
    const randomClick = () => {
        window.location.href = '/quote/random'
    }
</script>

<div class="max-w-screen flex min-h-screen justify-center bg-zinc-950 px-8 py-24 text-gray-200">
    <main class="flex w-[700px] flex-col space-y-8">
        <div class="flex w-full">
            <a href="/" title="Zur Startseite">
                <header class="flex flex-row items-center space-x-4">
                    <img src="/doofus-rick.png" class="h-24 rounded-full" alt="doofus rick" />
                    <div class="flex flex-col">
                        <p class="text-2xl font-semibold">doofus-rick</p>
                        <p>cause it can't be worse than this</p>
                    </div>
                </header>
            </a>
            <div class="flex grow items-center justify-end">
                <Button click={randomClick}>
                    <SparklesIcon slot="icon" />
                    <svelte:fragment slot="content">Random Quote</svelte:fragment>
                </Button>
            </div>
        </div>
        <slot />
        <footer>
            <p class="text-sm text-gray-400">
                &copy; {year} <a href="https://josholaus.com" target="_blank">Josholaus</a>
            </p>
        </footer>
    </main>
</div>
