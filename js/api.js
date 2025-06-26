// APIキーをコンソールに出力（デバッグ用）
console.log("APIキーは:", apiKey);

// ニュース記事を取得する関数（カテゴリ指定。デフォルトは「general」）
function fetchNews(category = 'general') {
  // NewsAPIのURLを作成（カテゴリとAPIキーを含める）
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  // fetchでAPIにリクエストを送る
  fetch(url)
    .then(res => res.json()) // レスポンスをJSON形式に変換
    .then(data => {
      // APIレスポンスを確認（デバッグ用）
      console.log(`カテゴリ「${category}」のAPIレスポンス:`, data);

      // ニュースリストを表示するHTML要素を取得
      const newsList = document.getElementById('newslist');

      // 一度リストを空にして、新しい内容を描画できるようにする
      newsList.innerHTML = '';

      // ★ 記事データをlocalStorageに保存（news.htmlで使うため）
      localStorage.setItem('articles', JSON.stringify(data.articles));

      // 記事がない場合はメッセージを表示して処理を終了
      if (!data.articles || data.articles.length === 0) {
        newsList.innerHTML = '記事が見つかりませんでした。';
        return;
      }

      // 記事がある場合、1件ずつHTML要素を作って画面に表示
      data.articles.forEach((article, index) => { // index は詳細ページに渡すために必要
        // 詳細ページ（news.html）へのリンクを作成し、URLにindexを渡す
        const a = document.createElement('a');
        a.href = `news.html?index=${index}`; // ★クリック時にnews.htmlに遷移

        // 記事全体のコンテナdivを作成
        const div = document.createElement('div');
        div.className = 'list_item';

        // 記事の画像を作成（画像がないときは代替画像を表示）
        const img = document.createElement('img');
        img.className = 'list_image';
        img.src = article.urlToImage || 'https://placehold.jp/300x200.png';

        // タイトルなどを表示するテキスト用のdivを作成
        const textDiv = document.createElement('div');
        textDiv.className = 'list_text';

        // 記事タイトルを表示するh2要素を作成
        const h2 = document.createElement('h2');
        h2.className = 'news_title';
        h2.textContent = article.title;

        // タイトルをtextDivに追加
        textDiv.appendChild(h2);

        // 画像とtextDivを記事カード（div）に追加
        div.appendChild(img);
        div.appendChild(textDiv);

        // 記事カードをリンクで囲む
        a.appendChild(div);

        // 最終的にHTMLのニュースリストに追加
        newsList.appendChild(a);
      });
    })
    .catch(err => {
      // APIの取得に失敗したときのエラー処理
      console.error('API取得失敗:', err); // エラー内容をコンソールに表示
      // 画面にもエラーメッセージを表示
      document.getElementById('newslist').innerHTML = 'ニュースの読み込みに失敗しました。';
    });
}