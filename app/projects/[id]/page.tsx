import { notFound } from 'next/navigation'
import { projects } from '../../data/projects'
import ProjectDetailClient from './ProjectDetailClient'

export function generateStaticParams() {
  return projects.map(p => ({ id: p.id }))
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id)
  if (!project) return notFound()
  return <ProjectDetailClient project={project} />
}
