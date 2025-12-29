import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to move line numbers attribute from code to pre element
 */
export function rehypeLineNumbers() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // Find <pre> elements
      if (node.tagName === 'pre') {
        // Check if any child <code> has the marker
        if (node.children) {
          for (const child of node.children) {
            if (
              child.type === 'element' &&
              child.tagName === 'code' &&
              child.properties &&
              child.properties['data-has-line-numbers']
            ) {
              // Move the attribute to the pre element
              if (!node.properties) {
                node.properties = {};
              }
              node.properties['data-line-numbers'] = 'true';
              // Remove the marker from code
              delete child.properties['data-has-line-numbers'];
              break;
            }
          }
        }
      }
    });
  };
}
