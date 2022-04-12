// @ts-check

import onChange from 'on-change';
import { displayStatus, toggleForm, render } from './View.js';
import '../scss/style.scss';
import parse from './parse.js';

export default (state, nextInstance, yup) => {
  const schema = yup.string().url();

  const watchedState = onChange(state, (path, value) => {
    if (path === 'status') {
      displayStatus(value, nextInstance(`feedback.${[value]}`));
    } else if (path === 'posts') {
      render(watchedState, nextInstance);
    }
  });
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    toggleForm(true);
    const { value } = form.elements['url-input'];
    if (watchedState.current.includes(value)) {
      watchedState.status = 'alreadyExist';
      toggleForm(false);
      return;
    }
    schema.validate(value)
      .then((data) => {
        const postIndex = watchedState.posts.length;
        const feedIndex = watchedState.feeds.length;
        return parse(data, postIndex, feedIndex);
      })
      .then((data) => {
        watchedState.status = 'success';
        watchedState.current.push(value);
        const { feed, posts } = data;
        watchedState.feeds.unshift(feed);
        watchedState.posts.unshift(...posts);
        // console.log(watchedState.posts);
      })
      .catch((err) => {
        console.log(err.message);
        watchedState.status = err.message;
      })
      .then(() => toggleForm(false));
  });
};
