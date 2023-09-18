import { makeAutoObservable } from "mobx"

class BrandsStore {
  constructor() {
    this._brands = []
    makeAutoObservable(this)
  }

  setBrands(brands) {
    return this._brands = brands
  }

  get brands() {
    return this._brands
  }

}

export default new BrandsStore()