import AbstractCategory from './abstract-category.js'
import { randomInt } from './utils/random.js'

export default class Category extends AbstractCategory {
  constructor({ name, title, thumbnail, puzzles } = {}) {
    super({ name, title, thumbnail })
    this.puzzles = puzzles ?? []
  }

  get thumbnail() {
    if (this._thumbnail) return this._thumbnail
    return this.puzzles[randomInt(0, this.puzzles.length - 1)].thumbnail
  }

  set thumbnail(thumbnail) {
    this._thumbnail = thumbnail
  }
}
