import fastify from "fastify";
import { fastifyCors } from "@fastify/cors";
import { createJogo } from "./routes/create-jogos";
import { getJogos } from "./routes/get-jogos";
import { getJogoId } from "./routes/getJogos-id";
import { getPutId } from "./routes/put-id";
import { deleteId } from "./routes/delete-id";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(createJogo);
app.register(getJogos);
app.register(getJogoId);
app.register(getPutId);
app.register(deleteId);

app.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
