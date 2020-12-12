import PuzzleSlide from '../components/puzzle-slide.js'
import DialogScoreChooser from '../dialogs/dialog-score-chooser.js'
import PageComponent from '../page-component.js'
import SolvingPhase from '../solving-phase.js'

export default class GamePage extends PageComponent {
  constructor(application) {
    super(application)
    this.solvingPhase = new SolvingPhase(application)
  }

  onMount(params) {
    const { router } = this.application
    const currentCategoryName = params.category

    if (!currentCategoryName) {
      router.redirect('', { category: null, puzzle: null })
      return
    }

    const currentCategory = this.application.categoryList.find(category => (
      category.name === currentCategoryName
    ))

    if (!currentCategory) {
      router.redirect('', { category: null, puzzle: null })
      return
    }

    const currentPuzzleName = params.puzzle

    if (!currentPuzzleName) {
      router.redirect('puzzles', { category: currentCategoryName, puzzle: null })
      return
    }

    const currentPuzzle = currentCategory.puzzles.find(puzzle => (
      puzzle.name === currentPuzzleName
    ))

    if (!currentPuzzle) {
      router.redirect('puzzles', { category: currentCategoryName, puzzle: null })
      return
    }

    const { puzzles } = currentCategory
    const hSectionTitle = document.querySelector('.section-title')
    const hSliderOuter = document.querySelector('.puzzle-slider-outer')
    const hSliderInner = document.querySelector('.puzzle-slider-inner')
    const hCanvas = document.querySelector('.puzzle-canvas')
    const hBtnPrevious = document.querySelector('.btn-previous')
    const hBtnNext = document.querySelector('.btn-next')
    const hBtnBack = document.querySelector('.btn-back')
    const hModeButtons = document.querySelector('.mode-buttons')
    const ctx = hCanvas.getContext('2d')

    const slideList = []

    let currentSlideIndex = 0

    const handlePrevious = () => {
      if (currentSlideIndex === 0) {
        currentSlideIndex = puzzles.length
        hSliderOuter.scrollTo({
          left: slideList.length * 150
        })
      }

      const hPreviousSlide = slideList[--currentSlideIndex]
      const hPuzzleName = hPreviousSlide.dataset.puzzleName

      router.replace('game', { puzzle: hPuzzleName })

      hSliderOuter.scrollTo({
        left: currentSlideIndex * 150,
        behavior: 'smooth'
      })
    }

    const handleNext = () => {
      if (currentSlideIndex >= puzzles.length) {
        currentSlideIndex = 0
        hSliderOuter.scrollTo({
          left: 0
        })
      }

      const hNextSlide = slideList[++currentSlideIndex]
      const hPuzzleName = hNextSlide.dataset.puzzleName

      router.replace('game', { puzzle: hPuzzleName })

      hSliderOuter.scrollTo({
        left: currentSlideIndex * 150,
        behavior: 'smooth'
      })
    }

    const enableControls = () => {
      hBtnPrevious.addEventListener('click', handlePrevious)
      hBtnNext.addEventListener('click', handleNext)
    }

    hSectionTitle.innerHTML = `Category: <span class="text-white">${currentCategory.title}</span>`

    hSectionTitle.addEventListener('click', () => {
      const router = this.application.router

      router.redirect('puzzles', {
        category: currentCategoryName,
        puzzle: null
      })
    })

    if (hBtnBack) {
      hBtnBack.addEventListener('click', () => router.redirect('', { category: null, puzzle: null }))
    }

    for (let i = 0; i < puzzles.length + 1; i++) {
      const puzzle = puzzles[i % puzzles.length]
      const puzzleSlide = new PuzzleSlide(this.application)

      hSliderInner.appendChild(puzzleSlide.render({ index: i, puzzle }))
      slideList.push(puzzleSlide.root)

      if (currentPuzzleName === puzzle.name) {
        currentSlideIndex = i
        puzzleSlide.root.scrollIntoView()
      }
    }

    enableControls()

    for (let mode = 3; mode <= 6; mode++) {
      const label = `${mode} &times; ${mode}`
      const hModeBtn = document.createElement('button')
      hModeBtn.innerHTML = label
      hModeBtn.className = 'btn btn-mode'

      hModeBtn.addEventListener('click', async () => {
        if (this.solvingPhase.shuffling) return

        const hCurrentSlide = slideList[currentSlideIndex]
        const hCurrentImage = hCurrentSlide.querySelector('.puzzle-slide-thumbnail')
        const puzzleName = hCurrentSlide.dataset.puzzleName
        const puzzle = puzzles.find(puzzle => puzzle.name === puzzleName)

        const hBtnsMode = document.querySelectorAll('.btn-mode')

        hBtnsMode.forEach(button => {
          button.disabled = true
        })

        await this.solvingPhase.start({
          image: hCurrentImage,
          category: currentCategory,
          puzzle: puzzle,
          mode,
          canvas: hCanvas
        })

        hBtnsMode.forEach(button => {
          button.disabled = false
        })
      })

      hModeButtons.appendChild(hModeBtn)
    }

    hCanvas.width = 512
    hCanvas.height = 512

    const hBtnHighScore = document.querySelector('.btn-high-scores-header')

    hBtnHighScore.addEventListener('click', () => {
      const dialogScoreChooser = new DialogScoreChooser(this.application)
      dialogScoreChooser.render()
    })
  }

  onUnmount() {
    this.solvingPhase.stop()
  }
}
