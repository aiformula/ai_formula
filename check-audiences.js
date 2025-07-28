const fs = require('fs');

try {
  const data = fs.readFileSync('ai_formula/src/data/tools-data.ts', 'utf8');

  // Extract all targetAudience arrays
  const matches = data.match(/targetAudience:\s*\[(.*?)\]/gs);
  if (matches) {
    const allAudiences = new Set();
    matches.forEach(match => {
      // Extract content between square brackets
      const content = match.match(/\[(.*?)\]/s)[1];
      // Split by commas and clean up
      const items = content.split(',').map(item => 
        item.trim().replace(/'/g, '').replace(/"/g, '')
      ).filter(item => item && item !== '');
      items.forEach(item => allAudiences.add(item));
    });
    
    // Filter for Chinese characters only
    const chineseAudiences = Array.from(allAudiences).filter(item => 
      /[\u4e00-\u9fff]/.test(item)
    ).sort();
    
    console.log('All Chinese targetAudience values:');
    chineseAudiences.forEach((audience, index) => {
      console.log(`${index + 1}. ${audience}`);
    });
    console.log(`\nTotal: ${chineseAudiences.length} unique Chinese audience terms`);
  }
} catch (error) {
  console.error('Error:', error.message);
} 