const statusList = [
  "<span>happy&nbsp;</span><span>to&nbsp;</span><span>see&nbsp;</span><span>you!</span>",
  "<span>a&nbsp;</span><span>designer</span><span></span><span></span>",
  "<span>a&nbsp;</span><span>product&nbsp;</span><span>manager</span><span></span>",
  "<span>a&nbsp;</span><span>linguist</span><span></span><span></span>",
  "<span>a&nbsp;</span><span>tinkerer</span><span></span><span></span>",
  "<span>a&nbsp;</span><span>game&nbsp;</span><span>designer</span><span></span>"
];

let index = 0;

function statusUpdate() {
  const pfStatus = document.getElementById("portfolio-status");
  index = index + 1 >= statusList.length ? 0 : index + 1;
  pfStatus.innerHTML = statusList[index];
}

function statusUpdateKey(e) {
  if (e.key == "Enter") {
    const pfStatus = document.getElementById("portfolio-status");
    index = index + 1 >= statusList.length ? 0 : index + 1;
    pfStatus.innerHTML = statusList[index];
  }

}

const pfStatus = document.getElementById("portfolio-status");
if (pfStatus) {
  pfStatus.addEventListener("click", function () {
    statusUpdate();
  });
  pfStatus.addEventListener("keypress", function (e) {
    statusUpdateKey(e);
  });
} else {
  console.log("title didnt work...");
}
