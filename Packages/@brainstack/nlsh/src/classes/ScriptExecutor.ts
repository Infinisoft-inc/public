import { spawnSync } from 'child_process';

export class ScriptExecutor {
  run(commands: string[]): void {
    commands.forEach((command) => {
      const childProcess = spawnSync(command, {
        shell: true,
        stdio: 'inherit',
      });
    });
  }
}
