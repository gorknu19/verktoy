import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { forumPostSchema } from "./schema";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/auth-options";

export const POST = async (req: NextRequest) => {
  let jsonBody = await req.json();
  let validator = forumPostSchema.safeParse(jsonBody);
  const session = await getServerSession(authOptions);

  if (!validator.success)
    return NextResponse.json({ error: validator.error }, { status: 400 });
  if (!session?.user?.id)
    return NextResponse.json({ error: "ikke logget inn" }, { status: 401 });

  let { data } = validator;
  const res = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      imageId: data.fileId,
      userId: session?.user?.id,
    },
  });

  return NextResponse.json({ data: res }, { status: 200 });
};
