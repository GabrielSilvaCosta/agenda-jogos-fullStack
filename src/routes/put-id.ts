import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
  log: ["query"],
});

export async function getPutId(app: FastifyInstance) {
  app.put("/jogos/:id", async (request, reply) => {
    const getJogoParams = z.object({
      id: z.string(),
    });
    const getJogoBody = z.object({
      local: z.string(),
      data: z.string(),
      hora: z.string(),
    });
    const { id } = getJogoParams.parse(request.params);
    const { local, data, hora } = getJogoBody.parse(request.body);
    const jogo = await prisma.jogo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        local,
        data,
        hora,
      },
    });
    return { jogo };
  });
}
