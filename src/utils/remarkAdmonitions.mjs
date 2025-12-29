import { visit } from 'unist-util-visit';

/**
 * Remark plugin to transform GitHub-style blockquote alerts into admonitions
 * Transforms: > [!NOTE] into <Admonition type="note">
 */
export function remarkAdmonitions() {
  return (tree) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      // Check if first child is a paragraph
      if (!node.children || node.children.length === 0) return;

      const firstChild = node.children[0];
      if (firstChild.type !== 'paragraph') return;

      // Check if paragraph starts with [!TYPE]
      const firstNode = firstChild.children[0];
      if (!firstNode || firstNode.type !== 'text') return;

      const match = firstNode.value.match(/^\[!(NOTE|INFO|TIP|WARNING|CAUTION|DANGER)\]\s*/i);
      if (!match) return;

      const type = match[1].toLowerCase();
      const alertPrefix = match[0];

      // Remove the [!TYPE] prefix from the text
      firstNode.value = firstNode.value.slice(alertPrefix.length);

      // If the text is now empty, remove the text node
      if (firstNode.value.trim() === '') {
        firstChild.children.shift();
      }

      // Transform blockquote into admonition directive
      const admonitionNode = {
        type: 'mdxJsxFlowElement',
        name: 'Admonition',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'type',
            value: type,
          },
        ],
        children: node.children,
        data: {
          _mdxExplicitJsx: true,
        },
      };

      // Replace the blockquote with the admonition
      parent.children[index] = admonitionNode;
    });
  };
}
