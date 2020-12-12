import Dialog from '../dialog.js'
import { shuffleArray } from '../utils/arrays.js'
import { getFragment } from '../utils/ui.js'

export default class DialogRecommended extends Dialog {
  constructor(application) {
    super(application, 'dialog-recommended')
  }

  render({ category, puzzleToOmit }) {
    const hPuzzleTitle = this.root.querySelector('.dialog-puzzle-title')
    const hPuzzleList = this.root.querySelector('.dialog-puzzle-list')
    const hBtnDiscard = this.root.querySelector('.btn-discard')
    const puzzles = category.puzzles
    shuffleArray(puzzles)

    hPuzzleTitle.textContent = puzzleToOmit.title

    let displayed = 0

    for (let i = 0; i < puzzles.length; i++) {
      if (displayed === 3) break

      const puzzle = puzzles[i]

      if (puzzle.name === puzzleToOmit.name) {
        continue
      }

      const hPuzzleFragment = getFragment('puzzle-slide')
      const hPuzzle = hPuzzleFragment.firstElementChild

      const hPuzzlePreviewThumbnail = hPuzzle.querySelector('.puzzle-slide-thumbnail')
      const hPuzzlePreviewTitle = hPuzzle.querySelector('.category-title')

      hPuzzlePreviewTitle.textContent = puzzle.title
      hPuzzlePreviewThumbnail.src = puzzle.thumbnail

      hPuzzle.addEventListener('click', () => {
        this.close()

        setTimeout(() => {
          this.application.router.redirect('game', {
            category: category.name,
            puzzle: puzzle.name
          })
        }, 250)
      })

      hPuzzleList.appendChild(hPuzzleFragment)
      displayed++
    }

    hBtnDiscard.addEventListener('click', this.close)

    return super.render()
  }
}
