import { FastifyInstance } from "fastify";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
  log: ["query"],
});

export async function deleteId(app: FastifyInstance) {
  app.delete("/jogos/:id", async (request, reply) => {
    const getJogoParams = z.object({
      id: z.string(),
    });
    const { id } = getJogoParams.parse(request.params);
    const jogo = await prisma.jogo.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { jogo };
  });
}
