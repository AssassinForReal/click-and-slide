import Category from '../category.js'
import Puzzle from '../puzzle.js'

export const createDogsCategory = () => {
  const categoryDogs = new Category({
    name: 'dogs',
    title: 'Dogs',
  })

  categoryDogs.puzzles.push(new Puzzle({
    name: 'pembroke-welsh-corgi',
    title: 'Pembroke Welsh Corgi',
    thumbnail: 'images/puzzles/dogs/pembroke-welsh-corgi.png'
  }))

  categoryDogs.puzzles.push(new Puzzle({
    name: 'australian-shepherd',
    title: 'Australian Shepherd',
    thumbnail: 'images/puzzles/dogs/australian-shepherd.png'
  }))

  categoryDogs.puzzles.push(new Puzzle({
    name: 'beagle',
    title: 'Beagle',
    thumbnail: 'images/puzzles/dogs/beagle.png'
  }))

  categoryDogs.puzzles.push(new Puzzle({
    name: 'golden-retriever',
    title: 'Golden Retriever',
    thumbnail: 'images/puzzles/dogs/golden-retriever.png'
  }))

  categoryDogs.puzzles.push(new Puzzle({
    name: 'yorkshire-terrier',
    title: 'Yorkshire Terrier',
    thumbnail: 'images/puzzles/dogs/yorkshire-terrier.png'
  }))

  categoryDogs.puzzles.push(new Puzzle({
    name: 'labrador-retriever',
    title: 'Labrador Retriever',
    thumbnail: 'images/puzzles/dogs/labrador-retriever.png'
  }))

  return categoryDogs
}
