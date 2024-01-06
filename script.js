const letterDiv = document.querySelector('.letter-div');
const resetButton = document.querySelector('.reset-btn');
const liveSpan = document.querySelector('.lives');
const wordDiv = document.querySelector('.word-div');
const notif = document.querySelector('.notif');
const notifContent = document.querySelector('.notif-content');
const notifSpan = document.querySelector('.notif-span');
const playAgain = document.querySelector('.notif-btn');

let letters;
let lives;

const words = ['test','hangman','code','javascript'];

const getRandomWord = list => {
  return list[Math.floor(Math.random() * words.length)];
};

let select_word;

const init = state => {
  wordDiv.innerHTML = '';
  if (state === 'start') {
    // putting all letters into html
    for (const i of 'abcdefghijklmnopqrstuvwxyz') {
      const html = `<button class="letter-btn">${i.toUpperCase()}</button>`;
      letterDiv.insertAdjacentHTML('beforeend', html);
    }
  } else if (state === 'reset') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      notif.classList.add('hidden');
    });
  }

  select_word = getRandomWord(words);
  lives = 3;

  // capturing letters div
  letters = document.querySelectorAll('.letter-btn');
  liveSpan.textContent = lives;

  // selected word with underscores
  for (let i = 0; i < select_word.length; i++) {
    const html = `<p class="word">_</p>`;
    wordDiv.insertAdjacentHTML('beforeend', html);
    //wordDiv.innerHTML = html;
  }
};

init('start');

// show notification
const showNotif = msg => {
  notif.classList.remove('hidden');
  notifSpan.textContent = select_word;
  notifContent.textContent = `You ${msg}`;
};

// decrease life
const decreaseLife = () => {
  lives--;
  liveSpan.textContent = lives;
  if (lives === 0) {
    showNotif('lost');
  }
};

// get matching indexes of clicked letter??
const getindexes = letter => {
  let indexes = [];
  [...select_word].forEach((value, i) => {
    if (value === letter) {
      const index = i;
      indexes.push(index);
    }
  });
  return indexes;
};

// check if word completed
const checkWord = () => {
  let value = true;
  for (let i = 0; i < wordDiv.children.length; i++) {
    if (wordDiv.children[i].textContent === '_') {
      value = false;
    }
  }
  return value;
};

// letters event listener function
const letterPress = function () {
  const letter = this.textContent.toLowerCase();

  if (select_word.includes(letter)) {
    const indexes_list = getindexes(letter);
    indexes_list.forEach((value, i) => {
      wordDiv.children[value].textContent = this.textContent;
    });
    if (checkWord()) showNotif('won');
  } else {
    decreaseLife();
  }
  this.classList.add('disabled'); // disable letter after clicked
};

letters.forEach(btn => {
  btn.addEventListener('click', letterPress);
});

resetButton.addEventListener('click', () => {
  init('reset');
});

playAgain.addEventListener('click', () => {
  init('reset');
}); 