import Dialog from '../dialog.js'
import { loadScoresFromCookies } from '../high-score.js'
import { wordByGramaticalNumber } from '../utils/words.js'
import DialogHighScores from './dialog-high-scores.js'

export default class DialogScoreChooser extends Dialog {
  constructor(application) {
    super(application, 'dialog-score-chooser')
  }

  render() {
    const hScoreList = this.root.querySelector('.dialog-score-chooser-score-list')
    const hDialogTitle = this.root.querySelector('.dialog-title')
    hDialogTitle.style.marginBottom = '40px'

    const scores = loadScoresFromCookies()
    const categoryNames = Object.keys(scores)

    if (categoryNames.length === 0) {
      hScoreList.textContent = 'No High Scores'
      hScoreList.style.textAlign = 'center'
      return super.render()
    }

    const { categoryList } = this.application

    categoryNames.forEach(categoryName => {
      const category = categoryList.find(category => category.name === categoryName)
      const categoryRecords = scores[categoryName]
      const puzzleNames = Object.keys(categoryRecords)
      
      puzzleNames.forEach(puzzleName => {
        const puzzle = category.puzzles.find(puzzle => puzzle.name === puzzleName)
        const puzzleRecords = categoryRecords[puzzleName]
        const modes = Object.keys(puzzleRecords)
        
        modes.forEach(mode => {
          const modeRecords = puzzleRecords[mode]
          const count = modeRecords.length

          const hRow = document.createElement('div')
          hRow.style.display = 'flex'
          hRow.style.alignItems = 'center'
          hRow.style.borderBottom = '1px solid #333'

          const hThumbnail = document.createElement('img')
          hThumbnail.src = puzzle.thumbnail
          hThumbnail.style.width = '36px'
          hThumbnail.style.marginRight = '15px'

          const hName = document.createElement('div')
          hName.style.flexGrow = 1
          hName.innerHTML = `${category.title} - ${puzzle.title} - ${mode} &times; ${mode}`

          const hScoreCount = document.createElement('div')
          hScoreCount.style.color = '#777'
          hScoreCount.style.fontSize = '14px'
          hScoreCount.textContent = `${count} ${wordByGramaticalNumber(count, ['score', 'scores'])}`
          
          hRow.appendChild(hThumbnail)
          hRow.appendChild(hName)
          hRow.appendChild(hScoreCount)
          hScoreList.appendChild(hRow)

          hRow.addEventListener('click', () => {
            const dialogHighScores = new DialogHighScores(this.application)
            dialogHighScores.render({
              category, puzzle, mode
            })
          })
        })
      })
    })

    return super.render()
  }
}
