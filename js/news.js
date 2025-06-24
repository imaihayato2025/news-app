document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const index = params.get('index');

  const articles = JSON.parse(localStorage.getItem('articles'));
  console.log('localStorage articles:', articles);

  if (articles && articles[index]) {
    const article = articles[index];

    const img = document.querySelector('.news_content img');
    const title = document.querySelector('.news_title');
    const content = document.querySelector('.news_content_text');

    img.src = article.urlToImage || 'https://placehold.jp/300x200.png';
    title.textContent = article.title || 'タイトルなし';
    content.textContent = article.description || '記事内容がありません。';

    // 記事元リンクを追加
    const link = document.createElement('a');
    link.href = article.url;
    link.textContent = '▶ 記事元はこちら';
    link.target = '_blank';
    content.appendChild(document.createElement('br'));
    content.appendChild(link);
  } else {
    const content = document.querySelector('.news_content_text');
    content.textContent = '記事が見つかりませんでした。';
  }
});