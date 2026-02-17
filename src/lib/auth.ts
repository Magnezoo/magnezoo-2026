import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import prisma from "@/lib/prisma";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
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
  ],
});
