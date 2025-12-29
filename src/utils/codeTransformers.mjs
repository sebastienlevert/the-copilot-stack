/**
 * Custom Shiki transformers for highlighting, diffs, and line numbers
 */

export function customTransformers() {
  return [
    {
      name: 'custom-features',
      pre(node) {
        // Mark mermaid code blocks with a data attribute for the renderer
        const lang = node.properties?.dataLanguage || node.properties?.className?.[0]?.replace('language-', '');
        if (lang === 'mermaid') {
          node.properties.dataLanguage = 'mermaid';
          node.properties.className = ['language-mermaid'];
        }
      },
      line(node, line) {
        const classes = ['line'];

        // Get the text content of the line
        const lineText = getLineText(node);

        // Check for diff markers
        if (lineText.includes('// [!code ++]') || lineText.includes('# [!code ++]')) {
          classes.push('diff', 'add');
          // Remove the marker from display
          removeMarker(node, '// [!code ++]');
          removeMarker(node, '# [!code ++]');
        } else if (lineText.includes('// [!code --]') || lineText.includes('# [!code --]')) {
          classes.push('diff', 'remove');
          // Remove the marker from display
          removeMarker(node, '// [!code --]');
          removeMarker(node, '# [!code --]');
        }

        // Check for highlight marker
        if (lineText.includes('// [!code highlight]') || lineText.includes('# [!code highlight]')) {
          classes.push('highlighted');
          // Remove the marker from display
          removeMarker(node, '// [!code highlight]');
          removeMarker(node, '# [!code highlight]');
        }

        node.properties.className = classes;
      },
    },
  ];
}

/**
 * Get the text content of a line node
 */
function getLineText(node) {
  let text = '';

  function traverse(n) {
    if (n.type === 'text') {
      text += n.value;
    }
    if (n.children) {
      n.children.forEach(traverse);
    }
  }

  traverse(node);
  return text;
}

/**
 * Remove marker from display by finding and removing text nodes containing it
 */
function removeMarker(node, marker) {
  function traverse(n) {
    if (n.type === 'element' && n.children) {
      n.children = n.children.filter(child => {
        if (child.type === 'text' && child.value.includes(marker)) {
          // Replace marker with empty string
          child.value = child.value.replace(marker, '').trim();
          // Remove the node if it's now empty
          return child.value.length > 0;
        }
        return true;
      });
      n.children.forEach(traverse);
    }
  }

  traverse(node);
}
