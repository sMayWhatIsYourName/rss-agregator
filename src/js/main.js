// @ts-check

import onChange from 'on-change';
import { displayStatus, toggleForm, render } from './View.js';
import '../scss/style.scss';
import parse from './parse.js';

const updatePosts = (state) => {
  // let count = 0;
  const parsed = state.current.map((feed, index) => {
    // console.log(feed);
    const currentFeed = state.feeds.at(-index - 1);
    const currentPosts = state.posts.filter(({ feedIndex }) => currentFeed.id === feedIndex);
    const postsTitles = currentPosts.map(({ title }) => title);
    // console.log(currentPosts);
    const { id: feedIndex } = currentFeed;
    const { id: startIndex } = currentPosts[0];
    return parse(feed, startIndex, feedIndex)
      .then(({ posts }) => posts
        // .map((post) => {
        //   const newPost = post;
        //   newPost.id += state.posts.length;
        //   return newPost;
        // })
        .filter(({ title }) => !postsTitles.includes(title)));
  });
  Promise.all(parsed)
    .then((arr) => [].concat(...arr))
    .then((arr) => {
      const newArr = arr.map((post, index) => {
        const newPost = post;
        newPost.id = index + state.posts.length;
        return newPost;
      });
      const newState = state;
      newState.posts = [].concat(...newArr, ...state.posts);
      console.log(state.posts);
      // state.posts.unshift(...newArr);
    });
  setTimeout(updatePosts, 5000, state);
};

export default (state, nextInstance, yup) => {
  const schema = yup.string().url();
  const watchedState = onChange(state, (path, value) => {
    if (path === 'status') {
      displayStatus(value, nextInstance(`feedback.${[value]}`));
    } else if (path === 'posts') {
      render(watchedState, nextInstance);
    }
  });
  setTimeout(updatePosts, 5000, watchedState);
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
        // console.log(err.message);
        watchedState.status = err.message;
      })
      .then(() => toggleForm(false));
  });
};
