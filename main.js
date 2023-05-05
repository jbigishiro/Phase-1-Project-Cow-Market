//create an eventListenerr to submit the seller form
document.getElementById("form1").addEventListener("submit", submitSellerForm);
// function to submit a form
function submitSellerForm(e) {
  e.preventDefault();
  let cowObj = {
    name: e.target.name.value,
    phoneNumber: e.target.phoneNumber.value,
    address: e.target.address.value,
    imageUrl: e.target.imageUrl.value,
    price: e.target.price.value,
    weight: e.target.weight.value,
  };
  sellerPage(cowObj);
  addCow(cowObj);
}
// function to create the listing page
function sellerPage(seller) {
  let card = document.createElement("div");
  card.id = "card";
  card.style.textAlign = "left";
  let cow = document.createElement("div");
  cow.id = "cow";
  let sellerInfo = document.createElement("div");
  sellerInfo.id = "sellerInfo";
  cow.innerHTML = `<img src=${seller.imageUrl} width="400" height="300">`;
  sellerInfo.innerHTML = `
     <div class="content">
      <p> Seller Name: ${seller.name}</p>
      <p>Phone Number: ${seller.phoneNumber}</p>
      <p>Address: ${seller.address}</p>
      <p>Price: ${seller.price}</p>
      <p>Weight: ${seller.weight}</p>
      </div>
    `;
  card.appendChild(cow);
  card.appendChild(sellerInfo);
  //add  card to DOM
  document.getElementById("sellerListing").appendChild(card);
}
// fetch requests
//Get Fetch for the db.json file resources
function getSellerData() {
  fetch("http://localhost:3000/sellerData")
    .then((res) => res.json())
    .then((sellerData) => sellerData.forEach((seller) => sellerPage(seller)));
}

function addCow(cowObj) {
  fetch("http://localhost:3000/sellerData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cowObj),
  }).then((resp) => resp.json());
}

function initialize() {
  getSellerData();
}
initialize();
