//eventlistener to switch between login form and signup form
document.getElementById("clickToSignup").addEventListener("click", () => {
  const loginForm = document.getElementById("divloginForm");
  const signupForm = document.getElementById("divsignupForm");
  loginForm.classList.add("hideSigninSignupForm");
  signupForm.classList.remove("hideSigninSignupForm");
});

document.getElementById("clickToSignin").addEventListener("click", () => {
  const loginForm = document.getElementById("divloginForm");
  const signupForm = document.getElementById("divsignupForm");
  loginForm.classList.remove("hideSigninSignupForm");
  signupForm.classList.add("hideSigninSignupForm");
});

// eventListener to go back to login form
document.getElementById("backToLoginPage").addEventListener("click", () => {
  const loginForm = document.getElementById("divloginForm");
  const sellerForm = document.getElementById("divsellerForm1");
  loginForm.classList.remove("hideSigninSellerForm");
  sellerForm.classList.add("hideSigninSellerForm");
});

// login functionality
document.getElementById("loginForm").addEventListener("submit", login);
function login(e) {
  e.preventDefault();
  let username = e.target.username.value;
  let password = e.target.password.value;

 fetch("http://localhost:3000/sellerAccount")
    .then((res) => res.json())
    .then((sellerAccounts) => {
      for (let i = 0; i < sellerAccounts.length; i++) {
    if (
      username === sellerAccounts[i].username &&
      password === sellerAccounts[i].password
    ) {
      alert("you have successfully logged in!");
      const loginForm = document.getElementById("divloginForm");
      const sellerForm = document.getElementById("divsellerForm1");
      loginForm.classList.add("hideSigninSellerForm");
      sellerForm.classList.remove("hideSigninSellerForm");
      return;
    }
  }
  alert("incorrect username or password");
})}

// register functionality
document.getElementById("signupForm").addEventListener("submit", signup);
function signup(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let email = e.target.email.value;
  let username = e.target.username.value;
  let password = e.target.password.value;
  let reenterPassword = e.target.reenterpassword.value;
  let newUser = {
    name: name,
    email: email,
    username: username,
    password: password,
  };
  fetch("http://localhost:3000/sellerAccount")
    .then((res) => res.json())
    .then((sellerAccounts) => {
      for (let i = 0; i < sellerAccounts.length; i++) {
        if (email === sellerAccounts[i].email) {
          alert("That email is already in use, please choose another");
        } else if (username === sellerAccounts[i].username) {
          alert("That username is already in use, please choose another");
        } else if (password !== reenterPassword) {
          alert("The password you entered doesn't match");
        } else {
          fetch("http://localhost:3000/sellerAccount", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }).then((resp) => resp.json());

          alert("you have successfully signed up ");
        }
        return;
      }
    });
}

//create an eventListenerr to submit the seller form
document.getElementById("sellerForm1").addEventListener("submit", submitSellerForm);
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
  let image = document.createElement("img");
  image.src = seller.imageUrl;
  image.style.width = "100%";
  image.style.height = "auto";
  cow.append(image);
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
  alert("you have successfully sent your form ");

}

function initialize() {
  getSellerData();
}
initialize();
