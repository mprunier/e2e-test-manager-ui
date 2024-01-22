import { useContext } from "react";
import { EnvironmentContext } from "../contexts/EnvironmentContext.tsx";

export const useEnvironmentContext = () => useContext(EnvironmentContext);
