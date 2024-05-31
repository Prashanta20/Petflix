// Pasing email to singin page from home page
function toSinginIn(){
  sessionStorage.setItem("email", document.getElementById('email').value);
  window.location.href = 'signin.html';
}





// Creating an account
async function sendData(){
    const email = document.getElementById('email2').value;
    const password = document.getElementById('password').value;
    const data = JSON.stringify({ email, password });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
          },
      body: data

    };
    // response back from the server
    const response = await fetch('/create', options);
    const responseJson = await response.json();
    //console.log(responseJson);
    if (responseJson.status == false) {
      // if account was not created (already exists)
      document.getElementById("isCreate").textContent = "Email already taken, please try again";
      document.getElementById("isCreate").style.opacity = 1;
      document.getElementById("isCreate").style.color = "red";
    } else{
      // if account was created succesfully
      document.getElementById("isCreate").textContent = "Account was created succesfully!";
      document.getElementById("isCreate").style.opacity = 1;
      document.getElementById("isCreate").style.color = "green";
    }
    
  }


// Sign in
async function signIn(){
    const email = document.getElementById('email2').value;
    const password = document.getElementById('password').value;
    const data = JSON.stringify({ email, password });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
          },
      body: data

    };
    
    // response back from the server
    const response = await fetch('/sign', options);
    const responseJson = await response.json();
    //console.log(responseJson);
    if (responseJson.status == false) {
      // if account was not signed in
      document.getElementById("sign").textContent = "Incorrect password or email";
      document.getElementById("sign").style.opacity = 1;
      document.getElementById("sign").style.color = "red";
    } else{
      // if account was signed in
      window.location.href = 'congrats.html';
    }
    
  }