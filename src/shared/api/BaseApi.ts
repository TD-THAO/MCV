import firebase from 'firebase';

abstract class BaseApi {
  constructor() {
    //
  }

  getOne(refName: string, id: string, data?: any) {
    const ref = firebase.database().ref(`${refName}/${id}`);
    return ref.once('value').then((snapshot) => {
      return snapshot.val();
    });
  }

  post(refName: string, id: string, data?: any) {
    const ref = firebase.database().ref(`${refName}/${id}`);
    return ref.set(data);
  }

  postWithAutoKey(refName: string, data?: any) {
    const ref = firebase.database().ref(refName);
    return ref.push().set(data);
  }
}

export default BaseApi;
