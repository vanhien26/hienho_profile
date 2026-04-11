const fs = require('fs');

// Read the PDF text
const text = fs.readFileSync('/Users/hienhv/Library/Application Support/Code/User/workspaceStorage/2f834c568d3c779a6703824598736802/GitHub.copilot-chat/chat-session-resources/79cbfdb7-1c6d-4f94-80ab-93b26a5283df/call_16165304__vscode-1775878985911/content.txt', 'utf8');

// Parse the PDF text into structured data
const lines = text.split('\n').filter(line => line.trim());
const miniWebs = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  // Skip headers
  if (line.includes('Division') || line.includes('Use Case') || line.includes('Product') ||
      line.includes('Service Name') || line.includes('URL') || line.includes('Status') ||
      line.includes('Page Type') || line.includes('Brief Doc') || line.includes('Dashboard') ||
      line.includes('Note') || line.includes('Simualtion')) continue;

  // Parse data lines - each entry spans multiple lines
  if (line.startsWith('FS') || line.startsWith('DLS') || line.startsWith('UTI') ||
      line.startsWith('BMC') || line.startsWith('MDS') || line.startsWith('GPD') ||
      line.startsWith('SP') || line.startsWith('CX')) {

    // Division line
    const division = line;

    // Next line should be Use Case
    const useCaseLine = lines[i+1]?.trim() || '';
    if (!useCaseLine) continue;

    // Next line should be Product
    const productLine = lines[i+2]?.trim() || '';

    // Next line should be Service Name
    const serviceLine = lines[i+3]?.trim() || '';

    // Next line should be URL
    const urlLine = lines[i+4]?.trim() || '';

    // Next line should be Status
    const statusLine = lines[i+5]?.trim() || '';

    // Next line should be Page Type
    const pageTypeLine = lines[i+6]?.trim() || '';

    if (urlLine.startsWith('https://') || urlLine.startsWith('http://')) {
      miniWebs.push({
        division,
        useCase: useCaseLine,
        product: productLine,
        serviceName: serviceLine,
        url: urlLine,
        status: statusLine,
        pageType: pageTypeLine
      });

      i += 6; // Skip the lines we just processed
    }
  }
}

console.log('Parsed', miniWebs.length, 'entries');
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
fs.writeFileSync('./app/data/mini_webs_new.ts', tsContent);
console.log('Generated mini_webs_new.ts');