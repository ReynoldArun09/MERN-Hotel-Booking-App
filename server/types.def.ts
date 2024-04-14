import {z} from 'zod'

export const env = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    PORT: z.string().min(1).max(4),
    MONGO_URI: z.string().min(1),
    ORIGIN: z.string().min(1),
    SECRET: z.string().min(1),
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
    STRIPE_API_KEY: z.string().min(1)
})

declare global {
    namespace NodeJS {
        export interface ProcessEnv extends z.infer<typeof env> {}
    }
}