document.querySelector('.button').addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default link
    document.querySelector('#sec2').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.button1').addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default link
    document.querySelector('#sec3').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.button2').addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default link
    window.location.href = '../CLOSING/Closing.html';
});