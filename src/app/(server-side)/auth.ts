import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions, type DefaultSession } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      clientId: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({     
      ...session,
      user: {
        ...session.user,
        id: user.id,
        //@ts-ignore
        role: user.role,
        //@ts-ignore
        clientId: user.clientId,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER || 'http://localhost:3000',
        port: process.env.EMAIL_PORT || 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD || "",
        },
        from: process.env.EMAIL_FROM
      },
      from: process.env.EMAIL_FROM || "default@default.com",
      ... (process.env.NODE_ENV !== "production"
      ? {
          sendVerificationRequest({ url }) {
            console.log("LOGIN LINK", url);
          },
        }
      : {}),
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
