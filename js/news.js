document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');

  if (!query) {
    document.querySelector('.news_content_text').textContent = '検索キーワードがありません。';
    return;
  }

  // config.jsで定義したapiKeyをそのまま使用
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&apiKey=${apiKey}`;
  console.log('🔍 APIリクエストURL:', url);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log('📥 取得データ:', data);

      if (!data.articles || data.articles.length === 0) {
        document.querySelector('.news_content_text').textContent = '記事が見つかりませんでした。';
        return;
      }

      const decodedQuery = decodeURIComponent(query);
      const article =
        data.articles.find(a => a.title === decodedQuery) ||
        data.articles.find(a => a.title && a.title.includes(decodedQuery)) ||
        data.articles[0];

      const img = document.querySelector('.news_content img');
      const title = document.querySelector('.news_title');
      const content = document.querySelector('.news_content_text');

      img.src = article.urlToImage ||  'https://placehold.jp/d9d9d9/ffffff/300x200.png?text=No%20Image';
      title.textContent = article.title || 'タイトルなし';
      content.textContent = (article.content || '') + '\n\n' + (article.description || '') || '記事内容がありません。';

      const link = document.createElement('a');
      link.href = article.url;
      link.textContent = '▶ 記事元はこちら';
      link.target = '_blank';
      content.appendChild(document.createElement('br'));
      content.appendChild(link);
    })
    .catch(error => {
      console.error('APIエラー:', error);
      document.querySelector('.news_content_text').textContent = '記事の読み込み中にエラーが発生しました。';
    });
});