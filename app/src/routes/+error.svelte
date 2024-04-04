<script>
    import { page } from '$app/stores'
</script>

<div class="flex flex-col space-y-4">
    <h1 class="text-4xl font-bold">{$page.status}</h1>
    <p>{$page.error?.message}</p>
</div>
