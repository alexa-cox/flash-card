// VARIABLES //
let card_deck = JSON.parse(localStorage.getItem('flashcardDeck')) || []; //get saved deck or a null array
let currentCardIndex = 0;
const displayInfoFront = document.querySelector('#cardFront');
const displayInfoBack = document.querySelector('#cardBack');

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
  createFront.value = ' '; //clears the textareas for additional input
  createBack.value = ' ';
  displayCard(); //calls the display card function to display the newly added card
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
