import { prepareDiContainer } from "../di/prepareDiContainer";
import { prepareEnvironment } from "./prepareEnvironment";

export const initialization = () => {
  const env = prepareEnvironment();
  const container = prepareDiContainer(env);

  return container;
};

