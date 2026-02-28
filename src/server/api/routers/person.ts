import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { personService } from "@/server/services/extraction/person.service";
import {
  deletePersonSchema,
  updatePersonSchema,
} from "@/server/schemas/organization.schema";

export const personRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return personService.listPeople(ctx.db, ctx.session.user.id);
  }),

  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      return personService.searchPeople(
        ctx.db,
        ctx.session.user.id,
        input.query,
      );
    }),

  update: protectedProcedure
    .input(updatePersonSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return personService.updatePerson(ctx.db, ctx.session.user.id, id, data);
    }),

  delete: protectedProcedure
    .input(deletePersonSchema)
    .mutation(async ({ ctx, input }) => {
      return personService.deletePerson(ctx.db, ctx.session.user.id, input.id);
    }),
});
