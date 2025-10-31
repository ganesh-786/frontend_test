// Simple markdown parser for basic formatting
export function parseMarkdown(text) {
  if (!text) return "";

  return (
    text
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic text
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      )
      // Line breaks
      .replace(/\n/g, "<br>")
      // Lists (basic)
      .replace(/^\- (.*$)/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
  );
}

// Alias for compatibility
export const renderMarkdown = parseMarkdown;
