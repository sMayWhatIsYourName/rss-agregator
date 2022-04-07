// @ts-check

import onChange from 'on-change';
import * as yup from 'yup';
import displayStatus from './View.js';
import '../scss/style.scss';

export default (nextInstance) => {
  const state = {
    currentUrl: '',
    status: 'pending',
    streamData: [],
  };

  yup.setLocale({
    string: {
      url: () => 'invalidUrl',
    },
  });
  const schema = yup.string().url();

  const watchedState = onChange(state, (path, value) => {
    if (path === 'status') {
      console.log(value);
      displayStatus(value, nextInstance(`feedback.${[value]}`));
    }
  });
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { value } = form.elements.input;
    if (value === watchedState.currentUrl) {
      watchedState.status = 'alreadyExist';
      return;
    }
    schema.validate(value)
      .then((data) => {
        watchedState.status = 'success';
        watchedState.currentUrl = data;
      })
      .catch((err) => {
        watchedState.status = 'invalid';
        console.log(err.errors[0]);
      });
  });
};
