function copyInto() {
  // Copy email into clipboard
  navigator.clipboard.writeText("cassius_hall@brown.edu");

  // Alert the copied text
  const emailText = document.getElementById("email");
  emailText.innerHTML = "copied!";
  setTimeout(() => {
    emailText.innerHTML = "email";
  }, 1000);
}

const emailText = document.getElementById("email");
if (emailText) {
  emailText.addEventListener("click", function () {
    copyInto();
  });
} else {
  console.log("email functionality not working");
}
