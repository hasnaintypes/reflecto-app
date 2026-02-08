import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export class PersonService {
  /**
   * List all people for a user with entry counts
   */
  async listPeople(db: PrismaClient, userId: string) {
    return db.person.findMany({
      where: { userId },
      include: {
        _count: {
          select: { entries: true },
        },
      },
      orderBy: { name: "asc" },
    });
  }

  /**
   * Delete person if unused (or force)
   */
  async deletePerson(db: PrismaClient, userId: string, personId: string) {
    const person = await db.person.findFirst({
      where: { id: personId, userId },
    });

    if (!person) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Person not found",
      });
    }

    return db.person.delete({
      where: { id: personId },
    });
  }

  /**
   * Search people by name
   */
  async searchPeople(db: PrismaClient, userId: string, query: string) {
    return db.person.findMany({
      where: {
        userId,
        name: {
          contains: query.toLowerCase(),
          mode: "insensitive",
        },
      },
      take: 10,
      orderBy: { name: "asc" },
    });
  }
}

export const personService = new PersonService();
