import Category from '../category.js'
import Puzzle from '../puzzle.js'

export const createCyberpunk2077Category = () => {
  const categoryCyberpunk2077 = new Category({
    name: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
  })

  categoryCyberpunk2077.puzzles.push(new Puzzle({
    name: 'johnny-silverhand',
    title: 'Johnny Silverhand',
    thumbnail: 'images/puzzles/cyberpunk-2077/johnny-silverhand.png'
  }))

  categoryCyberpunk2077.puzzles.push(new Puzzle({
    name: 'v-male',
    title: 'V Male',
    thumbnail: 'images/puzzles/cyberpunk-2077/v-male.png'
  }))

  categoryCyberpunk2077.puzzles.push(new Puzzle({
    name: 'v-female',
    title: 'V Female',
    thumbnail: 'images/puzzles/cyberpunk-2077/v-female.png'
  }))

  categoryCyberpunk2077.puzzles.push(new Puzzle({
    name: 'jackie-welles',
    title: 'Jackie Welles',
    thumbnail: 'images/puzzles/cyberpunk-2077/jackie-welles.png'
  }))

  categoryCyberpunk2077.puzzles.push(new Puzzle({
    name: 'judy-alvarez',
    title: 'Judy Alvarez',
    thumbnail: 'images/puzzles/cyberpunk-2077/judy-alvarez.png'
  }))

  return categoryCyberpunk2077
}
