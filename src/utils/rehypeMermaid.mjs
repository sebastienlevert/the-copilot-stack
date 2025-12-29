import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to mark mermaid code blocks with a data attribute
 * This runs after Shiki and adds a marker for the client-side renderer
 */
export function rehypeMermaid() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // Look for pre elements
      if (node.tagName === 'pre') {
        // Check if it has a code child with mermaid content
        const codeElement = node.children?.find(
          (child) => child.tagName === 'code'
        );

        if (codeElement) {
          // Check for language-mermaid class or mermaid in the class list
          const classes = codeElement.properties?.className || [];
          const hasMermaidClass = classes.some((cls) =>
            cls.includes('mermaid')
          );

          // Also check the pre element's classes
          const preClasses = node.properties?.className || [];
          const preLang = node.properties?.dataLanguage;

          if (
            hasMermaidClass ||
            preLang === 'mermaid' ||
            preClasses.some((cls) => cls.includes('mermaid'))
          ) {
            // Mark this as a mermaid diagram
            if (!node.properties) {
              node.properties = {};
            }
            node.properties.dataLanguage = 'mermaid';
            node.properties.className = [
              ...(node.properties.className || []),
              'language-mermaid',
            ];
          }
        }
      }
    });
  };
}
