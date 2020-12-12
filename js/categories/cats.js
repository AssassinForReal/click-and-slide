import Category from '../category.js'
import Puzzle from '../puzzle.js'

export const createCatsCategory = () => {
  const categoryCats = new Category({
    name: 'cats',
    title: 'Cats',
  })

  categoryCats.puzzles.push(new Puzzle({
    name: 'american-shorthair',
    title: 'American Shorthair',
    thumbnail: 'images/puzzles/cats/american-shorthair.png'
  }))

  categoryCats.puzzles.push(new Puzzle({
    name: 'abyssinian',
    title: 'Abyssinian',
    thumbnail: 'images/puzzles/cats/abyssinian.png'
  }))

  categoryCats.puzzles.push(new Puzzle({
    name: 'balinese',
    title: 'Balinese',
    thumbnail: 'images/puzzles/cats/balinese.png'
  }))

  categoryCats.puzzles.push(new Puzzle({
    name: 'bengal',
    title: 'Bengal',
    thumbnail: 'images/puzzles/cats/bengal.png'
  }))

  categoryCats.puzzles.push(new Puzzle({
    name: 'birman',
    title: 'Birman',
    thumbnail: 'images/puzzles/cats/birman.png'
  }))

  categoryCats.puzzles.push(new Puzzle({
    name: 'british-shorthair',
    title: 'British Shorthair',
    thumbnail: 'images/puzzles/cats/british-shorthair.png'
  }))

  categoryCats.puzzles.push(new Puzzle({
    name: 'burmilla',
    title: 'Burmilla',
    thumbnail: 'images/puzzles/cats/burmilla.png'
  }))

  categoryCats.puzzles.push(new Puzzle({
    name: 'khao-manee',
    title: 'Khao Manee',
    thumbnail: 'images/puzzles/cats/khao-manee.png'
  }))

  return categoryCats
}
