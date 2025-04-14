// load-header.js
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and inject the header
    fetch('header.html')
      .then(response => response.text())
      .then(html => {
        // Inject at the top of <body>
        document.getElementById('flex-container').insertAdjacentHTML('afterbegin', html);
      })
      .catch(error => console.error('Error loading header:', error));

    // Load Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('flex-container').insertAdjacentHTML('beforeend', html);
        })
        .catch(error => console.error('Error loading footer:', error));
  });