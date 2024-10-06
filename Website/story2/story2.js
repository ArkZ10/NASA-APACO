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
    document.querySelector('#sec4').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.button3').addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default link
    document.querySelector('#sec5').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('liver').addEventListener('click', function(e) {
    e.preventDefault(); 
    window.location.href = '../RR8/qna/q1.html';
});

document.getElementById('vision').addEventListener('click', function(e) {
    e.preventDefault(); 
    window.location.href = '../RR23/qna/q1.html';
});
