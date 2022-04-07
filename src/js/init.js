// @ts-check

import i18next from 'i18next';
import ru from '../locales/index.js';
import app from './main.js';

export default () => {
  const i18nInstance = i18next.createInstance();
  i18nInstance
    .init({
      lng: 'ru',
      debug: false,
      resources: {
        ru,
      },
    })
    .then((t) => {
      console.log(t('feedback.success'));
      console.log(i18nInstance);
      app(t);
    });
};
