import type { Prisma, PrismaClient } from "@prisma/client";

type DbClient = Prisma.TransactionClient | PrismaClient;

/**
 * Tag Extractor Service
 * Extracts and manages #tag mentions from entry content
 */
export class TagExtractor {
  /**
   * Extract unique tag names from content
   * @param content - Entry content to parse
   * @returns Array of unique tag names (without #)
   */
  extract(content: string): string[] {
    if (!content) return [];

    const pattern = /#(\w+)/g;
    const matches = content.match(pattern) ?? [];
    const tagNames = matches.map((tag) => tag.slice(1).toLowerCase());

    // Return unique tags
    return [...new Set(tagNames)];
  }

  /**
   * Sync tags for an entry
   * Creates new tags if needed and returns the synchronized tags
   */
  async syncTags(
    db: DbClient,
    userId: string,
    content: string | null,
  ): Promise<{ id: string; name: string }[]> {
    const tagNames = content ? this.extract(content) : [];

    // Get or create all tags
    const tags = await Promise.all(
      tagNames.map((name) =>
        db.tag.upsert({
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
          update: {}, // Tag already exists, no update needed
        }),
      ),
    );

    return tags.map((t) => ({ id: t.id, name: t.name }));
  }

  /**
   * Get tag IDs from names
   */
  async getTagsByNames(
    db: DbClient,
    userId: string,
    tagNames: string[],
  ): Promise<string[]> {
    const tags = await db.tag.findMany({
      where: {
        userId,
        name: {
          in: tagNames.map((n) => n.toLowerCase()),
        },
      },
      select: { id: true },
    });

    return tags.map((tag) => tag.id);
  }
}

export const tagExtractor = new TagExtractor();
