//TO DO in order
// once done we will circle back to:
// deletion single card
// editing
// filtered mode i.e. show all hard cards
// Show difficulty in the buttons

//remember to add:
// flip animation
// feedback messages to let users know action was successful. like deleting, editing, addition

// VARIABLES //
let card_deck = JSON.parse(localStorage.getItem('flashcardDeck')) || []; //get saved deck or a null array
let currentCardIndex = 0;
const displayInfoFront = document.querySelector('#cardFront');
const displayInfoBack = document.querySelector('#cardBack');
const createFront = document.getElementById('createFront');
const createBack = document.getElementById('createBack');
const successMessage = document.getElementById('successMessage');
const btnEasy = document.getElementById('btnEasy');
const btnMedium = document.getElementById('btnMedium');
const btnHard = document.getElementById('btnHard');

// ON LOAD //
window.onload = function () {
  const savedDeck = localStorage.getItem('flashcardDeck');
  if (savedDeck) {
    card_deck = JSON.parse(savedDeck);
    card_deck = weightedShuffle(card_deck);
    displayCard();
  }
};

// lOCAL STORAGE //
function updateLocalStorage() {
  localStorage.setItem('flashcardDeck', JSON.stringify(card_deck));
}

function clearLocalStorage() {
  localStorage.removeItem('flashcardDeck');
  card_deck.length = 0;
  displayCard();
}

// SHUFFLE //
function weightedShuffle(deck) {
  const weightedDeck = [];

  // Creating weights //
  deck.forEach((card) => {
    let weight = 1;
    if (card.infoDifficulty === 'medium') {
      weight = 2;
    } else if (card.infoDifficulty === 'hard') {
      weight = 3;
    }

    // Push the card to the deck to match weight //
    for (let i = 0; i < weight; i++) {
      weightedDeck.push(card);
    }
  });

  // Shuffle //
  for (let i = weightedDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [weightedDeck[i], weightedDeck[j]] = [weightedDeck[j], weightedDeck[i]];
  }

  return weightedDeck;
}

// DISPLAY CARD //
function displayCard() {
  if (card_deck.length === 0) {
    displayInfoFront.innerHTML = ' ';
    displayInfoBack.innerHTML = ' ';
    return;
  }

  const currentCard = card_deck[currentCardIndex];
  displayInfoFront.innerHTML = currentCard.infoFront;
  displayInfoBack.innerHTML = currentCard.infoBack;

  checkDifficulty(currentCard);
}

// CREATE A CARD //
function createCard() {
  let cardInfo = {
    infoFront: createFront.value,
    infoBack: createBack.value,
    infoDifficulty: '',
  };
  card_deck.push(cardInfo); //adds to the array
  updateLocalStorage(); //updates local storage

  // clear textareas //
  createFront.value = '';
  createBack.value = '';

  // success message //
  successMessage.classList.add('d-block');
  successMessage.classList.remove('d-none');

  // HIDE SUCCESS //
  setTimeout(() => {
    successMessage.classList.add('d-none');
    successMessage.classList.remove('d-block');
  }, 2000);
}

// HIDE SUCCESS //
function handleTyping() {
  if (successMessage.classList.contains('d-block')) {
    successMessage.classList.add('d-none');
    successMessage.classList.remove('d-block');
  }
}
createFront.addEventListener('input', handleTyping);
createBack.addEventListener('input', handleTyping);

// DIFFICULTY //
function checkDifficulty(card) {
  // RESET BUTTONS //
  btnEasy.classList.remove('active');
  btnMedium.classList.remove('active');
  btnHard.classList.remove('active');

  // SET BUTTON //
  if (card.infoDifficulty === 'easy') {
    btnEasy.classList.add('active');
  } else if (card.infoDifficulty === 'medium') {
    btnMedium.classList.add('active');
  } else if (card.infoDifficulty === 'hard') {
    btnHard.classList.add('active');
  }
}

function setDifficulty(difficulty) {
  if (card_deck.length === 0) return;
  card_deck[currentCardIndex].infoDifficulty = difficulty;
  updateLocalStorage();
  displayCard();
  checkDifficulty(card_deck[currentCardIndex]);
}

// CHANGE CARD //
function previousCard(event) {
  event.stopPropagation();
  if (currentCardIndex === 0) {
    currentCardIndex = card_deck.length - 1;
  } else {
    currentCardIndex -= 1;
  }
  displayCard();
  frontVisible();
}

function nextCard(event) {
  event.stopPropagation();
  if (currentCardIndex === card_deck.length - 1) {
    currentCardIndex = 0;
  } else {
    currentCardIndex += 1;
  }
  displayCard();
  frontVisible();
}

// FLIP THE CARD //
function flipCard() {
  if (cardFront.classList.contains('d-block')) {
    backVisibile();
  } else {
    frontVisible();
  }
}

function backVisibile() {
  cardFront.classList.remove('d-block');
  cardFront.classList.add('d-none');
  cardBack.classList.remove('d-none');
  cardBack.classList.add('d-block');
}

function frontVisible() {
  cardBack.classList.remove('d-block');
  cardBack.classList.add('d-none');
  cardFront.classList.remove('d-none');
  cardFront.classList.add('d-block');
}
