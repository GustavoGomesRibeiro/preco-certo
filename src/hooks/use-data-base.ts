import { initDatabase } from "@/src/database/index";
import { useEffect } from "react";
import { logTabelasCriadas } from "../database/log-tabelas";

export function useDataBase() {
  useEffect(() => {
    initDatabase();
    logTabelasCriadas();
  }, []);
}
