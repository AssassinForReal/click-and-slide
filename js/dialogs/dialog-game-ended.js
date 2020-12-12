import Dialog from '../dialog.js'
import DialogHighScores from './dialog-high-scores.js'
import DialogRecommended from './dialog-recommended.js'
import { getHighScores, saveScore } from '../high-score.js'
import { formatTimeStringEnglish } from '../utils/time.js'
import { ordinalNumber } from '../utils/words.js'
import DialogError from './dialog-error.js'

export default class DialogGameEnded extends Dialog {
  constructor(application) {
    super(application, 'dialog-game-ended')
  }

  render({ score, imageUrl, category, puzzle, mode }) {
    this.score = score
    this.imageUrl = imageUrl
    this.category = category
    this.puzzle = puzzle
    this.mode = mode

    this.hSolvedIn = this.root.querySelector('.dialog-solved-in')
    this.hPuzzlePreview = this.root.querySelector('.dialog-puzzle-preview')
    this.hPuzzlePreviewLabel = this.root.querySelector('.dialog-puzzle-preview-label')
    this.hPuzzleName = this.root.querySelector('.dialog-puzzle-name')
    this.hCategoryName = this.root.querySelector('.dialog-category-name')
    this.hBtnSave = this.root.querySelector('.btn-save')
    this.hBtnHighScores = this.root.querySelector('.btn-high-scores')
    this.hSubtitle = this.root.querySelector('.dialog-subtitle')

    this.hSolvedIn.textContent = formatTimeStringEnglish(score)
    this.hPuzzlePreview.src = imageUrl
    this.hPuzzlePreviewLabel.innerHTML = `${mode} &times; ${mode}`
    this.hPuzzleName.textContent = puzzle.title
    this.hCategoryName.textContent = category.title

    const highScores = getHighScores({
      category: category.name,
      puzzle: puzzle.name,
      mode
    })

    let place = 1

    if (highScores.length > 0) {
      const index = highScores.findIndex(highScore => score < highScore.score)

      if (index === -1) {
        place = highScores.length + 1
      } else {
        place = index + 1
      }
    }

    if (place === 1) {
      const hNewBest = document.createElement('div')
      hNewBest.className = 'dialog-new-best'
      this.dialogContent.firstElementChild.insertBefore(hNewBest, this.hSubtitle.nextSibling)

      const hNewBestText = document.createElement('div')
      hNewBestText.textContent = 'New Best Score!'

      const hStarLeft = document.createElement('img')
      hStarLeft.src = 'images/icons/star.svg'
      hStarLeft.className = 'dialog-star star-left'

      const hStarRight = document.createElement('img')
      hStarRight.src = 'images/icons/star.svg'
      hStarRight.className = 'dialog-star star-right'

      hNewBest.appendChild(hStarLeft)
      hNewBest.appendChild(hNewBestText)
      hNewBest.appendChild(hStarRight)
    } else {
      const hPlace = document.createElement('div')
      hPlace.className = 'dialog-place'
      hPlace.textContent = `${ordinalNumber(place)} place`
      this.dialogContent.firstElementChild.insertBefore(hPlace, this.hSubtitle.nextSibling)
    }

    this.hBtnSave.addEventListener('click', this.displayDialogSaveScore)
    this.hBtnHighScores.addEventListener('click', () => this.displayDialogHighScores())

    return super.render()
  }

  displayDialogHighScores = (highlightId = -1, showRecommended = false) => {
    const dialogHighScores = new DialogHighScores(this.application)

    dialogHighScores.render({
      category: this.category,
      puzzle: this.puzzle,
      mode: this.mode,
      highlightId,
      showRecommended
    })
  }

  displayDialogSaveScore = () => {
    this.hBtnSave.removeEventListener('click', this.displayDialogSaveScore)
    this.hBtnSave.textContent = 'Save'

    this.hBtnHighScores.remove()

    const hInput = document.createElement('input')
    hInput.className = 'dialog-input'
    hInput.placeholder = 'Enter Your name'
    this.dialogContent.firstElementChild.insertBefore(hInput, this.hBtnSave)
    hInput.focus()

    hInput.addEventListener('click', () => {
      hInput.classList.remove('shake', 'control-invalid')
    })

    const handleSaveAttempt = () => {
      const nickname = hInput.value

      if (!nickname) {
        hInput.classList.remove('shake')

        setTimeout(() => {
          hInput.classList.add('shake', 'control-invalid')
        }, 10)

        return
      }

      try {
        const scoreId = saveScore({
          category: this.category.name,
          puzzle: this.puzzle.name,
          mode: this.mode,
          nickname,
          score: this.score
        })
  
        this.close()
        this.displayDialogHighScores(scoreId, true)
      } catch (err) {
        new DialogError(this.application).render(err)
      }
    }

    this.hBtnSave.addEventListener('click', handleSaveAttempt)

    hInput.addEventListener('keypress', event => {
      if (event.code === 'Enter') {
        handleSaveAttempt()
      }
    })

    hInput.addEventListener('input', () => {
      hInput.value = hInput.value.split('').slice(0, 20).join('')
    })
  }

  onClose(closeReason) {
    if (closeReason === Dialog.CLOSE_USER) {
      const dialogRecommended = new DialogRecommended(this.application)
      dialogRecommended.render({
        category: this.category,
        puzzleToOmit: this.puzzle
      })
    }
  }
}
