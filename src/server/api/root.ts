import { userRouter } from "@/server/api/routers/user";
import { entryRouter } from "@/server/api/routers/entry";
import { journalRouter } from "@/server/api/routers/journal";
import { dreamRouter } from "@/server/api/routers/dream";
import { highlightRouter } from "@/server/api/routers/highlight";
import { ideaRouter } from "@/server/api/routers/idea";
import { wisdomRouter } from "@/server/api/routers/wisdom";
import { noteRouter } from "@/server/api/routers/note";
import { tagRouter } from "@/server/api/routers/tag";
import { personRouter } from "@/server/api/routers/person";
import { attachmentRouter } from "@/server/api/routers/attachment";
import { insightsRouter } from "@/server/api/routers/insights";
import { preferencesRouter } from "@/server/api/routers/preferences";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  entry: entryRouter,
  journal: journalRouter,
  dream: dreamRouter,
  highlight: highlightRouter,
  idea: ideaRouter,
  wisdom: wisdomRouter,
  note: noteRouter,
  tag: tagRouter,
  person: personRouter,
  attachment: attachmentRouter,
  insights: insightsRouter,
  preferences: preferencesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
