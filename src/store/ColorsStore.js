import { makeAutoObservable } from "mobx"

class ColorsStore {
  constructor() {
    this._colors = []
    makeAutoObservable(this)
  }

  setColors(colors) {
    return this._colors = colors
  }

  get colors() {
    return this._colors
  }

}

export default new ColorsStore()