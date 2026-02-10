/**
 * Converts simple markdown-style article body text to HTML.
 * Handles: headings (## / ###), paragraphs, blockquotes (>),
 * bold (**), links, ordered/unordered lists, and inline code.
 */
export function renderBody(markdown: string): string {
  const lines = markdown.split('\n');
  const html: string[] = [];
  let inList: 'ol' | 'ul' | null = null;

  function closeList() {
    if (inList) {
      html.push(`</${inList}>`);
      inList = null;
    }
  }

  function processInline(text: string): string {
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Inline code
    text = text.replace(/`(.+?)`/g, '<code>$1</code>');
    // Links
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    return text;
  }

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (trimmed === '') {
      closeList();
      i++;
      continue;
    }

    // H2
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      closeList();
      const text = processInline(trimmed.slice(3));
      html.push(`<h2>${text}</h2>`);
      i++;
      continue;
    }

    // H3
    if (trimmed.startsWith('### ')) {
      closeList();
      const text = processInline(trimmed.slice(4));
      html.push(`<h3>${text}</h3>`);
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      closeList();
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      const text = processInline(quoteLines.join(' '));
      html.push(`<blockquote><p>${text}</p></blockquote>`);
      continue;
    }

    // Ordered list (1. 2. etc)
    if (/^\d+\.\s/.test(trimmed)) {
      if (inList !== 'ol') {
        closeList();
        html.push('<ol>');
        inList = 'ol';
      }
      const text = processInline(trimmed.replace(/^\d+\.\s/, ''));
      html.push(`<li>${text}</li>`);
      i++;
      continue;
    }

    // Unordered list (- item)
    if (trimmed.startsWith('- ')) {
      if (inList !== 'ul') {
        closeList();
        html.push('<ul>');
        inList = 'ul';
      }
      const text = processInline(trimmed.slice(2));
      html.push(`<li>${text}</li>`);
      i++;
      continue;
    }

    // Paragraph — collect consecutive non-empty, non-special lines
    closeList();
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('## ') &&
      !lines[i].trim().startsWith('### ') &&
      !lines[i].trim().startsWith('> ') &&
      !/^\d+\.\s/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('- ')
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      const text = processInline(paraLines.join(' '));
      html.push(`<p>${text}</p>`);
    }
  }

  closeList();
  return html.join('\n');
}
