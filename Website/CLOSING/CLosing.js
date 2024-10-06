// Menu button click event to navigate to story2.html
document.getElementById('menu').addEventListener('click', function() {
    window.location.href = '../../story3/story3.html';
});

document.querySelector('.button1').addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default link
    document.querySelector('#sec2').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.button2').addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default link
    document.querySelector('#sec3').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.button3').addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default link
    document.querySelector('#sec5').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.button4').addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default link
    document.querySelector('#sec6').scrollIntoView({ behavior: 'smooth' });
});


document.querySelector('.button8').addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default link
    window.location.href = 'index.html';
});
