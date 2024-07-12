export class ExplanationParser {
  parse(content: string): string {
    const startTag = '<explain>';
    const endTag = '</explain>';
    const startIndex = content.indexOf(startTag);
    const endIndex = content.indexOf(endTag);

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      return content.substring(startIndex + startTag.length, endIndex).trim();
    }

    return '';
  }
}
