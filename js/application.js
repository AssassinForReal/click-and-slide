import { createAnimeCategory } from './categories/anime.js'
import { createAvengersCategory } from './categories/avengers.js'
import { createCarsCategory } from './categories/cars.js'
import { createCatsCategory } from './categories/cats.js'
import { createCyberpunk2077Category } from './categories/cyberpunk2077.js'
import { createDogsCategory } from './categories/dogs.js'
import { createLeagueOfLegendsCategory } from './categories/league-of-legends.js'
import { createRandomStuffCategory } from './categories/random-stuff.js'
import { createSportCategory } from './categories/sport.js'
import { createStarWarsCategory } from './categories/star-wars.js'
import Router from './router.js'

export default class Application {
  constructor() {
    this.hAppRoot = document.querySelector('#app-root')
    this.categoryList = []
    this.pages = []
    this.currentPage = null
    this.router = new Router()
  }

  start() {
    this.createCategories()
    this.createRouter()
  }

  async createRouter() {
    const pages = ['home', 'puzzles', 'game']

    await Promise.all(
      pages.map(async (page, index) => {
        const { default: PageComponent } = await import(`./pages/${page}.js`)
        const pageComponent = new PageComponent(this)

        this.router.route(page, (params) => {
          if (this.currentPage) {
            this.currentPage.onUnmount()
          }

          this.currentPage = pageComponent
          this.renderPage(page)
          this.currentPage.onMount(params)
        }, {
          default: index === 0
        })
      })
    )

    this.router.onChange(() => ({
      htmlContent: this.hAppRoot.innerHTML
    }))

    this.router.handle()

    window.addEventListener('popstate', () => {
      this.router.handle()
    })
  }

  renderPage(page) {
    const hPageTemplate = document.getElementById(`template-page-${page}`)
    const hPageFragment = hPageTemplate.content.cloneNode(true)
    this.hAppRoot.innerHTML = ''
    this.hAppRoot.appendChild(hPageFragment)
  }

  createCategories() {
    this.categoryList.push(createAnimeCategory())
    this.categoryList.push(createAvengersCategory())
    this.categoryList.push(createCyberpunk2077Category())
    this.categoryList.push(createCarsCategory())
    this.categoryList.push(createSportCategory())
    this.categoryList.push(createLeagueOfLegendsCategory())
    this.categoryList.push(createStarWarsCategory())
    this.categoryList.push(createCatsCategory())
    this.categoryList.push(createDogsCategory())
    this.categoryList.push(createRandomStuffCategory())
  }
}
