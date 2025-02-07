import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const users = [
                { id: "1", name: "mans", email: "jsmith@example.com",password: "mans123" },
                { id: "1", name: "mans1", email: "jsmith@example.com",password: "mans123" }
              ]

              const finduser = users.find((user)=> user.name === credentials?.username && user.password === credentials?.password)


        
              if (finduser) {
                return finduser
              } else {
                return null
        
              }
            }
          })
    ],
    secret:"hello"
  }
  