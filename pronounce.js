function hoverPronounce(text) {
  // Copy email into clipboard
  navigator.clipboard.writeText("cassius_hall@brown.edu");

  // Alert the copied text
  const emailText = document.getElementById("email");
  emailText.innerHTML = "copied to clipboard!";
  setTimeout(() => {
    emailText.innerHTML = "cassius_hall@brown.edu";
  }, 1000);
}

const pronounceTexts = document.getElementsByClassName("pronounce");
for (x of pronounceTexts) {
  x.addEventListener("hover", function () {
    hoverPronounce(x.innerHTML);
  });
}
