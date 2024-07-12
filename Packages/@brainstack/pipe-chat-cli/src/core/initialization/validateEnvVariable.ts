export function validateEnvVariable(
  variable: string | undefined,
  name: string
): string {
  if (!variable) {
    console.error(`Error: ${name} environment variable is not defined.`);
    process.exit(1);
  }
  return variable;
}
