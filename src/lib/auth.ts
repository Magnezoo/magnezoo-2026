import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, genericOAuth } from "better-auth/plugins";
// If your Prisma file is located elsewhere, you can change the path
import prisma from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  user: {
    additionalFields: {
      nickName: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "njr-google",
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          discoveryUrl:
            "https://accounts.google.com/.well-known/openid-configuration",
          scopes: ["openid", "profile", "email"],
          authorizationUrlParams: {
            hd: "n-jr.jp",
          },
        },
        {
          providerId: "ned-google",
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          discoveryUrl:
            "https://accounts.google.com/.well-known/openid-configuration",
          scopes: ["openid", "profile", "email"],
          authorizationUrlParams: {
            hd: "nnn.ed.jp",
          },
        },
        {
          providerId: "nac-google",
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          discoveryUrl:
            "https://accounts.google.com/.well-known/openid-configuration",
          scopes: ["openid", "profile", "email"],
          authorizationUrlParams: {
            hd: "nnn.ac.jp",
          },
        },
      ],
    }),
    admin({
      // アカウントがBANされたときのメッセージ（自己BANも含む）
      // 日本語にすると、謎のバグの関係でエラーになるため英語で記載。
      bannedUserMessage:
        "Your account has been deleted. (This message will also appear if you deleted it yourself.) To create a new account, please contact 'Akatsuki Yuito' on Slack.",
    }),
  ],
  advanced: {
    trustedProxyHeaders: true,
  },
});
