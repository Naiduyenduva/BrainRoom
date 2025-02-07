import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../lib/prismadb'
import bcrypt from 'bcrypt';

export const authOptions = {
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
    secret:process.env.NEXTAUTH_SECRET
  }
  