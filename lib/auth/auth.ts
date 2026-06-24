import { betterAuth } from "better-auth";
import { memoryAdapter } from "better-auth/adapters/memory";

export const auth = betterAuth({
    database: memoryAdapter({
        user: [],
        session: [],
        account: [],
        verification: [],
    }),
    emailAndPassword: {
        enabled: true,
    },
});
