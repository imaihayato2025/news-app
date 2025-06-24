const snsBtn = document.querySelector('.sns_btn');
const btn01 = document.querySelector('.snsbtn01');
const btn02 = document.querySelector('.snsbtn02');
const btn03 = document.querySelector('.snsbtn03');
const btn04 = document.querySelector('.snsbtn04');

snsBtn.addEventListener('click', () => {
  if (btn01.style.display === 'block') {
    btn01.style.display = 'none';
  } else {
    btn01.style.display = 'block';
  }
});