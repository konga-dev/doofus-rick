<script lang="ts">
    export let click: () => void
</script>

<button
    on:click={click}
    class="flex space-x-2 rounded-md border border-zinc-800 bg-zinc-900 px-5 py-2 text-sm font-semibold leading-5 text-white shadow-sm ring-zinc-600 transition-transform hover:bg-zinc-700/40 focus:ring-4 active:scale-95">
    <div>
        <slot name="icon" />
    </div>
    <span>
        <slot name="content" />
    </span>
</button>
