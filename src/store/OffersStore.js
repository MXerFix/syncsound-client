import { makeAutoObservable } from "mobx"

class OffersStore {
  constructor() {
    this._offers = []
    makeAutoObservable(this)
  }

  setOffers({offers}) {
    return this._offers = offers
  }

  get offers() {
    return this._offers
  }

}

export default new OffersStore()