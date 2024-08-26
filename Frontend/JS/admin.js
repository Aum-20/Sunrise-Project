document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logout-link');

    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            console.log("Event home is clicked");
            event.preventDefault(); // Prevent the default link action
            fetch('/api/v1/admin/logout', { method: 'POST', credentials: 'include' })
                .then(response => {
                    if (response.redirected) {
                        window.location.href = response.url; // Redirect to login page
                    }
                })
                .catch(error => {
                    console.error('Logout failed:', error);
                });
        });
    }
});