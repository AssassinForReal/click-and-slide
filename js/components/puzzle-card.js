import Component from '../component.js'

export default class PuzzleCard extends Component {
  constructor(application) {
    super(application, 'puzzle-card')
  }

  render({ category, puzzle }) {
    const router = this.application.router

    const hThumbail = this.root.querySelector('.category-thumbnail')
    hThumbail.src = puzzle.thumbnail
    hThumbail.alt = puzzle.title

    const hTitle = this.root.querySelector('.category-title')
    hTitle.textContent = puzzle.title

    this.root.addEventListener('click', () => {
      router.redirect('game', {
        category: category.name,
        puzzle: puzzle.name
      })
    })

    return super.render()
  }
}
