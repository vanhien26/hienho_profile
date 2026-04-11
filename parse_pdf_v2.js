const fs = require('fs');

// Read the PDF text
const text = fs.readFileSync('/Users/hienhv/Library/Application Support/Code/User/workspaceStorage/2f834c568d3c779a6703824598736802/GitHub.copilot-chat/chat-session-resources/79cbfdb7-1c6d-4f94-80ab-93b26a5283df/call_16165304__vscode-1775878985911/content.txt', 'utf8');

// Split into lines and filter out empty ones
const lines = text.split('\n').filter(line => line.trim());

// Find all entries that start with divisions
const divisions = ['FS', 'DLS', 'UTI', 'BMC', 'MDS', 'GPD', 'SP', 'CX'];
const miniWebs = [];

let i = 0;
while (i < lines.length) {
  const line = lines[i].trim();

  // Check if this line starts with a division
  const divisionMatch = divisions.find(d => line.startsWith(d + ' '));
  if (divisionMatch) {
    // Parse this entry
    const division = divisionMatch;

    // Next line should be Use Case
    const useCase = lines[i+1]?.trim() || '';

    // Next line should be Product
    const product = lines[i+2]?.trim() || '';

    // Next line should be Service Name
    const serviceName = lines[i+3]?.trim() || '';

    // Next line should be URL
    const url = lines[i+4]?.trim() || '';

    // Next line should be Status
    const status = lines[i+5]?.trim() || '';

    // Next line should be Page Type
    const pageType = lines[i+6]?.trim() || '';

    if (url && url.includes('momo.vn')) {
      miniWebs.push({
        division,
        useCase,
        product,
        serviceName,
        url,
        status,
        pageType
      });

      i += 7; // Skip to next entry
    } else {
      i++; // Move to next line
    }
  } else {
    i++; // Move to next line
  }
}

console.log('Parsed', miniWebs.length, 'entries');
console.log('Sample entries:');
console.log(JSON.stringify(miniWebs.slice(0, 3), null, 2));

// Generate the TypeScript file content
const tsContent = `export interface MiniWebEntry {
  division: string
  useCase: string
  product: string
  serviceName: string
  url: string
  status: string
  pageType: string
  note?: string
}

export const miniWebs: MiniWebEntry[] = ${JSON.stringify(miniWebs, null, 2)};
`;

// Write to file
fs.writeFileSync('./app/data/mini_webs_updated.ts', tsContent);
console.log('Generated mini_webs_updated.ts');