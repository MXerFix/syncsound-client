import { makeAutoObservable } from "mobx"

class BoxberryStore {
  constructor() {
    this._zips = []
    this._cities = []
    this._pvzs = []
    makeAutoObservable(this)
  }

  setZips(zips) {
    return this._zips = zips
  }

  setCities(cities) {
    return this._cities = cities
  }

  setPvzs(pvsz) {
    return this._pvzs = pvsz
  }

  get zips() {
    return this._zips
  }

  get cities() {
    return this._cities
  }

  get pvzs() {
    return this._pvzs
  }

}

export default new BoxberryStore()