import api from '../services/api';
import axios from 'axios';
import { STORE_ERROR, RUNTIME_ERROR, CANCEL, SUCCESS } from '../constants';

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

export const storeEvaluation = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/assessments/store.php', store);

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

export const storeDesigner = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/designers/store.php', store);
    
    const { data } = response;
    if(data.status === SUCCESS) {
      res(data.docs);
    } else {
      rej(data.docs);
    }
  });
}

export const storeEvaluator = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/evaluators/store.php', store);

    const { data } = response;
    if(data.status === SUCCESS) {
      res(data.docs);
    } else {
      rej(data.docs);
    }
  });
}

export const storeWebsite = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/websites/store.php', store);

    const { data } = response;
    if(data.status === SUCCESS) {
      res(data.docs);
    } else {
      rej(data.docs);
    }
  });
}

export const loadEvaluatorsByEvaluation = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/assessments/evaluators.php', store);

    const { data } = response;
    if(data.status === SUCCESS) {
      res(data.docs);
    } else {
      rej(data.docs);
    }
  });
}

export const loadEvaluatorsByEmail = (store) => {
  return new Promise(async (res, rej) => {
    const source = axios.CancelToken.source();

    try {
      const response = await api.post('/evaluators/search.php', { ...store, cancelToken: source.token });

      const { data } = response;
      if(data.status === SUCCESS) {
        res(data.docs);
      } else {
        rej(data.docs);
      }
    } catch(error) {
      if(axios.isCancel(error)) {
        rej({ id: CANCEL, detail: 'Canceled by token' });
      } else {
        rej({ id: RUNTIME_ERROR, detail: 'Error on load designers' });
      }
    }
  })
}

export const loadDesignersByEmail = (store) => {
  return new Promise(async (res, rej) => {
    const source = axios.CancelToken.source();

    try {
      const response = await api.post('/designers/search.php', { ...store, cancelToken: source.token });

      const { data } = response;
      if(data.status === SUCCESS) {
        res(data.docs);
      } else {
        rej(data.docs);
      }
    } catch(error) {
      if(axios.isCancel(error)) {
        rej({ id: CANCEL, detail: 'Canceled by token' });
      } else {
        rej({ id: RUNTIME_ERROR, detail: 'Error on load designers' });
      }
    }
  })
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
    const response = await api.post('/managers/websites.php', store);

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

export const loadEvaluatorsByProfile = (store) => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/profiles/evaluators.php', store);

    const { data } = response;
    if(data.status === SUCCESS) {
      res(data.docs);
    } else {
      rej(data.docs);
    }
  });
}

export const loadProfiles = () => {
  return new Promise(async (res, rej) => {
    const response = await api.post('/profiles/index.php');

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
