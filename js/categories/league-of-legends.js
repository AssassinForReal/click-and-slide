import Category from '../category.js'
import Puzzle from '../puzzle.js'

export const createLeagueOfLegendsCategory = () => {
  const categoryLeagueOfLegends = new Category({
    name: 'league-of-legends',
    title: 'League of Legends',
  })

  categoryLeagueOfLegends.puzzles.push(new Puzzle({
    name: 'ezreal',
    title: 'Ezreal',
    thumbnail: 'images/puzzles/league-of-legends/ezreal.png'
  }))

  categoryLeagueOfLegends.puzzles.push(new Puzzle({
    name: 'ahri',
    title: 'Ahri',
    thumbnail: 'images/puzzles/league-of-legends/ahri.png'
  }))

  categoryLeagueOfLegends.puzzles.push(new Puzzle({
    name: 'darius',
    title: 'Darius',
    thumbnail: 'images/puzzles/league-of-legends/darius.png'
  }))

  categoryLeagueOfLegends.puzzles.push(new Puzzle({
    name: 'lucian',
    title: 'Lucian',
    thumbnail: 'images/puzzles/league-of-legends/lucian.png'
  }))

  categoryLeagueOfLegends.puzzles.push(new Puzzle({
    name: 'riven',
    title: 'Riven',
    thumbnail: 'images/puzzles/league-of-legends/riven.png'
  }))

  categoryLeagueOfLegends.puzzles.push(new Puzzle({
    name: 'draven',
    title: 'Draven',
    thumbnail: 'images/puzzles/league-of-legends/draven.png'
  }))

  categoryLeagueOfLegends.puzzles.push(new Puzzle({
    name: 'sion',
    title: 'Sion',
    thumbnail: 'images/puzzles/league-of-legends/sion.png'
  }))

  categoryLeagueOfLegends.puzzles.push(new Puzzle({
    name: 'kaisa',
    title: 'Kai\'Sa',
    thumbnail: 'images/puzzles/league-of-legends/kaisa.png'
  }))

  categoryLeagueOfLegends.puzzles.push(new Puzzle({
    name: 'caitlyn',
    title: 'Caitlyn',
    thumbnail: 'images/puzzles/league-of-legends/caitlyn.png'
  }))

  categoryLeagueOfLegends.puzzles.push(new Puzzle({
    name: 'irelia',
    title: 'Irelia',
    thumbnail: 'images/puzzles/league-of-legends/irelia.png'
  }))
  
  categoryLeagueOfLegends.puzzles.push(new Puzzle({
    name: 'yasuo',
    title: 'Yasuo',
    thumbnail: 'images/puzzles/league-of-legends/yasuo.png'
  }))

  categoryLeagueOfLegends.puzzles.push(new Puzzle({
    name: 'poro',
    title: 'Poro',
    thumbnail: 'images/puzzles/league-of-legends/poro.png'
  }))
  
  return categoryLeagueOfLegends
}
