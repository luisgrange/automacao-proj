-- CreateTable
CREATE TABLE "chamados" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "num_chamado" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "aberto_em" TEXT NOT NULL,
    "fechado_em" TEXT NOT NULL,
    "tempo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "situacao" TEXT NOT NULL
);
