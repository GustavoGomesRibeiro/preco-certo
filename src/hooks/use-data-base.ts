import { initDatabase } from "@/src/database/index";
import { useEffect } from "react";
import { logTabelasCriadas } from "../database/log-tabelas";

export function useDataBase() {
  useEffect(() => {
    (async () => {
      try {
        await initDatabase();
        await logTabelasCriadas();
      } catch (error) {
        console.error("Erro ao criar tabelas:", error);
      }
    })();
  }, []);
}
