export const fetchXML = async (input, init) => {
  const response = await fetch(input, init)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const xmlString = await response.text()
  return new window.DOMParser().parseFromString(xmlString, 'text/xml')
}
