// The qoute will be shown depending on the interenet connection.
// interent connection -> fetch quote from api.  [online]
// no internect connection -> fetch quote locally. [offline]

// DOM ELEMENTS.
const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('.quote__text');
const author = document.querySelector('.author');
const newQuoteBtn = document.querySelector('.btn-new-quote');
const twitterBtn = document.querySelector('.btn-twitter');
const loaderSpiner = document.querySelector('.loader');

let apiQuotes = [];

const displayNewQuote = (connection = 'offline') => {
  let newQuote = '';
  // Check the connection.
  if (connection === 'offline') {
    // Fetch quote locally.
    newQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log('LOCAL');
  } else {
    // Fetch quote from api.
    newQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log('API');
  }

  // Decrease the font if the quote text is large.
  if (newQuote.text.length >= 100) {
    quoteText.classList.add('quote__text-long');
  } else {
    quoteText.classList.remove('quote__text-long');
  }

  // Display the quote in UI.
  quoteText.textContent = newQuote.text || 'Unbale to fetch Quote!';
  author.textContent = newQuote.author || 'Unknown';
};

const fetchQuote = async () => {
  // For free APIs CORS issue.
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiURL = 'https://type.fit/api/quotes';
  try {
    // Loading.
    showLoadingSpiner();

    // Fetch.
    // const res = await fetch(proxyUrl + apiURL);
    const res = await fetch(apiURL);
    apiQuotes = await res.json();

    // Finish.
    hideLoadingSpiner();

    // Display UI.
    displayNewQuote('online');
  } catch (err) {
    // Display UI [local data]
    displayNewQuote('offline');
    console.log(err.message);
  }
};

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;

  // Display it in twitter.
  window.open(twitterUrl, '_black');
};

const showLoadingSpiner = () => {
  loaderSpiner.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoadingSpiner = () => {
  loaderSpiner.hidden = true;
  quoteContainer.hidden = false;
};

// On load.
fetchQuote();

// New quote event handler.
newQuoteBtn.addEventListener('click', (e) => {
  e.preventDefault();
  fetchQuote();
});

// Tweet event handler.
twitterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  tweetQuote();
});
