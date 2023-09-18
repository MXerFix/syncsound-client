import { makeAutoObservable } from "mobx";

const ERROR_TIMEOUT = 5000;

class ErrorStore {
  constructor() {
    this.errorType = "";
    this.errorMessage = "";
    makeAutoObservable(this);
  }

  setError(type, message) {
    this.errorMessage = message;
    this.errorType = type;
    setTimeout(() => {
      this.errorMessage = "";
      this.errorType = "";
    }, ERROR_TIMEOUT);
  }
}

export default new ErrorStore();
