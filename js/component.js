import { getFragment } from './utils/ui.js'

export default class Component {
  constructor(application, name) {
    if (!application) throw 'Application is null: ' + name

    this.application = application
    this.name = name
    this.fragment = getFragment(name)
    this.root = this.fragment.firstElementChild
  }

  render() {
    return this.fragment
  }
}
