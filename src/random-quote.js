/*eslint-env jquery */

$(document).ready(() => {

  updateQuote();

  $("#new-quote-button").on("click", updateQuote);

});

function updateQuote() {

  let newQuote ="";

  $.getJSON("http://api.icndb.com/jokes/random", (json) => {

    newQuote = json.value.joke;
    writeQuote(newQuote || newOfflineQuote());

  }).fail(() => {

    writeQuote(newOfflineQuote());

  });

}


function writeQuote(quote) {

  $(".quote-text").html(quote);
  $("#tweet-button-anchor").prop("href", encodeURI(tweetUrlStem + quote));

}


function newOfflineQuote() {

  let i = Math.floor(Math.random() *offlineQuotes.length);

  return offlineQuotes[i];

}


const tweetUrlStem = "https://twitter.com/intent/tweet?hashtags=chuck&related=freecodecamp&text=";


const offlineQuotes = [
  "In the Words of Julius Caesar, &quot;Veni, Vidi, Vici, Chuck Norris&quot;. " +
    "Translation: I came, I saw, and I was roundhouse-kicked inthe face by Chuck Norris.",
  "A handicapped parking sign does not signify that this spot is for handicapped people. " +
    "It is actually in fact a warning, that the spot belongs to Chuck Norris " +
    "and that you will be handicapped if you park there.",
  "Chuck Norris drives an ice cream truck covered in human skulls."
];
