


async function loginUser() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Check if fields are filled
    if (email.trim() === '' || password.trim() === '') {
        alert("Please fill in all fields.");
        return;
    }

    // Prepare user data to send to the server
    var user = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch('http://localhost:4242/api/pgs/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const responseData = await response.json();

        console.log(responseData); // Log the response to check its content

        if (response.ok) {
            // Store the token in local storage
            localStorage.setItem('token', responseData.token);

            alert("Login successful!");
            
            // Redirect based on user role
            redirectToPage(responseData);
        } else {
            alert(responseData.msg || "Invalid credentials. Please try again.");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while logging in. Please try again later.");
    }
}

function redirectToPage(userData) {
    console.log("User data for redirection:", userData); // Log userData to verify isAdmin property
    if (userData.isAdmin) {
        window.location.href = "Admin.html";
    } else {
        window.location.href = "index.html";
    }
}
