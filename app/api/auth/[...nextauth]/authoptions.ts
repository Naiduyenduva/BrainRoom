import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../lib/prismadb'
import bcrypt from 'bcrypt';
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

// Extend the User type
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      username: string;
    };
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
  }
}

interface UserType {
  id: string;
  email: string;
  username: string;
  password?: string; // Password should not be exposed in session
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            
            credentials: {
              email: { label: "email", type: "email", placeholder: "jsmith@gmail.com" },
              password: { label: "Password", type: "password" }
            },
            //@ts-ignore
            async authorize(credentials, req) {
              
              if (!credentials?.email || !credentials?.password) {
                throw new Error('Username and password are required');
              }

              const isUserExists = await prisma.user.findFirst({
                where: {
                  email: credentials?.email
                },
                select: {
                  id: true,
                  password: true,
                  username: true
                },
              });

              if (!isUserExists) {
                throw new Error('you credentials are wrong')
              } 

              const isPasswordCorrect = await bcrypt.compare(credentials?.password,isUserExists?.password)

              if (!isPasswordCorrect) {
                throw new Error('you credentials are wrong')
              } 
              return {
                id: isUserExists.id,
                email: credentials.email,
                username: isUserExists.username,
              };
            }
          })
        ],
    secret:process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/client/signin"
    },
    callbacks: {
      async jwt({ token, user }: {token: JWT; user?: User | AdapterUser | undefined}): Promise<JWT>{
        if (user) {
          token.id = user.id; // Store user ID in token
          token.username = (user as UserType).username; 
        }
        return token;
      },
  
      async session({ session, token }:{session: Session; token: JWT}): Promise<Session> {
        if (session.user) {
          session.user.id = token.id; // Attach user ID to session
          session.user.username = token.username;
        }
        return session;
      },
    },
  }