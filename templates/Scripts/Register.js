

document.getElementById('signup-form').addEventListener('submit', function(event) {
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('password2').value;

  if (password !== confirmPassword) {
      event.preventDefault(); 
      document.getElementById('password-match-error').style.display = 'block';
  } else {
      document.getElementById('password-match-error').style.display = 'none';
  }

  const newUser = async () => {
    var dados = {
      name: document.getElementById("mName").value,
      email: document.getElementById("mEmail").value,
      password: document.getElementById("mPassword").value,
    };
    
    try {
      const response = await fetch("http://localhost:4242/api/pgs/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      if (!response.ok) {
        throw new Error("Problem collecting data");
      }
      const data = await response.json();
      const resposta = "The user called " + dados.name + " was added with success!";
      alert(resposta);
      //listUser();
    } catch (error) {
      console.error("Error detected:", error);
      alert("An error occurred: " + error.message);
    }
  };

  newUser(); // Call the function to create a new user
});
