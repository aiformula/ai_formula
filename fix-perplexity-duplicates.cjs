const fs = require('fs');

console.log('🔧 Fixing duplicate keys in Perplexity course data...');

// Read the file
let content = fs.readFileSync('src/data/perplexity-complete-course-data.ts', 'utf8');

// Simple fix: remove obvious duplicate keyPointsEn lines that appear immediately after another keyPointsEn
// This pattern looks for:
// keyPointsEn: [
//   ... content ...
// ],
// keyPointsEn: [  <-- This is the duplicate we want to remove

let lines = content.split('\n');
let fixedLines = [];
let duplicatesRemoved = 0;

for (let i = 0; i < lines.length; i++) {
  const currentLine = lines[i];
  const isKeyPointsEn = currentLine.trim().startsWith('keyPointsEn:');
  const isDescriptionEn = currentLine.trim().startsWith('descriptionEn:');
  
  // Check if this is a duplicate by looking for the same key in recent lines
  if (isKeyPointsEn || isDescriptionEn) {
    const keyName = isKeyPointsEn ? 'keyPointsEn' : 'descriptionEn';
    
    // Look back in the last 20 lines to see if we already have this key
    let isDuplicate = false;
    for (let j = Math.max(0, i - 20); j < i; j++) {
      if (lines[j].trim().startsWith(keyName + ':')) {
        // Check if we're still in the same object (no closing brace between)
        let foundClosingBrace = false;
        for (let k = j + 1; k < i; k++) {
          if (lines[k].trim() === '}' || lines[k].trim() === '},') {
            foundClosingBrace = true;
            break;
          }
        }
        if (!foundClosingBrace) {
          isDuplicate = true;
          break;
        }
      }
    }
    
    if (isDuplicate) {
      console.log(`Removing duplicate ${keyName} at line ${i + 1}`);
      duplicatesRemoved++;
      
      // Skip lines until we find the end of this property (closing bracket and comma/brace)
      let j = i + 1;
      let arrayLevel = 0;
      let foundStart = false;
      
      while (j < lines.length) {
        const line = lines[j];
        
        if (!foundStart && line.includes('[')) {
          foundStart = true;
          arrayLevel = 1;
        } else if (foundStart) {
          arrayLevel += (line.match(/\[/g) || []).length;
          arrayLevel -= (line.match(/\]/g) || []).length;
          
          if (arrayLevel === 0) {
            // Skip until the next property or closing brace
            if (line.trim().endsWith(',') || lines[j + 1]?.trim().match(/^[a-zA-Z_]/)) {
              j++; // Include the closing line
              break;
            }
          }
        }
        j++;
      }
      
      i = j - 1; // Skip to end of duplicate property
      continue;
    }
  }
  
  fixedLines.push(currentLine);
}

// Write the fixed content back
fs.writeFileSync('src/data/perplexity-complete-course-data.ts', fixedLines.join('\n'), 'utf8');

console.log('✅ Fixed duplicate keys in Perplexity course data');
console.log(`📊 Removed ${duplicatesRemoved} duplicate keys`); 