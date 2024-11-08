// VARIABLES //
let card_deck = JSON.parse(localStorage.getItem('flashcardDeck')) || []; //get saved deck or a null array
let currentCardIndex = 0;
const displayInfoFront = document.querySelector('#cardFront');
const displayInfoBack = document.querySelector('#cardBack');

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
