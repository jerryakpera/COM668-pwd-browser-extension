const selectQuestion = document.getElementById('question-select');
const info1 = document.getElementById('info-1');

selectQuestion.addEventListener('change', (e) => {
  const question = e.target.value;

  if (question === 'parents') {
    info1.setAttribute('placeholder', 'Oslo, Norway');
  }

  if (question === 'football') {
    info1.setAttribute('placeholder', 'Manchester United');
  }

  if (question === 'pet') {
    info1.setAttribute('placeholder', 'Chivas');
  }
});
