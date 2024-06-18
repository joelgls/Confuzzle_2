

    document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function() {
        // Handle logout logic here
        localStorage.removeItem('token'); // Remove user token
        window.location.href = 'index.html'; // Redirect to the login page or homepage
    });

    // Fetch user data and update profile page
    const token = localStorage.getItem('token');
    fetchUserData(token);
    });


        async function fetchUserData(token) {
    try {
        const response = await fetch(`http://localhost:4242/api/pgs/user/email/${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        updateProfilePage(userData); // Update profile page with fetched user data
    } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data. Please try again later.');
    }
}


        function updateProfilePage(userData) {
            document.getElementById('name').textContent = userData.name;
            document.getElementById('email').textContent = userData.email;
            document.getElementById('password').textContent = '********'; // Placeholder for password

        }

                // Fetch topic details based on the topicId
            const fetchLoginDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4242/api/pgs/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch topic details');
                }
                const user = await response.json();
                displayTopicDetails(user);
            } catch (error) {
                console.error('Error fetching topic details:', error);
                alert('Failed to fetch topic details. Please try again later.');
            }
        };

        
        // Call fetchLoginDetails when the page loads
        window.onload = fetchLoginDetails;

