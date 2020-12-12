import DialogGameEnded from './dialogs/dialog-game-ended.js'
import { renderTimer } from './timer.js'
import { randomInt } from './utils/random.js'

export default class SolvingPhase {
  constructor(application) {
    this.application = application
    this.image = null
    this.category = null
    this.puzzle = null
    this.mode = 0
    this.canvas = null
    this.state = []
    this.running = false
    this.shuffling = false
    this.startedAt = 0
    this.renderBlank = false
    this.hDigitalTimer = null
  }

  async start({ image, category, puzzle, mode, canvas }) {
    this.stop()

    this.running = true
    this.renderBlank = false
    this.image = image
    this.category = category
    this.puzzle = puzzle
    this.mode = mode
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.state = []

    this.imgSize = Math.min(this.image.naturalWidth, this.image.naturalHeight)
    this.tileSize = this.imgSize / this.mode

    for (let y = 0; y < mode; y++) {
      this.state.push([])

      for (let x = 0; x < mode; x++) {
        this.state[y].push(y * mode + x)
      }
    }

    this.state[mode - 1][mode - 1] = -1

    this.hDigitalTimer = document.querySelector('.digital-timer')
    this.hDigitalTimer.innerHTML = ''
    this.hDigitalTimer.append(...renderTimer(0))

    this.shuffling = true
    await this.shuffle()
    this.shuffling = false
    this.addCanvasClickListener()

    this.startedAt = new Date().getTime()

    const renderStep = () => {
      if (!this.running || this.shuffling) return

      const currentTime = new Date().getTime()
      const elapsed = currentTime - this.startedAt

      this.renderTimer(elapsed)
      requestAnimationFrame(renderStep)
    }

    requestAnimationFrame(renderStep)
  }

  stop() {
    this.running = false
    this.shuffling = false
    this.removeCanvasClickListener()

    if (this.ctx) {
      this.clear()
    }
  }

  renderTimer(elapsed) {
    const images = renderTimer(elapsed)

    for (let i = 0; i < this.hDigitalTimer.children.length; i++) {
      this.hDigitalTimer.children[i].src = images[i].src
    }
  }

  addCanvasClickListener() {
    if (this.canvas) {
      this.canvas.addEventListener('mousedown', this.handleCanvasClick)
      this.canvas.classList.add('cursor-pointer')
    }
  }

  removeCanvasClickListener() {
    if (this.canvas) {
      this.canvas.removeEventListener('mousedown', this.handleCanvasClick)
      this.canvas.classList.remove('cursor-pointer')
    }
  }

  handleCanvasClick = async event => {
    const rect = this.canvas.getBoundingClientRect()
    const x = Math.round(event.clientX - rect.left)
    const y = Math.round(event.clientY - rect.top)

    const tileX = Math.floor(x / this.tileSize)
    const tileY = Math.floor(y / this.tileSize)

    if (tileX >= this.mode || tileY >= this.mode) return

    const position = this.getPuzzleMovePosition(tileX, tileY)
    if (!position) return

    this.removeCanvasClickListener()
    await this.playMoveAnimation({ x: tileX, y: tileY }, position)
    this.movePuzzle({ x: tileX, y: tileY }, position)
    this.render()

    if (this.checkForWin()) {
      this.running = false
      this.renderBlank = true

      this.render()

      const currentTime = new Date().getTime()
      const elapsed = currentTime - this.startedAt

      this.renderTimer(elapsed)

      setTimeout(() => {
        const dialogGameEnded = new DialogGameEnded(this.application)
        dialogGameEnded.render({
          score: elapsed,
          imageUrl: this.image.src,
          category: this.category,
          puzzle: this.puzzle,
          mode: this.mode
        })
      }, 250)

      return
    }

    this.addCanvasClickListener()
  }

  getPuzzleMovePosition(tileX, tileY) {
    if (tileX > 0) {
      const leftState = this.state[tileY][tileX - 1]
      if (leftState === -1) return { x: tileX - 1, y: tileY }
    }

    if (tileY > 0) {
      const topState = this.state[tileY - 1][tileX]
      if (topState === -1) return { x: tileX, y: tileY - 1 }
    }

    if (tileX < this.mode - 1) {
      const rightState = this.state[tileY][tileX + 1]
      if (rightState === -1) return { x: tileX + 1, y: tileY }
    }

    if (tileY < this.mode - 1) {
      const bottomState = this.state[tileY + 1][tileX]
      if (bottomState === -1) return { x: tileX, y: tileY + 1 }
    }

    return null
  }

  movePuzzle(from, to) {
    const tmpState = this.state[to.y][to.x]
    this.state[to.y][to.x] = this.state[from.y][from.x]
    this.state[from.y][from.x] = tmpState
  }

  playMoveAnimation(from, to, speed = 25) {
    return new Promise(resolve => {
      const clearAnimationArea = () => {
        const x = Math.min(from.x, to.x) * this.tileSize
        const y = Math.min(from.y, to.y) * this.tileSize
        const width = (Math.abs(to.x - from.x) + 1) * this.tileSize
        const height = (Math.abs(to.y - from.y) + 1) * this.tileSize
        this.clearRect(x, y, width, height)
      }

      let currentX = from.x * this.tileSize
      let currentY = from.y * this.tileSize

      const targetX = to.x * this.tileSize
      const targetY = to.y * this.tileSize

      const step = () => {
        if (!this.running) return

        clearAnimationArea()

        if (to.x > from.x) {
          currentX = Math.min(currentX + speed, targetX)
        } else if (to.x < from.x) {
          currentX = Math.max(currentX - speed, targetX)
        }

        if (to.y > from.y) {
          currentY = Math.min(currentY + speed, targetY)
        } else if (to.y < from.y) {
          currentY = Math.max(currentY - speed, targetY)
        }

        const imgState = this.state[from.y][from.x]
        const imgX = imgState % this.mode
        const imgY = Math.floor(imgState / this.mode)

        this.ctx.drawImage(this.image,
          imgX * this.tileSize, imgY * this.tileSize,
          this.tileSize, this.tileSize,
          currentX, currentY,
          this.tileSize, this.tileSize)

        if (currentX === targetX && currentY === targetY) {
          resolve()
          return
        }

        if (this.running) {
          requestAnimationFrame(step)
        }
      }

      requestAnimationFrame(step)
    })
  }

  async shuffle() {
    const iterationCount = this.mode ** 3

    let blankX = this.mode - 1
    let blankY = this.mode - 1

    let lastX = -1
    let lastY = -1

    for (let i = 0; i < iterationCount; i++) {
      if (!this.running) return

      const direction = randomInt(0, 3)

      let tileX = blankX
      let tileY = blankY

      if (blankX > 0 && direction === 0) {
        tileX = blankX - 1
        tileY = blankY
      } else if (blankX < this.mode - 1 && direction === 1) {
        tileX = blankX + 1
        tileY = blankY
      } else if (blankY > 0 && direction === 2) {
        tileX = blankX
        tileY = blankY - 1
      } else if (blankY < this.mode - 1 && direction === 3) {
        tileX = blankX
        tileY = blankY + 1
      } else {
        i--
        continue
      }

      if (lastX === tileX && lastY === tileY) {
        i--
        continue
      }

      lastX = blankX
      lastY = blankY

      await this.playMoveAnimation({ x: tileX, y: tileY }, { x: blankX, y: blankY }, this.mode * 10)
      this.movePuzzle({ x: tileX, y: tileY }, { x: blankX, y: blankY })
      this.render()

      blankX = tileX
      blankY = tileY
    }
  }

  checkForWin() {
    for (let y = 0; y < this.mode; y++) {
      for (let x = 0; x < this.mode; x++) {
        if (x !== this.mode - 1 && y !== x) {
          if (this.state[y][x] != y * this.mode + x) return false
        }
      }
    }

    if (this.state[this.mode - 1][this.mode - 1] !== -1) return false

    return true
  }

  getWidth() {
    return this.canvas.width
  }

  getHeight() {
    return this.canvas.height
  }

  clear() {
    this.clearRect(0, 0, this.getWidth(), this.getHeight())
  }

  clearRect(x, y, width, height) {
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(x, y, width, height)
  }

  render() {
    this.clear()

    for (let y = 0; y < this.mode; y++) {
      for (let x = 0; x < this.mode; x++) {
        let imgState = this.state[y][x]

        if (imgState === -1) {
          if (!this.renderBlank) {
            continue
          }

          imgState = this.mode * this.mode - 1
        }

        const imgX = imgState % this.mode
        const imgY = Math.floor(imgState / this.mode)

        this.ctx.drawImage(this.image,
          imgX * this.tileSize, imgY * this.tileSize,
          this.tileSize, this.tileSize,
          x * this.tileSize, y * this.tileSize,
          this.tileSize, this.tileSize)
      }
    }
  }
}