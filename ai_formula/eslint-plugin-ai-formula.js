// ESLint ?í‰ª∂ÔºöÈò≤Ê≠¢Á°¨Á∑®Á¢ºÈ°èËâ≤
module.exports = {
  rules: {
    'no-hardcoded-colors': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow hardcoded colors in favor of CSS variables',
          category: 'Best Practices',
        },
        fixable: null,
        schema: []
      },
      create(context) {
        // Á°¨Á∑®Á¢ºÈ??≤Ê®°Âº?
        const hardcodedColorPatterns = [
          // Hex È°èËâ≤
          /#[0-9a-fA-F]{3,6}/g,
          // RGB/RGBA È°èËâ≤
          /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g,
          // HSL È°èËâ≤
          /hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+\s*)?\)/g,
          // Â∏∏Ë?È°èËâ≤?çÁ®±
          /\b(red|blue|green|yellow|purple|orange|pink|brown|gray|grey|black|white|cyan|magenta)\b/g
        ];

        // AI Formula ?ÅË®±?ÑÈ??≤Ë???
        const allowedColorVariables = [
          'var(--ai-formula-primary)',
          'var(--ai-formula-primary-hover)',
          'var(--ai-formula-secondary)',
          'var(--ai-formula-accent)',
          'var(--ai-formula-success)',
          'var(--ai-formula-info)',
          'var(--ai-formula-warning)',
          'var(--ai-formula-error)',
          'var(--ai-formula-dark)',
          'var(--ai-formula-dark-light)',
          'var(--ai-formula-dark-medium)',
          'var(--ai-formula-gray-600)',
          'var(--ai-formula-gray-300)'
        ];

        function checkForHardcodedColors(node, value) {
          if (typeof value !== 'string') return;

          // Ê™¢Êü•?ØÂê¶?∫Â?Ë®±Á?ËÆäÈ?
          if (allowedColorVariables.some(allowed => value.includes(allowed))) {
            return;
          }

          // Ê™¢Êü•Á°¨Á∑®Á¢ºÈ??≤Ê®°Âº?
          for (const pattern of hardcodedColorPatterns) {
            const matches = value.match(pattern);
            if (matches) {
              context.report({
                node,
                message: `Hardcoded color '${matches[0]}' detected. Use AI Formula color variables instead.`,
                data: { color: matches[0] }
              });
            }
          }

          // Ê™¢Êü• Tailwind ?™Â?Áæ©È???
          const tailwindCustomColor = value.match(/bg-\[#[0-9a-fA-F]{3,6}\]|text-\[#[0-9a-fA-F]{3,6}\]|border-\[#[0-9a-fA-F]{3,6}\]/);
          if (tailwindCustomColor) {
            context.report({
              node,
              message: `Tailwind custom color '${tailwindCustomColor[0]}' detected. Use AI Formula utility classes instead.`,
              data: { color: tailwindCustomColor[0] }
            });
          }
        }

        return {
          // Ê™¢Êü• JSX Â±¨ÊÄ?
          JSXAttribute(node) {
            if (node.name.name === 'className' && node.value && node.value.type === 'Literal') {
              checkForHardcodedColors(node, node.value.value);
            }
            
            if (node.name.name === 'style' && node.value && node.value.type === 'JSXExpressionContainer') {
              const expression = node.value.expression;
              if (expression.type === 'ObjectExpression') {
                expression.properties.forEach(prop => {
                  if (prop.value && prop.value.type === 'Literal') {
                    checkForHardcodedColors(node, prop.value.value);
                  }
                });
              }
            }
          },

          // Ê™¢Êü• CSS Ê®??Â∞çË±°
          Property(node) {
            if (node.value && node.value.type === 'Literal' && 
                typeof node.value.value === 'string' &&
                (node.key.name === 'color' || 
                 node.key.name === 'backgroundColor' ||
                 node.key.name === 'borderColor' ||
                 node.key.name === 'background' ||
                 node.key.name === 'border')) {
              checkForHardcodedColors(node, node.value.value);
            }
          },

          // Ê™¢Êü•Â≠óÁ¨¶‰∏≤Â??¢È?
          Literal(node) {
            if (typeof node.value === 'string') {
              // Ê™¢Êü•?ØÂê¶?®Ê®£ÂºèÁõ∏?úÁ?‰∏ä‰??á‰∏≠
              const parent = node.parent;
              if (parent && parent.type === 'Property' && 
                  parent.key && parent.key.name && 
                  parent.key.name.includes('color') || 
                  parent.key.name.includes('background') ||
                  parent.key.name.includes('border')) {
                checkForHardcodedColors(node, node.value);
              }
            }
          }
        };
      }
    },

    'use-color-variables': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce use of AI Formula color variables',
          category: 'Best Practices',
        },
        fixable: 'code',
        schema: []
      },
      create(context) {
        // È°èËâ≤?øÊ??†Â?
        const colorReplacements = {
          '#FFD600': 'var(--ai-formula-primary)',
          '#EAB308': 'var(--ai-formula-primary-hover)',
          '#FFA500': 'var(--ai-formula-secondary)',
          '#FF6B6B': 'var(--ai-formula-accent)',
          '#4ECDC4': 'var(--ai-formula-success)',
          '#5DADE2': 'var(--ai-formula-info)',
          '#F7DC6F': 'var(--ai-formula-warning)',
          '#E74C3C': 'var(--ai-formula-error)',
          '#0f0f0f': 'var(--ai-formula-dark)',
          '#1a1a1a': 'var(--ai-formula-dark-light)',
          '#2a2a2a': 'var(--ai-formula-dark-medium)',
          '#6b7280': 'var(--ai-formula-gray-600)',
          '#d1d5db': 'var(--ai-formula-gray-300)'
        };

        function checkAndSuggestReplacement(node, value) {
          if (typeof value !== 'string') return;

          Object.keys(colorReplacements).forEach(hardcodedColor => {
            if (value.includes(hardcodedColor)) {
              context.report({
                node,
                message: `Use '${colorReplacements[hardcodedColor]}' instead of hardcoded color '${hardcodedColor}'`,
                fix(fixer) {
                  return fixer.replaceText(node, `"${value.replace(hardcodedColor, colorReplacements[hardcodedColor])}"`)
                }
              });
            }
          });
        }

        return {
          Literal(node) {
            checkAndSuggestReplacement(node, node.value);
          }
        };
      }
    },

    'no-inline-styles': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Discourage inline styles in favor of CSS classes',
          category: 'Best Practices',
        },
        fixable: null,
        schema: []
      },
      create(context) {
        return {
          JSXAttribute(node) {
            if (node.name.name === 'style') {
              context.report({
                node,
                message: 'Avoid inline styles. Use CSS classes or AI Formula utility classes instead.'
              });
            }
          }
        };
      }
    }
  }
};

// ?êË®≠?çÁΩÆ
module.exports.configs = {
  recommended: {
    plugins: ['ai-formula'],
    rules: {
      'ai-formula/no-hardcoded-colors': 'error',
      'ai-formula/use-color-variables': 'error',
      'ai-formula/no-inline-styles': 'warn'
    }
  }
}; 
