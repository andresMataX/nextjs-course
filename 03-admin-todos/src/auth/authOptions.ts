import { signInEmailPassword } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Correo electrónico',
          type: 'email',
          placeholder: 'Ingrese su correo electrónico',
        },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await signInEmailPassword(
          credentials!.email,
          credentials!.password
        )

        return user ? user : null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({}) {
      return true
    },
    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? 'no-email' },
      })

      if (dbUser?.isActive === false) {
        throw new Error('User is not active')
      }

      token.roles = dbUser?.roles ?? ['no-roles']
      token.id = dbUser?.id ?? 'no-id'

      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.roles = token.roles
        session.user.id = token.id
      }

      return session
    },
  },
}
