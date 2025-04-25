import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Try to find user settings by userId
  let userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  // If not found, create default settings
  if (!userSettings) {
    userSettings = await prisma.userSettings.create({
      data: {
        userId: user.id,
        currency: "USD",
      },
    });
  }

  // Revalidate the homepage or wherever the currency is shown
  revalidatePath("/");

  return Response.json(userSettings);
}
