import { Request, Response, Router } from "express";
import { Readable } from "stream";
import readline from "readline";
import multer from "multer";

import { client } from './database/client';

const multerConf = multer();
const router = Router();

interface Chamados {
  num_chamado: string;
  titulo: string;
  aberto_em: string;
  fechado_em: string;
  tempo: string;
  status: string;
  cliente: string;
  situacao: string;
}

const chamados: Chamados[] = [];

// carrega arquivo
router.post(
  "/insere",
  multerConf.single("file"),
  async (request: Request, response: Response) => {
    const { file } = request;
    const buffer = file?.buffer;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const chamadosLine = readline.createInterface({
      input: readableFile,
    });

    for await (let line of chamadosLine) {
      const chamado_split = line.split(";");

      // atribui valores do buffer à variável
      chamados.push({
        num_chamado: chamado_split[0],
        titulo: chamado_split[1],
        aberto_em: chamado_split[2],
        fechado_em: chamado_split[3],
        tempo: chamado_split[4],
        status: chamado_split[5],
        cliente: chamado_split[6],
        situacao: chamado_split[7],
      });
    }

    // envia as informações para o banco de dados
    for await (let {
      num_chamado,
      titulo,
      aberto_em,
      fechado_em,
      tempo,
      status,
      cliente,
      situacao
    } of chamados){

        await client.arquivo.create({
            data:{
                num_chamado,
                titulo,
                aberto_em,
                fechado_em,
                tempo,
                status,
                cliente,
                situacao
            }
        })
    }
      
      return response.json(chamados);
  }
);

router.get("/recupera", async (request: Request, response: Response) => {
    return response.json(chamados);
})



export { router };
