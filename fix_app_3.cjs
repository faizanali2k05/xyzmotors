const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

// Replace known hyphens in text
content = content.replace(/month-long/g, 'month long');
content = content.replace(/post-sale/g, 'post sale');
content = content.replace(/pre-owned/g, 'pre owned');
content = content.replace(/pre-approved/g, 'pre approved');
content = content.replace(/After-Sale/g, 'After Sale');
content = content.replace(/150-point/g, '150 point');
content = content.replace(/Customer-First/g, 'Customer First');
content = content.replace(/head-to-head/g, 'head to head');

fs.writeFileSync('src/app/App.tsx', content);
console.log("Done hyphen fixes");
