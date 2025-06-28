// ==============================
// テーマ（ダーク or ライト）を適用する関数
// ==============================
function applyTheme(isDark) {
  // ▶ テーマ切り替えボタン（右下のボタン）
  const themaBtn = document.querySelector('.top_btn_fab');

  // ▶ ページ全体の背景切り替えに使う body 要素
  const body = document.body;

  // ▶ タイトル（h1） → 文字色を切り替える
  const h1 = document.querySelector('h1');

  // ▶ 「戻る」などのボタン → 見た目を切り替える
  const btn = document.querySelector('.btn');

  // ▶ フッター（下部メニュー） → 背景色を変更
  const menu = document.querySelector('footer');  

  // ▶ 記事の本文部分 → 文字色を切り替える
  const text = document.querySelector('.news_content_text');

  // ▶ ニュース一覧などのタイトル（複数ある場合）
  const newsTitles = document.querySelectorAll('.news_title'); 

  // ======= ダークテーマの適用 =========
  if (isDark) {
    // ▶ それぞれの要素に「ダーク用のクラス」を追加
    // クラスはCSSで見た目（背景色・文字色など）を切り替える役目

    themaBtn?.classList.add('dark-btn-fab');   // ボタンの背景など
    body.classList.add('dark-bg');             // 全体の背景
    h1?.classList.add('dark-color');           // タイトルの文字色
    btn?.classList.add('dark-btn');            // ボタンの見た目
    menu?.classList.add('dark-footer');        // フッターの背景
    text?.classList.add('dark-color');         // 本文の文字色

    // ▶ 複数のニュースタイトルもループで全部切り替える
    newsTitles.forEach(el => el.classList.add('dark-color'));

  // ======= ライトテーマに戻す =========
  } else {
    // ▶ それぞれの「ダーク用クラス」を削除して、元のライトテーマに戻す
    themaBtn?.classList.remove('dark-btn-fab');
    body.classList.remove('dark-bg');
    h1?.classList.remove('dark-color');
    btn?.classList.remove('dark-btn');
    menu?.classList.remove('dark-footer');
    text?.classList.remove('dark-color');

    // ▶ ニュースタイトルも全部クラス削除
    newsTitles.forEach(el => el.classList.remove('dark-color'));
  }
}

// ==============================
// ページ読み込み時の処理
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  // ▶ localStorage から前回保存されたテーマを取得
  // 値は 'dark' か 'light' のどちらかが入っている
  const currentTheme = localStorage.getItem('theme');

  // ▶ 'dark' だったらダークテーマを適用（true）
  applyTheme(currentTheme === 'dark');

  // ▶ テーマ切り替えボタンを取得
  const themaBtn = document.querySelector('.top_btn_fab');

  // ▶ ボタンが存在していれば（null じゃなければ）
  if (themaBtn) {
    // ▶ ボタンクリックでテーマを切り替える処理を設定
    themaBtn.addEventListener('click', () => {
      // ▶ 現在のテーマがダークかどうかを確認（bodyにクラスがあるかどうか）
      const isDark = document.body.classList.contains('dark-bg');

      // ▶ テーマを反転して適用（true → false / false → true）
      applyTheme(!isDark);

      // ▶ 新しいテーマ状態を localStorage に保存（'dark' または 'light'）
      localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    });
  }
});
