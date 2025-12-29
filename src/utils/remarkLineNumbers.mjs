import { visit } from 'unist-util-visit';

/**
 * Remark plugin to add line numbers attribute to code blocks with showLineNumbers meta
 */
export function remarkLineNumbers() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.meta && node.meta.includes('showLineNumbers')) {
        // The code node will be wrapped in a <pre>, so we need to add
        // the attribute in a way that affects the pre wrapper
        // We do this by adding hName to wrap it properly
        if (!node.data) {
          node.data = {};
        }

        // Set properties that will be added to the wrapping pre element
        if (!node.data.hProperties) {
          node.data.hProperties = {};
        }

        // Mark the code element and we'll handle pre in a rehype plugin
        node.data.hProperties['data-has-line-numbers'] = 'true';
      }
    });
  };
}
