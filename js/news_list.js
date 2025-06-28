// ニュースAPIからデータ取得し、localStorage に保存
function fetchNews(category = 'general') {
  const storageKey = `articles_${category}`;
  const cached = localStorage.getItem(storageKey);

  if (cached) {
    console.log(`✅ localStorageから取得: ${category}`);
    const articles = JSON.parse(cached);
    return Promise.resolve({ data: { articles }, category });
  }
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(`🌐 API取得: ${category}`, data);
      localStorage.setItem(storageKey, JSON.stringify(data.articles));
      return { data, category };
    })
    .catch(err => {
      console.error('API取得失敗:', err);
      return { data: { articles: [] }, category };
    });
}

// 一覧に記事を表示（詳細ページへは q=タイトル でリンク）
function renderNews(data, category) {
  const newsList = document.getElementById('newslist');
  newsList.innerHTML = '';

  if (!data.articles || data.articles.length === 0) {
    newsList.innerHTML = '記事が見つかりませんでした。';
    return;
  }

  data.articles.forEach(article => {
    const a = document.createElement('a');
    a.href = `news.html?q=${encodeURIComponent(article.title)}`;

    const div = document.createElement('div');
    div.className = 'list_item';

    const img = document.createElement('img');
    img.className = 'list_image';
    img.src = article.urlToImage || 'https://placehold.jp/d9d9d9/ffffff/300x200.png?text=No%20Image';

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

// 初期表示（デフォルトカテゴリ: general）
fetchNews('general').then(({ data, category }) => {
  renderNews(data, category);
});

// カテゴリクリック処理
const categoryItems = document.querySelectorAll('#category-list li');
categoryItems.forEach(li => {
  li.addEventListener('click', () => {
    const category = li.getAttribute('data-category');
    fetchNews(category).then(({ data, category }) => {
      renderNews(data, category);
    });

    categoryItems.forEach(i => i.classList.remove('active'));
    li.classList.add('active');
  });
});