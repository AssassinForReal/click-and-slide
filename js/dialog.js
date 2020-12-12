import Component from './component.js'
import { getFragment } from './utils/ui.js'

export default class Dialog extends Component {
  static CLOSE_DEFAULT = 0
  static CLOSE_USER = 1

  constructor(application, name) {
    super(application, 'dialog')

    this.dialogPane = this.root.firstElementChild
    this.dialogContent = this.dialogPane.querySelector('.dialog-content')
    this.dialogContent.appendChild(getFragment(name))
    this.buttonClose = this.dialogPane.querySelector('.btn-close')

    this.root.addEventListener('click', this.handleShadowClick)
    this.buttonClose.addEventListener('click', () => this.close(Dialog.CLOSE_USER))
  }

  render() {
    document.body.appendChild(super.render())
  }

  handleShadowClick = (event) => {
    if (event.target !== this.root) return
    this.close(Dialog.CLOSE_USER)
  }

  close = (closeReason = Dialog.CLOSE_DEFAULT) => {
    this.root.removeEventListener('click', this.handleShadowClick)
    this.root.classList.add('fade-out')

    setTimeout(() => {
      this.root.remove()
      this.onClose(closeReason)
    }, 500)
  }

  onClose(closeReason) { }
}
