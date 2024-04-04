<script lang="ts">
</script>

<div class="text-card-foreground rounded-xl border border-zinc-800 bg-zinc-900 shadow-sm">
    <div class="flex items-center space-x-4 px-8 pt-8">
        <slot name="content" />
    </div>
    <div class="flex items-center justify-center p-6">
        <slot name="footer" />
    </div>
</div>
