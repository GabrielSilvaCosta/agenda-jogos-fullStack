import { FastifyInstance } from "fastify";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

export async function getJogos(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    try {
      const jogos = await prisma.jogo.findMany();
      return reply.status(200).send(jogos);
    } catch (error) {
      return reply.status(500).send({ error: "Internal server error" });
    }
  });
}
