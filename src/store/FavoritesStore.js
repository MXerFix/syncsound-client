import { makeAutoObservable } from "mobx"

class FavoritesStore {
  constructor() {
    this.favoritesList = (JSON.parse(localStorage.getItem('favorites')) ? JSON.parse(localStorage.getItem('favorites')) : [])
    makeAutoObservable(this)
  }

  addFavoriteId(id) {
    this.favoritesList.push(id)
    this.favoritesList = JSON.parse(JSON.stringify(this.favoritesList))
    localStorage.setItem('favorites', JSON.stringify(this.favoritesList))
  }

  removeFavoriteId(id) {
    this.favoritesList = this.favoritesList.filter((item) => { return item !== id })
    localStorage.setItem('favorites', JSON.stringify(this.favoritesList))
  }

  get FAVORITES_LIST() {
    return this.favoritesList
  }


}

export default new FavoritesStore()