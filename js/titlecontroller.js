var titles = ['Hacker', 'McGill Student', 'Co-Founder of HackMcGill', 'Floor Fellow at McConnell Hall', 'Basketball Fan', 'Aspiring Entrepreneur', 'Bassist']

$(function(){
      $(".mytitle").typed({
        strings: titles,
        typeSpeed: 60,
        loop: true,
        startDelay: 200,
        backDelay: 1000,
        showCursor: false
      });
  });