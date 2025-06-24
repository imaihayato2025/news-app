console.log("APIキーは:", apiKey);

function fetchNews(category = 'general') {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(`カテゴリ「${category}」のAPIレスポンス:`, data);
      const newsList = document.getElementById('newslist');
      newsList.innerHTML = '';

      // ★ localStorageに保存（重要）
      localStorage.setItem('articles', JSON.stringify(data.articles));

      if (!data.articles || data.articles.length === 0) {
        newsList.innerHTML = '記事が見つかりませんでした。';
        return;
      }

      data.articles.forEach((article, index) => { // index 必要
        const a = document.createElement('a');
        a.href = `news.html?index=${index}`; // ★ここでnews.htmlに飛ぶ

        const div = document.createElement('div');
        div.className = 'list_item';

        const img = document.createElement('img');
        img.className = 'list_image';
        img.src = article.urlToImage || 'https://placehold.jp/300x200.png';

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
    })
    .catch(err => {
      console.error('API取得失敗:', err);
      document.getElementById('newslist').innerHTML = 'ニュースの読み込みに失敗しました。';
    });
}