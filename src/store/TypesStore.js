import { makeAutoObservable, observable, toJS } from "mobx"

class TypesStore {

  constructor() {
    this._types = []
    makeAutoObservable(this)
  }

  get types() {
    return this._types
  }

  setTypes(data) {
    this._types = data
  }

}

export default new TypesStore()