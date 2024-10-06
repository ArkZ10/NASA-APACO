// Scroll event to adjust header padding based on scroll position
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Check if the header element exists to avoid errors
    if (header) {
        // If the scroll position is greater than 100px, reduce the padding
        if (scrollTop > 100) {
            header.style.padding = '20px 20px';  // Shrink padding
        } else {
            // Return to original padding when scrolled back to the top
            const padding = 200 - scrollTop;
            header.style.padding = `${padding}px 20px`;  // Dynamically adjust padding
        }
    }
});

// Menu button click event to navigate to story2.html
document.getElementById('menu').addEventListener('click', function() {
    window.location.href = 'story2/story2.html';       //story2/story2.html
});


