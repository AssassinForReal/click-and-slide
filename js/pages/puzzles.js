import PuzzleCard from '../components/puzzle-card.js'
import DialogScoreChooser from '../dialogs/dialog-score-chooser.js'
import PageComponent from '../page-component.js'
import { shuffleArray } from '../utils/arrays.js'

export default class PuzzlesPage extends PageComponent {

  constructor(application) {
    super(application)
  }

  onMount(params) {
    const { router } = this.application
    const currentCategoryName = params.category

    if (!currentCategoryName) {
      router.redirect('', { category: null })
      return
    }

    const currentCategory = this.application.categoryList.find(category => (
      category.name === currentCategoryName
    ))

    if (!currentCategory) {
      router.redirect('', { category: null })
      return
    }

    const { puzzles } = currentCategory

    const hPuzzleList = document.querySelector('.category-list')
    const hSectionTitle = document.querySelector('.section-title')
    const hBtnBack = document.querySelector('.btn-back')

    hSectionTitle.innerHTML = `Category: <span class="text-white">${currentCategory.title}</span>`

    if (hBtnBack) {
      hBtnBack.addEventListener('click', () => router.redirect('', { category: null }))
    }

    shuffleArray(puzzles)

    puzzles.forEach(puzzle => {
      const puzzleCard = new PuzzleCard(this.application)
      
      hPuzzleList.appendChild(puzzleCard.render({
        category: currentCategory,
        puzzle
      }))
    })

    const hBtnHighScore = document.querySelector('.btn-high-scores-header')

    hBtnHighScore.addEventListener('click', () => {
      const dialogScoreChooser = new DialogScoreChooser(this.application)
      dialogScoreChooser.render()
    })
  }
}
