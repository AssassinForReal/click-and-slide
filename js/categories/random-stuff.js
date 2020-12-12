import Category from '../category.js'
import Puzzle from '../puzzle.js'

export const createRandomStuffCategory = () => {
  const categoryRandomStuff = new Category({
    name: 'random-stuff',
    title: 'Random Stuff',
  })

  categoryRandomStuff.puzzles.push(new Puzzle({
    name: 'crazy-hamburger',
    title: 'Crazy Hamburger',
    thumbnail: 'images/puzzles/random-stuff/crazy-hamburger.png'
  }))
  
  categoryRandomStuff.puzzles.push(new Puzzle({
    name: 'face-swap',
    title: 'Face Swap',
    thumbnail: 'images/puzzles/random-stuff/face-swap.png'
  }))

  categoryRandomStuff.puzzles.push(new Puzzle({
    name: 'mr-incredible',
    title: 'Mr. Incredible',
    thumbnail: 'images/puzzles/random-stuff/mr-incredible.png'
  }))

  categoryRandomStuff.puzzles.push(new Puzzle({
    name: 'violet-parr',
    title: 'Violet Parr',
    thumbnail: 'images/puzzles/random-stuff/violet-parr.png'
  }))

  return categoryRandomStuff
}
