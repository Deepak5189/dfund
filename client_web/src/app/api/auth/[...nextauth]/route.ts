import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // ── TODO: replace with your real backend call ──────────────────────
        // const res = await fetch(`${process.env.API_URL}/auth/login`, {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();
        // if (!res.ok || !user) return null;
        // return user;
        // ──────────────────────────────────────────────────────────────────

        // Stub: accept any non-empty credentials for now
        if (credentials?.email && credentials?.password) {
          return {
            id: "1",
            name: "Test User",
            email: credentials.email,
          };
        }
        return null;
      },
    }),
  ],

  callbacks: {
    // Attach user id to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Expose id on the session object
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",       // redirect here when unauthenticated
    error: "/login",        // auth errors also go here
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };