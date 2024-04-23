import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
  log: ["query"],
});

export async function createJogo(app: FastifyInstance) {
  app.post("/jogos", async (request, reply) => {
    const createJogoBody = z.object({
      local: z.string(),
      data: z.string(),
      hora: z.string(),
    });

    const { local, data, hora } = createJogoBody.parse(request.body);

    const jogo = await prisma.jogo.create({
      data: {
        local,
        data,
        hora,
      },
    });
    return reply.status(201).send(jogo);
  });
}
