run_when_document_ready(() => {

  updateQuote();

  let button = document.querySelector("#new-quote-button");

  button.addEventListener("click", updateQuote);

});


// Launch an async request for a quote from the API, fall back to our offline quotes if it fails
function updateQuote() {

  let newQuote ="";
  let request = new XMLHttpRequest();

  request.open("GET", "http://api.icndb.com/jokes/random", true); // true is for async

  request.onload = () => {

    if (request.status >= 200 && request.status < 400) {

      newQuote = JSON.parse(request.response).value.joke;
      writeQuote(newQuote || newOfflineQuote());

    } else {

      writeQuote(newOfflineQuote());

    }

  };

  request.onerror = () => writeQuote(newOfflineQuote());

  request.send();

}


// Put the new quote text into the quote box and onto the tweet button
function writeQuote(quote) {

  const tweetUrlStem = "https://twitter.com/intent/tweet?hashtags=chuck&related=freecodecamp&text=";

  let quoteText = document.querySelector(".quote-text");

  quoteText.innerHTML = quote;

  let tweetButtonAnchor = document.querySelector("#tweet-button-anchor");

  tweetButtonAnchor.href = encodeURI(tweetUrlStem + quote);

}


// Return a random quote (used when online API lookup fails)
function newOfflineQuote() {

  const offlineQuotes = [
    "In the Words of Julius Caesar, &quot;Veni, Vidi, Vici, Chuck Norris&quot;. " +
      "Translation: I came, I saw, and I was roundhouse-kicked inthe face by Chuck Norris.",
    "A handicapped parking sign does not signify that this spot is for handicapped people. " +
      "It is actually in fact a warning, that the spot belongs to Chuck Norris " +
      "and that you will be handicapped if you park there.",
    "Chuck Norris drives an ice cream truck covered in human skulls."
  ];

  let i = Math.floor(Math.random() *offlineQuotes.length);

  return offlineQuotes[i];

}


// Equivalent of $(document).ready(fn)
function run_when_document_ready(fn) {

  if (document.readyState !== "loading"){

    fn();

  } else {

    document.addEventListener("DOMContentLoaded", fn);
  }

}
