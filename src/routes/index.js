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

export const storeQuestionnaire = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/questionnaires/store.php', store);

    const { data } = response;
    if(data.status === SUCCESS) {
      res(data.docs);
    } else {
      rej(data.docs);
    }
  });
}

export const loadQuestionnairesByManager = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/managers/questionnaires.php', store);

    const { data } = response;
    if(data.status === SUCCESS) {
      res(data.docs);
    } else {
      rej(data.docs);
    }
  });
}

export const loadEvaluationsByManager = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/managers/assessments.php', store);

    const { data } = response;
    if(data.status === SUCCESS) {
      res(data.docs);
    } else {
      rej(data.docs);
    }
  });
}

export const loadWebsitesByManager = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/websites/index.php', store);

    const { data } = response;
    if(data.status === SUCCESS) {
      res(data.docs);
    } else {
      rej(data.docs);
    }
  });
}

export const loadTasksByWebsite = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/websites/tasks.php', store);

    const { data } = response;
    if(data.status === SUCCESS) {
      res(data.docs);
    } else {
      rej(data.docs);
    }
  });
}

export const loadQuestionsByQuestionnaire = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/questionnaires/questions.php', store);

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
