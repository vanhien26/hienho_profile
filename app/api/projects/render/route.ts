import { NextRequest, NextResponse } from 'next/server'
import { renderMarkdown } from '../../../../lib/md-to-usecase'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const { markdown, save } = await req.json()
    if (!markdown || typeof markdown !== 'string') {
      return NextResponse.json({ error: 'markdown is required' }, { status: 400 })
    }

    const result = renderMarkdown(markdown)

    // If save=true and slug present, write to public/projects/
    if (save && result.meta.slug) {
      const filePath = path.join(process.cwd(), 'public', 'projects', `${result.meta.slug}.html`)
      await writeFile(filePath, result.html, 'utf-8')
      return NextResponse.json({ html: result.html, meta: result.meta, saved: true, path: `/projects/${result.meta.slug}.html` })
    }

    return NextResponse.json({ html: result.html, meta: result.meta })
  } catch (err: any) {
    console.error('render error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
