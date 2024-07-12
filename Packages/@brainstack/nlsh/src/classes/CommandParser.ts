export class CommandParser {
  parse(content: string): string[] {
    const commands: string[] = [];
    const startTag = '<commands>';
    const endTag = '</commands>';
    const startIndex = content.indexOf(startTag);
    const endIndex = content.indexOf(endTag);

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      const commandsContent = content.substring(
        startIndex + startTag.length,
        endIndex
      );
      const lines = commandsContent
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '');
      commands.push(...lines);
    }

    return commands;
  }
}
