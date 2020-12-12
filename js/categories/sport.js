import Category from '../category.js'
import Puzzle from '../puzzle.js'

export const createSportCategory = () => {
  const categorySport = new Category({
    name: 'sport',
    title: 'Sport',
  })

  categorySport.puzzles.push(new Puzzle({
    name: 'cristiano-ronaldo',
    title: 'Cristiano Ronaldo',
    thumbnail: 'images/puzzles/sport/cristiano-ronaldo.png'
  }))

  categorySport.puzzles.push(new Puzzle({
    name: 'lionel-messi',
    title: 'Lionel Messi',
    thumbnail: 'images/puzzles/sport/lionel-messi.png'
  }))

  categorySport.puzzles.push(new Puzzle({
    name: 'serena-williams',
    title: 'Serena Williams',
    thumbnail: 'images/puzzles/sport/serena-williams.png'
  }))

  categorySport.puzzles.push(new Puzzle({
    name: 'lebron-james',
    title: 'Lebron James',
    thumbnail: 'images/puzzles/sport/lebron-james.png'
  }))

  categorySport.puzzles.push(new Puzzle({
    name: 'mike-tyson',
    title: 'Mike Tyson',
    thumbnail: 'images/puzzles/sport/mike-tyson.png'
  }))

  return categorySport
}
