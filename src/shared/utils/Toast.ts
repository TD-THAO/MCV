import Vue from 'vue';
import { FIREBASE_ERRORS, FIREBASE_ERRORS_MESSAGES } from '../enums/firebase-errors';

class Toast {
  success(message: string, options?: any) {
    return Vue.$toast.success(message, options)
  }

  error(message: string, options?: any) {
    return Vue.$toast.error(message, options)
  }

  handleError(error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
console.log(errorMessage);

    if (errorCode === FIREBASE_ERRORS.USER_NOT_FOUND) {
      return this.error(FIREBASE_ERRORS_MESSAGES.USER_NOT_FOUND);
    }

    if (errorCode === FIREBASE_ERRORS.EMAIL_ALREADY_EXISTS) {
      return this.error(FIREBASE_ERRORS_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    if (errorCode === FIREBASE_ERRORS.INVALID_EMAIL) {
      return this.error(FIREBASE_ERRORS_MESSAGES.INVALID_EMAIL);
    }

    return this.error(errorMessage);
  }
}

export default new Toast();
