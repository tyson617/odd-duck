'use strict';

// *** Globals ***

let votingRounds = 25;
let productArray = [];

// *** DOM Windows ***

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

// *** Constructor Functions ***

function Product(name, imageExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0;
}

// *** Helper Functions / Utilities ***

function randomImgGenerator() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImgs(){
  let imgOneRandom = randomImgGenerator();
  let imgTwoRandom = randomImgGenerator();
  let imgThreeRandom = randomImgGenerator();

  while (imgOneRandom === imgTwoRandom || imgTwoRandom === imgThreeRandom || imgTwoRandom === imgThreeRandom) {
    imgTwoRandom = randomImgGenerator();
    imgThreeRandom = randomImgGenerator();
    // Make sure they're unique
  }

  imgOne.src = productArray[imgOneRandom].img;
  imgOne.title = productArray[imgOneRandom].name;
  // Add hover title and use for counting clicks
  imgTwo.src = productArray[imgTwoRandom].img;
  imgTwo.title = productArray[imgTwoRandom].name;
  imgThree.src = productArray[imgThreeRandom].img;
  imgThree.title = productArray[imgThreeRandom].name;

  // Increase product views
  productArray[imgOneRandom].views++;
  productArray[imgTwoRandom].views++;
  productArray[imgThreeRandom].views++;

}

// *** Event Handlers ***

function handleImgClick(event) {
  // Identify the image that was clicked
  let imgClicked = event.target.title;
  // Inrease the vote on that image
  for(let i = 0; i < productArray.length; i++){
    if(imgClicked === productArray[i].name){
      productArray[i].votes++;
      // Decrement the voting round
      votingRounds--;
      // Generate new images
      renderImgs();
    }
  }

  // Remove ability to click once voting is done
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleImgClick);
  }
}

function handleShowResults(){
  if (votingRounds === 0){
    for(let i=0; i < productArray.length; i++){
      let productListItem = document.createElement('li');

      productListItem.textContent = `${productArray[i].name} - Votes: ${productArray[i].votes} & Views: ${productArray[i].views}`;

      resultsList.appendChild(productListItem);
    }
    // Disable show results to prevent li duplicates
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

// **** Excecutable Code ****

let bag = new Product('bag', 'jpg');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');


productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen,petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click',handleShowResults);
