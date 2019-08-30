const cookie = {
  read(name: string): string | null {
    const math = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return math ? decodeURIComponent(math[3]) : null
  }
}
export default cookie
