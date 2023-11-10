import { intercept, makeAutoObservable, toJS, configure } from "mobx";

configure({
  enforceActions: 'never'
})


class DeviceStore {
  constructor() {
    this._devices = []
    makeAutoObservable(this)
  }

  setDevices(devices) {
    return this._devices = devices
  }

  get devices() {
    return toJS(this._devices)
  }

}

export default new DeviceStore()