import Category from '../category.js'
import Puzzle from '../puzzle.js'

export const createCarsCategory = () => {
  const categoryCars = new Category({
    name: 'cars',
    title: 'Cars',
  })

  categoryCars.puzzles.push(new Puzzle({
    name: 'bugatti-la-voiture-noire',
    title: 'Bugatti La Voiture Noire',
    thumbnail: 'images/puzzles/cars/bugatti-la-voiture-noire.png'
  }))

  categoryCars.puzzles.push(new Puzzle({
    name: 'rolls-royce sweptail',
    title: 'Rolls-Royce Sweptail',
    thumbnail: 'images/puzzles/cars/rolls-royce sweptail.png'
  }))

  categoryCars.puzzles.push(new Puzzle({
    name: 'lamborghini-venero',
    title: 'Lamborghini Venero',
    thumbnail: 'images/puzzles/cars/lamborghini-venero.png'
  }))

  categoryCars.puzzles.push(new Puzzle({
    name: 'mercedes-benz-maybach-exelero',
    title: 'Mercedes-Benz Maybach Exelero',
    thumbnail: 'images/puzzles/cars/mercedes-benz-maybach-exelero.png'
  }))

  categoryCars.puzzles.push(new Puzzle({
    name: 'koenigsegg-ccxr-trevita',
    title: 'Koenigsegg CCXR Trevita',
    thumbnail: 'images/puzzles/cars/koenigsegg-ccxr-trevita.png'
  }))

  categoryCars.puzzles.push(new Puzzle({
    name: 'ferrari-pininfarina-sergio',
    title: 'Ferrari Pininfarina Sergio',
    thumbnail: 'images/puzzles/cars/ferrari-pininfarina-sergio.png'
  }))

  return categoryCars
}
