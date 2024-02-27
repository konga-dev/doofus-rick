import { z } from 'zod'

const environmentVariables = z.object({
    MONGODB_URI: z.string(),
    MONGODB_INITDB_DATABASE: z.string(),
    DISCORD_TOKEN: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_GUILD_QQT_ID: z.string()
})

environmentVariables.parse(process.env)

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof environmentVariables> {}
    }
}