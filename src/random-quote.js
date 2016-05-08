/*eslint-env jquery */

$(document).ready(() => {

  // Put the first quote in place
  updateQuote();

  // Add trigger for new quote onto new quote button
  $("#newQuote").on("click", updateQuote);



});


console.log("In js");

function updateQuote() {
  console.log("In updateQuote");
  $.getJSON("http://api.icndb.com/jokes/random", (json) => {
    console.log("Got", json);
    $(".quote").text(json.value.joke);
  });
}
