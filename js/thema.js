const themaBtn = document.querySelector('.top_btn_fab');
const body = document.querySelector('body');
const h1 = document.querySelector('h1');
const btn = document.querySelector('.btn');
const newsTitles = document.querySelectorAll('.news_title');
themaBtn.addEventListener('click' ,() => {

  body.classList.toggle('dark-bg');
  h1.classList.toggle('dark-color');
  btn.classList.toggle('dark-btn');
  newsTitles.classList.toggle('dark-bg');

});
