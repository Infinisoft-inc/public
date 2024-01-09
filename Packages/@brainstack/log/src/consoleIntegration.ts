import { LoggerIntegration } from "./abstraction";

export const consoleIntegration: LoggerIntegration = {
  log: (message: string, ...optionalParams: any[]) => {
    console.log(`[LOG] [${new Date().toISOString()}]`, message, ...optionalParams);
  },

  info: (message: string, ...optionalParams: any[]) => {
    console.info(`[INFO] [${new Date().toISOString()}]`, message, ...optionalParams);
  },

  warn: (message: string, ...optionalParams: any[]) => {
    console.warn(`[WARN] [${new Date().toISOString()}]`, message, ...optionalParams);
  },

  error: (message: string, ...optionalParams: any[]) => {
    console.error(`[ERROR] [${new Date().toISOString()}]`, message, ...optionalParams);
  },

  verbose: (message: string, ...optionalParams: any[]) => {
    console.log(`[VERBOSE] [${new Date().toISOString()}]`, message, ...optionalParams);
  },
};
