export const base64encodeURI = (string) => {
  return btoa(encodeURIComponent(string))
}

export const base64decodeURI = (string) => {
  return decodeURIComponent(atob(string))
}
