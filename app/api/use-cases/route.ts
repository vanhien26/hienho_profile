import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

const DATA_FILE = join(process.cwd(), 'app/data/mini_webs_updated.ts')

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.division || !data.useCase || !data.serviceName || !data.url || !data.pageType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Read current file
    const fileContent = readFileSync(DATA_FILE, 'utf-8')

    // Parse existing entries
    const match = fileContent.match(/export const miniWebs: MiniWebEntry\[\] = \[([\s\S]*?)\]/m)
    if (!match) {
      return NextResponse.json({ error: 'Could not parse data file' }, { status: 500 })
    }

    const newEntry = {
      division: data.division.trim(),
      useCase: data.useCase.trim(),
      product: data.product?.trim() || '',
      serviceName: data.serviceName.trim(),
      url: data.url.trim(),
      status: data.status || 'Live',
      pageType: data.pageType.trim(),
      note: data.note?.trim() || '',
    }

    // Create new entry string (formatted as TypeScript object)
    const entryString = `  {
    division: '${newEntry.division}',
    useCase: '${newEntry.useCase}',
    product: '${newEntry.product}',
    serviceName: '${newEntry.serviceName}',
    url: '${newEntry.url}',
    status: '${newEntry.status}',
    pageType: '${newEntry.pageType}',
    note: '${newEntry.note}',
  },`

    // Insert new entry before the closing bracket
    const updatedContent = fileContent.replace(
      /(\[\s*\n)([\s\S]*?)(\n\s*\])/,
      `$1$2\n${entryString}\n$3`
    )

    // Write back to file
    writeFileSync(DATA_FILE, updatedContent, 'utf-8')

    return NextResponse.json({ success: true, data: newEntry })
  } catch (error) {
    console.error('Error saving use-case:', error)
    return NextResponse.json({ error: 'Failed to save use-case' }, { status: 500 })
  }
}
