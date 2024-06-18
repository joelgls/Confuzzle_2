


        const redirectToOpinions = (id) => {
            // Redirect to Discussion.html with the appropriate id
            window.location.href = `Discussion.html?id=${id}`;
        };

        const redirectToProfile = (id) => {
            // Redirect to profile.html with the appropriate id
            window.location.href = `profile.html?id=${id}`;
        };

        const newTopic = async () => {
            var dados = {
                title: document.getElementById("mTitle").value,
                description: document.getElementById("mDescription").value,
                user_id: 3, // TODO: Retrieve user_id from localStorage or another source
            };

            fetch("http://localhost:4242/api/pgs/topic/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Problem collecting data");
                }
                return response.json();
            })
            .then((data) => {
                alert(`The topic with the title "${dados.title}" was added successfully!`);
                listTopic();
            })
            .catch((error) => {
                console.error("Error creating new topic:", error);
                alert("Failed to create new topic. Please try again later.");
            });
        };

        const deleteTopic = async (id) => {
            fetch(`http://localhost:4242/api/pgs/topic/delete/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error deleting topic");
                }
                return response;
            })
            .then((data) => {
                alert("Topic deleted successfully!");
                listTopic();
            })
            .catch((error) => {
                console.error("Error deleting topic:", error);
                alert("Failed to delete topic. Please try again later.");
            });
        };


        
