import { makeAutoObservable, toJS } from "mobx"
import DeviceStore from "./DeviceStore"


class BasketStore {
  constructor() {
    this.basketList = (JSON.parse(localStorage.getItem('basket')) ?? [])
    makeAutoObservable(this)
  }

  setBasketList(list) {
    return this.basketList = list
  }

  addBasketId(id) {
    this.basketList.push(id)
    this.basketList = JSON.parse(JSON.stringify(this.basketList))
    localStorage.setItem('basket', JSON.stringify(this.basketList))
  }

  removeBasketId(id) {
    this.basketList = this.basketList.filter((item) => { return item !== id })
    localStorage.setItem('basket', JSON.stringify(this.basketList))
  }

  get BASKET_LIST() {
    return this.basketList
  }

}

export default new BasketStore()