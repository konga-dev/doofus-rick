<script>
    import '../app.css'

    let year = new Date().getFullYear()
</script>

<div class="max-w-screen flex min-h-screen justify-center bg-zinc-950 px-8 py-24 text-gray-200">
    <main class="flex w-[700px] flex-col space-y-8">
        <header class="flex flex-row items-center space-x-4">
            <img src="/doofus-rick.png" class="h-24 rounded-full" alt="doofus rick" />
            <div class="flex flex-col">
                <p class="text-2xl font-semibold">doofus-rick</p>
                <p>cause it can't be worse than this</p>
            </div>
        </header>
        <slot />
        <footer>
            <p class="text-sm text-gray-400">&copy; {year} Josholaus</p>
        </footer>
    </main>
</div>
