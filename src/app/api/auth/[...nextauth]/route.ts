import bcryptjs from 'bcryptjs';
import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Account, User as AuthUser } from "next-auth";
import { connect } from "@/database/database.config";
import User from "@/database/model/usermod";
import { GithubProfile } from 'next-auth/providers/github';


export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcryptjs.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }

        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      //@ts-ignore
      profile(profile: GithubProfile) {

        return {
          ...profile,
          role: "admin",
          id: profile.id.toString(),
          image: profile.avatar_url,
        }
      },
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),

  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        console.log(user)
        return user;
      }
      if (account?.provider == "github") {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              isVerified: true,
              resetToken: "",
              resetTokenExpiry: "",
              role: "admin"
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
    //@ts-ignore
    async jwt ({ token, user }) {
      if (user?.role) token.role = user.role
      return token
    },
    //@ts-ignore
    async session ({ session, token, user }) {
        // user id is stored in ._id when using credentials provider
        if (token?.role) session.user.role = token.role
    
        // user id is stored sub ._id when using google provider
     
        // we'll update the session object with those 
        // informations besides the ones it already has
        return session
    },
   

  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
