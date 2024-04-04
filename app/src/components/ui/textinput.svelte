<script lang="ts">
    export let placeholder: string
    export let value: string
</script>

<input
    type="text"
    {placeholder}
    bind:value
    class="bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
