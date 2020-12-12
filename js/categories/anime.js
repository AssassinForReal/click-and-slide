import Category from '../category.js'
import Puzzle from '../puzzle.js'

export const createAnimeCategory = () => {
  const categoryAnime = new Category({
    name: 'anime',
    title: 'Anime',
  })

  categoryAnime.puzzles.push(new Puzzle({
    name: 'l-lawliet',
    title: 'L Lawliet',
    thumbnail: 'images/puzzles/anime/l-lawliet.png'
  }))

  categoryAnime.puzzles.push(new Puzzle({
    name: 'kirito',
    title: 'Kirito',
    thumbnail: 'images/puzzles/anime/kirito.png'
  }))

  categoryAnime.puzzles.push(new Puzzle({
    name: 'light-yagami',
    title: 'Light Yagami',
    thumbnail: 'images/puzzles/anime/light-yagami.png'
  }))

  categoryAnime.puzzles.push(new Puzzle({
    name: 'naruto-uzumaki',
    title: 'Naruto Uzumaki',
    thumbnail: 'images/puzzles/anime/naruto-uzumaki.png'
  }))

  categoryAnime.puzzles.push(new Puzzle({
    name: 'yuno-gasai',
    title: 'Yuno Gasai',
    thumbnail: 'images/puzzles/anime/yuno-gasai.png'
  }))
  
  categoryAnime.puzzles.push(new Puzzle({
    name: 'eren-jaeger',
    title: 'Eren Jaeger',
    thumbnail: 'images/puzzles/anime/eren-jaeger.png'
  }))

  categoryAnime.puzzles.push(new Puzzle({
    name: 'lelouch-lamperouge',
    title: 'Lelouch Lamperouge',
    thumbnail: 'images/puzzles/anime/lelouch-lamperouge.png'
  }))

  categoryAnime.puzzles.push(new Puzzle({
    name: 'itachi-uchiha',
    title: 'Itachi Uchiha',
    thumbnail: 'images/puzzles/anime/itachi-uchiha.png'
  }))

  categoryAnime.puzzles.push(new Puzzle({
    name: 'mikasa-ackerman',
    title: 'Mikasa Ackerman',
    thumbnail: 'images/puzzles/anime/mikasa-ackerman.png'
  }))

  return categoryAnime
}
