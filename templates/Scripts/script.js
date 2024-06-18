// Sobre o Register

// This is not a dar nao sei porque ver depois

//document.getElementById('password').addEventListener('input', function() {
  //  var password = this.value;
 //   var passwordPattern = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
   // var passwordMessage = document.getElementById('passwordMessage');
   // if (!passwordPattern.test(password)) {
   //     passwordMessage.innerText = "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long";
   //     this.classList.add('is-invalid');
   // } else {
   //     passwordMessage.innerText = "";
   //     this.classList.remove('is-invalid');
   // }
//});



document.getElementById('signup-form').addEventListener('submit', function(event) {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('password2').value;

    if (password !== confirmPassword) {
        event.preventDefault(); 
        document.getElementById('password-match-error').style.display = 'block'; // erro
    }
});


document.getElementById('username').addEventListener('input', function() {
    var username = this.value;
    var usernameMessage = document.getElementById('usernameMessage');
    if (username.length < 3) {
        usernameMessage.innerText = "Username must be at least 3 characters long";
        this.classList.add('is-invalid');
    } else {
        usernameMessage.innerText = "";
        this.classList.remove('is-invalid');
    }
});



//Sobre o Admin Panel


function deleteTask(button) {
    var taskRow = button.closest('tr');
    taskRow.remove();
}


