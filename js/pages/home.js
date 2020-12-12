import CategoryCard from '../components/category-card.js'
import DialogScoreChooser from '../dialogs/dialog-score-chooser.js'
import PageComponent from '../page-component.js'
import { shuffleArray } from '../utils/arrays.js'

export default class HomePage extends PageComponent {
  constructor(application) {
    super(application)
  }

  onMount() {
    const hCategoryList = document.querySelector('.category-list')

    shuffleArray(this.application.categoryList)

    this.application.categoryList.forEach(category => {
      const categoryCard = new CategoryCard(this.application)
      hCategoryList.appendChild(categoryCard.render({ category }))
    })

    const hBtnHighScore = document.querySelector('.btn-high-scores-header')

    hBtnHighScore.addEventListener('click', () => {
      const dialogScoreChooser = new DialogScoreChooser(this.application)
      dialogScoreChooser.render()
    })
  }
}
