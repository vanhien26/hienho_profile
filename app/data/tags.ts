export const tagStyle: Record<string, string> = {
  SEO: '#E6EEFF|#1848B8',
  Credit: '#F5E0EC|#AE2070',
  Insurance: '#EDE8FF|#4B1DB8',
  BNPL: '#F5E0EC|#AE2070',
  GEO: '#EDE8FF|#4B1DB8',
  PLG: '#E0F5EA|#00663A',
  JTBD: '#FFF3DC|#8B5800',
  Framework: '#F0EDE8|#8C7D74',
  pSEO: '#E6EEFF|#1848B8',
  IA: '#E6EEFF|#1848B8',
  Schema: '#F5E0EC|#AE2070',
  Directory: '#E0F5EA|#00663A',
  'Content Clusters': '#E6EEFF|#1848B8',
  'Link Building': '#FFF3DC|#8B5800',
  'Internal Linking': '#F5E0EC|#AE2070',
  'Content Architecture': '#E6EEFF|#1848B8',
  'Auto Insurance': '#EDE8FF|#4B1DB8',
  'Template System': '#F0EDE8|#8C7D74',
  'AI Overview': '#EDE8FF|#4B1DB8',
  SGE: '#EDE8FF|#4B1DB8',
  'Multi-product': '#E0F5EA|#00663A',
  'Search Intent': '#FFF3DC|#8B5800',
  'Deep Link': '#E0F5EA|#00663A',
  CTA: '#F5E0EC|#AE2070',
  'Credit Ecosystem': '#F5E0EC|#AE2070',
}

export function getTagColors(tag: string): string[] {
  const colorStr = tagStyle[tag] || '#F0EDE8|#8C7D74'
  return colorStr.split('|')
}
