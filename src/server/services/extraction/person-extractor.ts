import type { Prisma, PrismaClient } from "@prisma/client";

type DbClient = Prisma.TransactionClient | PrismaClient;

/**
 * Person Extractor Service
 * Extracts and manages @mention references from entry content
 */
export class PersonExtractor {
  /**
   * Extract unique person names from content
   * @param content - Entry content to parse
   * @returns Array of unique person names (without @)
   */
  extract(content: string): string[] {
    if (!content) return [];

    const pattern = /@(\w+)/g;
    const matches = content.match(pattern) ?? [];
    const personNames = matches.map((mention) =>
      mention.slice(1).toLowerCase(),
    );

    // Return unique people
    return [...new Set(personNames)];
  }

  /**
   * Sync people for an entry
   * Creates new person records if needed and returns the synchronized people
   */
  async syncPeople(
    db: DbClient,
    userId: string,
    content: string | null,
  ): Promise<{ id: string; name: string }[]> {
    const personNames = content ? this.extract(content) : [];

    // Get or create all people
    const people = await Promise.all(
      personNames.map((name) =>
        db.person.upsert({
          where: {
            userId_name: {
              userId,
              name,
            },
          },
          create: {
            userId,
            name,
          },
          update: {}, // Person already exists, no update needed
        }),
      ),
    );

    return people.map((p) => ({ id: p.id, name: p.name }));
  }

  /**
   * Get person IDs from names
   */
  async getPeopleByNames(
    db: DbClient,
    userId: string,
    personNames: string[],
  ): Promise<string[]> {
    const people = await db.person.findMany({
      where: {
        userId,
        name: {
          in: personNames,
        },
      },
      select: { id: true },
    });

    return people.map((person) => person.id);
  }
}

export const personExtractor = new PersonExtractor();
