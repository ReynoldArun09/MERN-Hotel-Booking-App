"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
exports.env = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]),
    PORT: zod_1.z.string().min(1).max(4),
    MONGO_URI: zod_1.z.string().min(1),
    ORIGIN: zod_1.z.string().min(1),
    SECRET: zod_1.z.string().min(1),
    CLOUDINARY_CLOUD_NAME: zod_1.z.string().min(1),
    CLOUDINARY_API_KEY: zod_1.z.string().min(1),
    CLOUDINARY_API_SECRET: zod_1.z.string().min(1),
    STRIPE_API_KEY: zod_1.z.string().min(1),
});
