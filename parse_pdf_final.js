const fs = require('fs');

// Read the PDF text
const text = fs.readFileSync('content.txt', 'utf8');

// Split into lines and filter out empty ones
const lines = text.split('\n').filter(line => line.trim());

// Skip header lines (first 8 lines are headers)
const dataLines = lines.slice(8);

// Parse entries - each entry has 8 lines
const miniWebs = [];
for (let i = 0; i < dataLines.length; i += 8) {
  if (i + 7 < dataLines.length) {
    const division = dataLines[i].trim();
    const useCase = dataLines[i + 1].trim();
    const product = dataLines[i + 2].trim();
    const serviceName = dataLines[i + 3].trim();
    const url = dataLines[i + 4].trim();
    const status = dataLines[i + 5].trim();
    const pageType = dataLines[i + 6].trim();
    const note = dataLines[i + 7].trim();

    // Only include entries with valid URLs
    if (url && url.includes('momo.vn')) {
      miniWebs.push({
        division,
        useCase,
        product,
        serviceName,
        url,
        status,
        pageType,
        note
      });
    }
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