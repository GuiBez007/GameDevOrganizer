export const createImageMap = (modules) => {
  const map = {}

  for (const path in modules) {
    const parts = path.split('/')
    const file = parts.pop()
    const name = file.split('.')[0]

    map[name] = modules[path]
  }

  return map
}

export const openLinks = (paths) => paths.forEach(path => window.open(path, "_blank"))
