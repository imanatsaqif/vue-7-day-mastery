// Manual mapping for best projects
export const PROJECT_MAPPINGS = {
  'vue-7-day-mastery': {
    overrideTitle: 'Vue 7-Day Mastery',
    overrideDescription: 'My comprehensive Vue.js learning journey with progressively complex projects',
    overrideTech: ['Vue 3', 'Composition API', 'Tailwind CSS', 'Vite', 'Pinia', 'Vue Router'],
    isFeatured: true,
    priority: 1
  },
  'todo-app': {
    overrideTitle: 'Todo Application',
    overrideDescription: 'A feature-rich todo app with Vue 3 and Pinia state management',
    overrideTech: ['Vue 3', 'Pinia', 'Tailwind CSS', 'Vite', 'Composition API'],
    isFeatured: true,
    priority: 2
  }
  // Add more mappings for your other important repos
}

// Transform GitHub repo to portfolio project
export function transformRepoToProject(repo) {
  const mapping = PROJECT_MAPPINGS[repo.name] || {}
  
  // Create slug from repo name
  const slug = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  
  // Generate title
  const title = mapping.overrideTitle || 
    repo.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  
  // Generate description
  const description = mapping.overrideDescription || 
    repo.description || 
    `${title} - A project built with modern web technologies`
  
  // Generate tech stack
  const tech = mapping.overrideTech || 
    (repo.topics && repo.topics.length > 0 ? repo.topics : [repo.language || 'JavaScript'])
  
  // Determine if featured
  const isFeatured = mapping.isFeatured !== undefined 
    ? mapping.isFeatured 
    : repo.stargazers_count > 0 || repo.watchers_count > 1
  
  // Priority for sorting
  const priority = mapping.priority || 99

  return {
    id: repo.id,
    slug,
    title,
    description,
    tech: tech.slice(0, 6), // Limit to 6 technologies
    isFeatured,
    priority,
    repoData: {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      url: repo.html_url
    }
  }
}

// Sort projects: featured first, then by priority, then by stars
export function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    // Featured first
    if (a.isFeatured && !b.isFeatured) return -1
    if (!a.isFeatured && b.isFeatured) return 1
    
    // Then by priority (lower number = higher priority)
    if (a.priority !== b.priority) return a.priority - b.priority
    
    // Then by stars
    return b.repoData.stars - a.repoData.stars
  })
}