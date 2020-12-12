export const getFragment = name => {
  const hTemplate = document.getElementById(`template-${name}`)
  const hFragment = hTemplate.content.cloneNode(true)
  return hFragment
}
