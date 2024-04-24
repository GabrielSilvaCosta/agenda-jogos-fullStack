import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Jogo {
  id: number;
  local: string;
  data: string;
  hora: string;
}

function Jogos(): JSX.Element {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [novoJogo, setNovoJogo] = useState<Jogo>({
    id: 0,
    local: "",
    data: "",
    hora: "",
  });

  useEffect(() => {
    fetchJogos();
  }, []);

  const fetchJogos = async () => {
    try {
      const response = await axios.get<Jogo[]>("http://localhost:3000/");
      setJogos(response.data);
    } catch (error) {
      console.error("Erro ao buscar jogos:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovoJogo({ ...novoJogo, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { local, data, hora } = novoJogo;
      const formattedData = new Date(data).toISOString();
      await axios.post("http://localhost:3000/jogos", {
        local,
        data: formattedData,
        hora,
      });
      fetchJogos();
      setNovoJogo({ ...novoJogo, local: "", data: "", hora: "" });
    } catch (error) {
      console.error("Erro ao criar jogo:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-200 dark:bg-gray-900 dark:text-white">
      <div className=" max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-lg p-8 shadow dark:border-gray-700 dark:text-gray-100">
        <h1 className="text-3xl font-bold text-center  dark:text-gray-100 dark:bg-gray-800 rounded">Lista de Jogos</h1>
        <ul>
          {jogos.map((jogo) => (
            <li
              key={jogo.id}
              className="text-lg font-bold text-center  dark:text-gray-100 dark:bg-gray-800 rounded"
            >
              {jogo.local} - {new Date(jogo.data).toLocaleDateString()} às{" "}
              {jogo.hora}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className="space-y-4 dark:text-gray-100 dark:bg-gray-800 rounded ">
          <input
            type="text"
            name="local"
            value={novoJogo.local}
            onChange={handleInputChange}
            placeholder="Local do jogo"
            className="input-field dark:text-gray-100 dark:bg-gray-800 rounded"
          />
          <input
            type="date"
            name="data"
            value={novoJogo.data}
            onChange={handleInputChange}
            className="input-field dark:text-gray-100 dark:bg-gray-800 rounded"
          />
          <input
            type="time"
            name="hora"
            value={novoJogo.hora}
            onChange={handleInputChange}
            className="input-field  dark:text-gray-100 dark:bg-gray-800 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded dark:text-gray-100 dark:bg-gray-800"
          >
            Adicionar Jogo
          </button>
        </form>
      </div>
    </div>
  );
}

export default Jogos;
