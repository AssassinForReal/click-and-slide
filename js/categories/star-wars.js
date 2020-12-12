import Category from '../category.js'
import Puzzle from '../puzzle.js'

export const createStarWarsCategory = () => {
  const categoryStarWars = new Category({
    name: 'star-wars',
    title: 'Star Wars',
  })

  categoryStarWars.puzzles.push(new Puzzle({
    name: 'darth-vader',
    title: 'Darth Vader',
    thumbnail: 'images/puzzles/star-wars/darth-vader.png'
  }))
  
  categoryStarWars.puzzles.push(new Puzzle({
    name: 'stormtrooper',
    title: 'Stormtrooper',
    thumbnail: 'images/puzzles/star-wars/stormtrooper.png'
  }))

  categoryStarWars.puzzles.push(new Puzzle({
    name: 'obi-wan-kenobi',
    title: 'Obi Wan Kenobi',
    thumbnail: 'images/puzzles/star-wars/obi-wan-kenobi.png'
  }))

  categoryStarWars.puzzles.push(new Puzzle({
    name: 'emperor',
    title: 'Emperor',
    thumbnail: 'images/puzzles/star-wars/emperor.png'
  }))

  categoryStarWars.puzzles.push(new Puzzle({
    name: 'r2d2',
    title: 'R2D2',
    thumbnail: 'images/puzzles/star-wars/r2d2.png'
  }))

  categoryStarWars.puzzles.push(new Puzzle({
    name: 'c-3po',
    title: 'C-3PO',
    thumbnail: 'images/puzzles/star-wars/c-3po.png'
  }))

  categoryStarWars.puzzles.push(new Puzzle({
    name: 'princess-leia',
    title: 'Princess Leia',
    thumbnail: 'images/puzzles/star-wars/princess-leia.png'
  }))

  categoryStarWars.puzzles.push(new Puzzle({
    name: 'padme-amidala',
    title: 'Padmé Amidala',
    thumbnail: 'images/puzzles/star-wars/padme-amidala.png'
  }))

  categoryStarWars.puzzles.push(new Puzzle({
    name: 'baby-yoda',
    title: 'Baby Yoda',
    thumbnail: 'images/puzzles/star-wars/baby-yoda.png'
  }))

  return categoryStarWars
}