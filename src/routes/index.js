import api from '../services/api';
import { STORE_ERROR, SUCCESS } from '../constants';

export const storeManager = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/managers/store.php', store);

    const { data } = response;
    if(data.status === SUCCESS) {
      res(data.docs);
    } else {
      rej(data.docs);
    }
  });
}

export const loginManager = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/managers/login.php', store);

    const { data } = response;
    if(data.status === SUCCESS) {
      res(data.docs);
    } else {
      rej(data.docs);
    }
  });
}

export const duplicateQuestionnaire = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/questionnaires/duplicate.php', store);

    const { data } = response;
    if(data.status === SUCCESS) {
      res(data.docs);
    } else {
      rej({ id: STORE_ERROR, detail: 'Error on duplicate questionnaire'});
    }
  });
}
