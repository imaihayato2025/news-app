document.addEventListener('DOMContentLoaded', () => {
  const categoryList = document.querySelectorAll('#category-list li');

  categoryList.forEach(item => {
    item.addEventListener('click', () => {
      const category = item.getAttribute('data-category');
      fetchNews(category); // api.jsのfetchNewsを呼び出し
    });
  });
});