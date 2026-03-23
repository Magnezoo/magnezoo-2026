"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import NameSettingGuardClient from "./GuardClient";

export default async function NameSettingGuard() {
  const session = await auth.api.getSession({ headers: await headers() });
  const slack = session?.user?.id
    ? await prisma.slacks.findUnique({ where: { userId: session.user.id } })
    : null;
  const nickname = session?.user.nickName;
  const isNeedGuard = !!session && (!slack || !nickname);
  if (!isNeedGuard || !session) {
    return null;
  }
  return (
    <NameSettingGuardClient
      isNeed={isNeedGuard}
      userId={session.user.id}
      currentName={nickname}
      currentSlack={slack}
    />
  );
}
