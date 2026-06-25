import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const client = new MongoClient(process.env.MONGODB_URI!);
await client.connect();
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
    },
});

export async function getSession() {
    try {
        const result = await auth.api.getSession({
            headers: await headers()
        })
        return result;
    } catch (error) {
        console.warn('Failed to get session:', error);
        return null;
    }
}

export async function signOut() {
    try {
        const result = await auth.api.signOut({
            headers: await headers()
        })
        if (result.success) {
            redirect("/sign-in")
        }
    } catch (error) {
        console.warn('Failed to logout:', error);
        return null;
    }
}