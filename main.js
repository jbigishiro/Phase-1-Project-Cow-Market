function sellerPage(seller){
    //build animal
    let card=document.createElement("li")
    card.className="card"
    card.style.textAlign="center"
    card.innerHTML=`
     <img src=${seller.imageUrl} width="400" height="300">
     <div class="content">
      <p>Name: ${seller.name}</p><br>
      <p>Phone Number: ${seller.phoneNumber}</p><br>
      <p>${seller.address}</p><br>
      <p>${seller.price}</p><br>
      <p>${seller.weight}</p><br>
      </div>
    `
    //add animal card to DOM
document.getElementById("sellerListing").appendChild(card)
    
}
// fetch requests
//Get Fetch for all animal resources
function getSellerData(){
    fetch('http://localhost:3000/sellerData')
    .then(res=>res.json())
  .then(sellerData=>sellerData.forEach(seller=>sellerPage(seller)))

}


// initial render
// get data and render our animals to the DOM
function initialize(){
  getSellerData()
}
initialize()