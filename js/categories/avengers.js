import Category from '../category.js'
import Puzzle from '../puzzle.js'

export const createAvengersCategory = () => {
  const categoryAvengers = new Category({
    name: 'avengers',
    title: 'Avengers',
  })

  categoryAvengers.puzzles.push(new Puzzle({
    name: 'iron-man',
    title: 'Iron Man',
    thumbnail: 'images/puzzles/avengers/iron-man.png'
  }))

  categoryAvengers.puzzles.push(new Puzzle({
    name: 'thor',
    title: 'Thor',
    thumbnail: 'images/puzzles/avengers/thor.png'
  }))

  categoryAvengers.puzzles.push(new Puzzle({
    name: 'black-widow',
    title: 'Black Widow',
    thumbnail: 'images/puzzles/avengers/black-widow.png'
  }))

  categoryAvengers.puzzles.push(new Puzzle({
    name: 'hulk',
    title: 'Hulk',
    thumbnail: 'images/puzzles/avengers/hulk.png'
  }))

  categoryAvengers.puzzles.push(new Puzzle({
    name: 'spider-man',
    title: 'Spider-Man',
    thumbnail: 'images/puzzles/avengers/spider-man.png'
  }))

  categoryAvengers.puzzles.push(new Puzzle({
    name: 'captain-america',
    title: 'Captain America',
    thumbnail: 'images/puzzles/avengers/captain-america.png'
  }))

  categoryAvengers.puzzles.push(new Puzzle({
    name: 'ant-man',
    title: 'Ant-Man',
    thumbnail: 'images/puzzles/avengers/ant-man.png'
  }))

  return categoryAvengers
}
