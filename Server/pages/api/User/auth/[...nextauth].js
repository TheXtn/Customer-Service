import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { getRole } from "../../../../prisma/helper";
import { LoginUser } from "../../../../prisma/User";
export default NextAuth({
  session: {
    jwt: true,
    maxAge:  60*60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const res=await LoginUser(credentials)
        if (res.message){
          throw new Error(res.message)
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
      var role=await getRole(token.sub)
      session.user["role"]=role
      return session
    },
    redirect({ url, baseUrl }) {
      return "http://localhost:3000/api/hello"
    }

  },
});