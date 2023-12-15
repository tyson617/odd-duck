'use strict';

// *** Globals ***

let votingRounds = 25;
let productArray = [];
let previousArray = [];

// *** DOM Windows ***

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

// *** Canvas Element ***

let ctx = document.getElementById('my-chart');

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

// Function to check if two arrays are equal
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function renderImgs(){
  // Store the current set of indicies for comparison
  let currentSetIndices = [];

  // Generate new indicies until the current set is different from the previous set
  do {
    // Clear current set indicies
    currentSetIndices = [];

    // Generate new indicies
    while(currentSetIndices.length < 3){
      let randomIndex = randomImgGenerator();
      if(!currentSetIndices.includes(randomIndex) && !previousArray.includes(randomIndex)){
        currentSetIndices.push(randomIndex);
      }
    }
  } while (arraysAreEqual(currentSetIndices, previousArray));

  // Update the previousArray with the current set
  previousArray = currentSetIndices;

  // *** TODO Make sure each set of 3 don't have any similar pictures as the previous round ***

  // Display images and perform other actions as needed
  let imgOneRandom = currentSetIndices[0];
  let imgTwoRandom = currentSetIndices[1];
  let imgThreeRandom = currentSetIndices[2];

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

function renderChart(){
  let productNames = [];
  let productViews = [];
  let productVotes = [];

  for (let i = 0; i < productArray.length; i++){
    productNames.push(productArray[i].name);
    productViews.push(productArray[i].views);
    productVotes.push(productArray[i].votes);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews, // Array to hold views
        borderWidth: 3,
        backgroundColor: 'grey',
        borderColor: 'grey'
      },
      {
        labels: productViews,
        label: '# of Votes',
        data: productVotes, // Array to hold votes
        borderWidth: 3,
        backgroundColor: 'blue',
        borderColor: 'grey'
      }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          enabled: true,
          mode: 'nearest',
          backgroundColor: 'rgb(0, 0, 139)'
        },
        title: {
          display: true,
          text: 'Odd-Duck Product Voting Results'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          display: true,
          text: 'Votes'
        },
        x: {
          text: 'Product Name',
          display: true
        }
      }
    }
  };
  new Chart(ctx, chartObj);
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
    renderChart();
    let resultsList = document.getElementById('results-list');

    for(let i=0; i < productArray.length; i++){
      let productListItem = document.createElement('li');

      productListItem.textContent = `${productArray[i].name[0].toUpperCase() + productArray[i].name.slice(1)} - Votes: ${productArray[i].votes} & Views: ${productArray[i].views}`;

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
