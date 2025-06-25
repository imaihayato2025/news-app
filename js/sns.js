const shareBtn = document.querySelector('.share');
const snsBtns = document.querySelectorAll('.all_sns'); // Allのまま

shareBtn.addEventListener('click', () => {
  snsBtns.forEach(btn => {
    btn.classList.toggle('active');
  });
});