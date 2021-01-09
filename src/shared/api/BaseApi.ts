import firebase from 'firebase';
import Toast from '@/shared/utils/Toast';

abstract class BaseApi {
  constructor() {
    //
  }

  get(refName: string, data?: any) {
    const ref = firebase.database().ref(`${refName}`);
    const array: any[] = [];
    return new Promise((resolve, reject) => {
      const onError = (error: any) => reject(error);
      const onData = (snapshot: any) => {
        if (snapshot.val()) {
          const keyArray = Object.keys(snapshot.val());
          const valArray = snapshot.val();
          keyArray.map((key: string) => {
            array.push({
              id: key,
              ...valArray[key],
            });
          });
        }
        return resolve(array);
      };

      ref.on('value', onData, onError);
    });
  }

  getOne(refName: string, id: any, data?: any) {
    const ref = firebase.database().ref(`${refName}/${id}`);
    return ref.once('value').then((snapshot) => {
      return snapshot.val();
    });
  }

  post(refName: string, id: any, data?: any) {
    const ref = firebase.database().ref(`${refName}/${id}`);
    return ref.set(data);
  }

  postWithAutoKey(refName: string, data?: any) {
    const ref = firebase.database().ref(refName);
    return ref.push().set(data);
  }

  delete(refName: string, id: any, data?: any) {
    const ref = firebase.database().ref(`${refName}/${id}`);
    return ref.set(null);
  }
}

export default BaseApi;
