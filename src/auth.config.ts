import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./app/lib/schemas/loginSchema";
import { compare } from "bcryptjs";
import { getUserByEmail } from "./actions/authAction";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);
        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);

          if (!user || !(await compare(password, user.passwordHash)))
            return null;

          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
