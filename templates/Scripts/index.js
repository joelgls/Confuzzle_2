
        document.addEventListener("DOMContentLoaded", () => {
            console.log("DOM fully loaded and parsed");

            const searchForm = document.getElementById('searchForm');
            const resultsContainer = document.getElementById('resultsContainer');
            const resultsMessage = document.getElementById('resultsMessage');
            const clearResultsButton = document.getElementById('clearResultsButton');

            searchForm.addEventListener('submit', handleSearch);
            clearResultsButton.addEventListener('click', clearResults);

            function handleSearch(event) {
                event.preventDefault(); // Prevent default form submission

                const title = document.getElementById('searchInput').value.trim();
                console.log('Searching for:', title);

                fetch(`http://localhost:4242/api/pgs/topic/search/${encodeURIComponent(title)}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Received data:', data);

                        resultsContainer.innerHTML = ''; // Clear previous results
                        resultsContainer.appendChild(clearResultsButton); // Re-attach the close button

                        if (data && data.length > 0) {
                            data.sort((a, b) => a.title.localeCompare(b.title));
                            data.forEach(result => {
                                const card = createCard(result);
                                resultsContainer.appendChild(card);
                            });
                        } else {
                            resultsMessage.textContent = 'No results found.';
                            resultsContainer.appendChild(resultsMessage);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        resultsMessage.textContent = 'Error fetching data. Please try again later.';
                        resultsContainer.appendChild(resultsMessage);
                    });
            }

            function createCard(result) {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const titleLink = document.createElement('a');
    titleLink.href = `Discussion.html?id=${result.id}`; // Replace with actual discussion page URL
    titleLink.classList.add('card-title');
    titleLink.textContent = result.title;
    titleLink.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = titleLink.href;
    });

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = result.description;

    cardBody.appendChild(titleLink);
    cardBody.appendChild(description);
    card.appendChild(cardBody);

    return card;
}



            function clearResults() {
                resultsContainer.innerHTML = ''; // Clear all results
                resultsMessage.textContent = 'Search results will appear here.';
                resultsContainer.appendChild(resultsMessage); // Re-attach the results message
                resultsContainer.appendChild(clearResultsButton); // Re-attach the close button
            }
        });

    // assume you have a function to check if the user is logged in
    function isLoggedIn() {
        // your logic to check if the user is logged in
        // return true if logged in, false otherwise
    }

    // show the dashboard button if the user is logged in
    if (isLoggedIn()) {
        document.getElementById("dashboard-btn").style.display = "block";
    }


    const token = localStorage.getItem('token');
if (token) {
  document.getElementById("dashboard-btn").style.display = "block";
}



