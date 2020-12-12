import Component from '../component.js'

export default class PuzzleSlide extends Component {
  constructor(application) {
    super(application, 'puzzle-slide')
  }

  render({ index, puzzle }) {
    this.root.dataset.index = index
    this.root.dataset.puzzleName = puzzle.name

    const hThumbail = this.root.querySelector('.puzzle-slide-thumbnail')
    hThumbail.src = puzzle.thumbnail
    hThumbail.alt = puzzle.title

    const hTitle = this.root.querySelector('.category-title')
    hTitle.textContent = puzzle.title

    return super.render()
  }
}
