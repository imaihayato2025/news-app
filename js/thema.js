function applyTheme(isDark) {
  const themaBtn = document.querySelector('.top_btn_fab');
  const body = document.body;
  const h1 = document.querySelector('h1');
  const btn = document.querySelector('.btn');
  const menu = document.querySelector('footer');  
  const text = document.querySelector('.news_content_text');
  const newsTitles = document.querySelectorAll('.news_title'); // ← 関数内に移動

  if (isDark) {
    themaBtn?.classList.add('dark-btn-fab');
    body.classList.add('dark-bg');
    h1?.classList.add('dark-color');
    btn?.classList.add('dark-btn');
    menu?.classList.add('dark-footer');
    text?.classList.add('dark-color');

    newsTitles.forEach(el => el.classList.add('dark-color')); // ← 確実に反映
  } else {
    themaBtn?.classList.remove('dark-btn-fab');
    body.classList.remove('dark-bg');
    h1?.classList.remove('dark-color');
    btn?.classList.remove('dark-btn');
    menu?.classList.remove('dark-footer');
    text?.classList.remove('dark-color');

    newsTitles.forEach(el => el.classList.remove('dark-color'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = localStorage.getItem('theme');
  applyTheme(currentTheme === 'dark');

  const themaBtn = document.querySelector('.top_btn_fab');
  if (themaBtn) {
    themaBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-bg');
      applyTheme(!isDark);
      localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    });
  }
});