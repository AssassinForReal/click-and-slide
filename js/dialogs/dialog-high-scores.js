import Dialog from '../dialog.js'
import { getHighScores } from '../high-score.js'
import { formatTimeString, formatDate } from '../utils/time.js'
import DialogRecommended from './dialog-recommended.js'

export default class DialogHighScores extends Dialog {
  constructor(application) {
    super(application, 'dialog-high-scores')
  }

  render({ category, puzzle, mode, highlightId = -1, showRecommended = false }) {
    this.category = category
    this.puzzle = puzzle
    this.mode = mode
    this.showRecommended = showRecommended

    this.hPuzzlePreview = this.root.querySelector('.dialog-puzzle-preview')
    this.hPuzzlePreviewLabel = this.root.querySelector('.dialog-puzzle-preview-label')
    this.hPuzzleName = this.root.querySelector('.dialog-puzzle-name')
    this.hCategoryName = this.root.querySelector('.dialog-category-name')
    this.hHighScoreList = this.root.querySelector('.dialog-high-score-list')

    this.hPuzzlePreview.src = puzzle.thumbnail
    this.hPuzzlePreviewLabel.innerHTML = `${mode} &times; ${mode}`
    this.hPuzzleName.textContent = puzzle.title
    this.hCategoryName.textContent = category.title

    const highScores = getHighScores({
      category: category.name,
      puzzle: puzzle.name,
      mode
    })

    const limit = 10

    let shown = false

    if (highScores.length === 0) {
      this.hHighScoreList.append('No High Scores')
    } else {
      highScores.slice(0, limit).forEach((score, index) => {
        const highlight = highlightId === score.id
        const hRow = this.renderRow(score, index + 1, highlight)
        this.hHighScoreList.append(hRow)

        if (highlight) {
          shown = true
        }
      })

      if (!shown) {
        const scoreIndex = highScores.findIndex(score => score.id === highlightId)

        if (scoreIndex >= 0) {
          const score = highScores[scoreIndex]

          const hDottedRow = document.createElement('div')
          hDottedRow.textContent = '. . .'
          hDottedRow.style.marginBottom = '8px'
          this.hHighScoreList.append(hDottedRow)

          const hRow = this.renderRow(score, scoreIndex + 1, true)
          this.hHighScoreList.append(hRow)
        }
      }
    }

    return super.render()
  }

  renderRow(score, place, highlight = false) {
    const nickname = score.nickname
    const time = formatTimeString(score.score)
    const createdAt = formatDate(score.createdAt)

    const hRow = document.createElement('div')
    const hNickname = document.createElement('div')
    const hPlace = document.createElement('div')
    const hTime = document.createElement('div')
    const hCreatedAt = document.createElement('div')

    hRow.className = 'hs-row'

    if (highlight) {
      hRow.classList.add('highlight')

      const hArrowLeft = document.createElement('img')
      hArrowLeft.src = 'images/icons/arrow-left.svg'
      hArrowLeft.className = 'highlight-arrow left'
      hRow.appendChild(hArrowLeft)

      const hArrowRight = document.createElement('img')
      hArrowRight.src = 'images/icons/arrow-right.svg'
      hArrowRight.className = 'highlight-arrow right'
      hRow.appendChild(hArrowRight)
    }

    hPlace.className = 'hs-col hs-place'
    hPlace.textContent = place

    hNickname.className = 'hs-col hs-nickname'
    hNickname.textContent = nickname

    hTime.className = 'hs-col hs-time'
    hTime.textContent = time

    hCreatedAt.className = 'hs-col hs-created-at'
    hCreatedAt.textContent = createdAt

    hRow.append(hPlace, hNickname, hTime, hCreatedAt)
    return hRow
  }

  onClose() {
    if (this.showRecommended) {
      const dialogRecommended = new DialogRecommended(this.application)
      dialogRecommended.render({
        category: this.category,
        puzzleToOmit: this.puzzle
      })
    }
  }
}
