const categoryItems = document.querySelectorAll('#category-list li');

categoryItems.forEach(li => {
  li.addEventListener('click', () => {
    const category = li.getAttribute('data-category');
    fetchNews(category).then(data => {
      localStorage.setItem('articles', JSON.stringify(data.articles));

      const newsList = document.getElementById('newslist');
      newsList.innerHTML = '';

      data.articles.forEach((article, index) => {
        const a = document.createElement('a');
        a.href = `news.html?index=${index}`;
        const item = document.createElement('div');
        item.classList.add('list_item');

        const img = document.createElement('img');
        img.src = article.urlToImage || 'https://placehold.jp/300x200.png';
        img.classList.add('list_image');

        const text = document.createElement('div');
        text.classList.add('list_text');
        text.innerHTML = `<h2 class="news_title">${article.title}</h2>`;

        item.appendChild(img);
        item.appendChild(text);
        a.appendChild(item);
        newsList.appendChild(a);
      });

      // activeクラス切り替え
      categoryItems.forEach(i => i.classList.remove('active'));
      li.classList.add('active');
    });
  });
});

// ページ読み込み時に初期表示
fetchNews('general').then(data => {
  localStorage.setItem('articles', JSON.stringify(data.articles));
  // 同じように表示処理をここに書くか関数化して呼ぶ
});