export default (status, text) => {
  const input = document.querySelector('input');
  const feedback = document.querySelector('.feedback');
  const addClass = status === 'success' ? 'text-success' : 'text-danger';
  const removeClass = status === 'success' ? 'text-danger' : 'text-success';
  if (status === 'success') {
    input.classList.remove('is-invalid');
  } else {
    input.classList.add('is-invalid');
  }
  feedback.classList.add(addClass);
  feedback.classList.remove(removeClass);
  feedback.textContent = text;
};
