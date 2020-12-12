import Component from '../component.js'
import { wordByGramaticalNumber } from '../utils/words.js'

export default class CategoryCard extends Component {
  constructor(application) {
    super(application, 'category-card')
  }

  render({ category }) {
    const hThumbail = this.root.querySelector('.category-thumbnail')
    hThumbail.src = category.thumbnail
    hThumbail.alt = category.title

    const hTitle = this.root.querySelector('.category-title')
    hTitle.textContent = category.title

    const hPuzzleCount = this.root.querySelector('.category-puzzle-count')
    const puzzleCount = category.puzzles.length
    const puzzleWord = wordByGramaticalNumber(puzzleCount, ['puzzle', 'puzzles'])
    hPuzzleCount.textContent = `${puzzleCount} ${puzzleWord}`

    this.root.addEventListener('click', () => {
      const router = this.application.router

      router.redirect('puzzles', {
        category: category.name
      })
    })

    return super.render()
  }
}
