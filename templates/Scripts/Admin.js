function deleteTask(button) {
    // Get the row and its corresponding ID
    const row = button.closest('tr');
    const id = row.dataset.id;

    // Send a DELETE request to your server
    fetch(`/topic/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            // If the request was successful, remove the row from the table
            row.remove();
        } else {
            console.error('Error deleting topic:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error sending DELETE request:', error);
    });
}
