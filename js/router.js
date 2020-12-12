export default class Router {
  constructor() {
    this.routes = {}
    this.defaultRoute = null
    this.changeListener = null
  }

  route(route, callback, options = { default: false }) {
    this.routes[route] = callback

    if (options.default) {
      this.defaultRoute = route
    }
  }

  getSearchParams() {
    const queryString = window.location.search
    const searchParams = new URLSearchParams(queryString)
    return searchParams ?? {}
  }

  getSearchParamsAsObject() {
    const searchParams = this.getSearchParams()
    const params = {}

    for (const [name, value] of searchParams) {
      params[name] = value
    }

    return params
  }

  getCurrentPage() {
    const searchParams = this.getSearchParams()
    const paramPage = searchParams.get('page')

    if (!paramPage || !(paramPage in this.routes)) {
      return this.defaultRoute
    }

    return paramPage
  }

  handle() {
    const routeCallback = this.routes[this.getCurrentPage()]
    const params = this.getSearchParamsAsObject()
    routeCallback(params)
  }

  redirect(page, params = {}) {
    const { queryString, state } = this.issueState(page, params)

    window.history.pushState(state, page, `/?${queryString}`)
    this.handle()
  }

  replace(page, params = {}) {
    const { queryString, state } = this.issueState(page, params)

    window.history.replaceState(state, page, `/?${queryString}`)
  }

  issueState(page, params = {}) {
    const searchParams = this.getSearchParams()

    if (!page) {
      page = this.defaultRoute
    } 

    searchParams.set('page', page)

    Object.entries(params).forEach(param => {
      const [name, value] = param

      if (value) {
        searchParams.set(name, value)
      } else {
        searchParams.delete(name)
      }
    })

    const queryString = searchParams.toString()
    const state = this.changeListener()
    
    return { queryString, state }
  }

  onChange(listener) {
    this.changeListener = listener
  }
}
