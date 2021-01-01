export enum FIREBASE_ERRORS {
  USER_NOT_FOUND = 'auth/user-not-found',
  EMAIL_ALREADY_EXISTS = 'auth/email-already-in-use',
  INVALID_EMAIL = 'auth/invalid-email',
}

export enum FIREBASE_ERRORS_MESSAGES {
  USER_NOT_FOUND = 'Email hoặc mật khẩu không đúng',
  EMAIL_ALREADY_EXISTS = 'Địa chỉ email đã được một tài khoản khác sử dụng',
  INVALID_EMAIL = 'Địa chỉ email sai định dạng',
}
