import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { LoginTech } from "../../../../prisma/Technician";


export default NextAuth({
  session: {
    jwt: true,
    maxAge:  60*60,
  },
  pages: {
    signIn: '/Technician/auth/signin',
    signOut: '/Technician/auth/signout',
    error: '/Technician/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/Technician/auth/verify-request', // (used for check email message)
    newUser: '/Technician/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const res=await LoginTech(credentials)
        if (res.message){
          return null
        }
        return res
      }
    }),
  ],
  jwt:{
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    secret: process.env.JWT_SECRET,
    encryption: true,
    decryptionOptions: {
      algorithms: ['A256GCM']

    },
    verificationOptions : {
      maxTokenAge: `${60*60}s`, // e.g. `${30 * 24 * 60 * 60}s` = 30 days
      algorithms: ['HS512']
    },

  },
   callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    },
    async session({ session, user, token }) {
      session.user["userID"]=token.sub
      session.user["role"]="Admin"
      return session
    },

  },
});