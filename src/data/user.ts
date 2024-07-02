import prisma from "@/lib/prisma";

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({
      where: {
          email,
      },
  });
}

export function getUserByToken(token: string) {
    return prisma.user.findUnique({
        where: {
            passwordResetToken: token
        },
    });
}