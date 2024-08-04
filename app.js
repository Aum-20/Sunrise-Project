document.getElementById('contactUsBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const contactFormContainer = document.getElementById('contactFormContainer');
    if (contactFormContainer.classList.contains('hidden')) {
        contactFormContainer.classList.remove('hidden');
        contactFormContainer.style.display = 'block';
    } else {
        contactFormContainer.classList.add('hidden');
        contactFormContainer.style.display = 'none';
    }
});
