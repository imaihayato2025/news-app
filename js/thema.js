document.addEventListener('DOMContentLoaded', () => {
  const themaBtn = document.querySelector('.top_btn_fab');
  const body = document.querySelector('body');
  const h1 = document.querySelector('h1');
  const btn = document.querySelector('.btn');
  const newsTitles = document.querySelectorAll('.news_title');

  if (themaBtn) {
    themaBtn.addEventListener('click', () => {
      themaBtn.classList.toggle('dark-bg');
      body.classList.toggle('dark-bg');
      h1.classList.toggle('dark-color');
      btn.classList.toggle('dark-btn');
      newsTitles.forEach(el => el.classList.toggle('dark-bg'));
    });
  }

  const categoryItems = document.querySelectorAll('#category-list li');

  categoryItems.forEach(li => {
    li.addEventListener('click', () => {
      categoryItems.forEach(item => item.classList.remove('active'));
      li.classList.add('active');
      console.log('clicked:', li.textContent);
    });
  });
});