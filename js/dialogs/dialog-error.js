import Dialog from '../dialog.js'

export default class DialogError extends Dialog {
  constructor(application) {
    super(application, 'dialog-error')
  }

  render({ title, message }) {
    this.hTitle = this.root.querySelector('.dialog-title')
    this.hMessage = this.root.querySelector('.dialog-message')

    this.dialogPane.style.backgroundColor = '#3e2b2b'
    this.hTitle.innerHTML = title
    this.hMessage.innerHTML = message

    return super.render()
  }
}
