// 例：apiKeyはconfig.jsなどでセットされている前提

function fetchNews(category = 'general') {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(`カテゴリ「${category}」のAPIレスポンス:`, data);
      localStorage.setItem(`articles_${category}`, JSON.stringify(data.articles));
      return { data, category };
    })
    .catch(err => {
      console.error('API取得失敗:', err);
      return { data: { articles: [] }, category };
    });
}

function renderNews(data, category) {
  const newsList = document.getElementById('newslist');
  newsList.innerHTML = '';

  if (!data.articles || data.articles.length === 0) {
    newsList.innerHTML = '記事が見つかりませんでした。';
    return;
  }

  data.articles.forEach((article, index) => {
    const a = document.createElement('a');
    a.href = `news.html?category=${category}&index=${index}`;

    const div = document.createElement('div');
    div.className = 'list_item';

    const img = document.createElement('img');
    img.className = 'list_image';
    img.src = article.urlToImage || 'https://placehold.jp/D9D9D9/ffffff/200x150.png?text=No%20image%0A';

    const textDiv = document.createElement('div');
    textDiv.className = 'list_text';

    const h2 = document.createElement('h2');
    h2.className = 'news_title';
    h2.textContent = article.title;

    textDiv.appendChild(h2);
    div.appendChild(img);
    div.appendChild(textDiv);
    a.appendChild(div);
    newsList.appendChild(a);
  });
}

// 初期表示
fetchNews('general').then(({ data, category }) => {
  renderNews(data, category);
});

// カテゴリクリックイベント登録
const categoryItems = document.querySelectorAll('#category-list li');
categoryItems.forEach(li => {
  li.addEventListener('click', () => {
    const category = li.getAttribute('data-category');
    fetchNews(category).then(({ data, category }) => {
      renderNews(data, category);
    });

    // activeクラスの切り替え
    categoryItems.forEach(i => i.classList.remove('active'));
    li.classList.add('active');
  });
});