function doBounce(element, times, distance, speed) {
    for(i = 0; i < times; i++) {
        element.animate({marginTop: '-='+distance},speed)
            .animate({marginTop: '+='+distance},speed);
    }        
}
function hideTut(){
    $('.tutbox').fadeOut();
}
function showTutBox(){
    setTimeout(function(){
        $('.tutbox').css("display","flex").fadeIn()
    },3000);
}

 function bounceCall(){
    doBounce($('.img-circleblock'), 20, '10px', 300);
 }
function callButt(){
    document.querySelector('.message').innerText="Press the Call Button to Contact Us";
}
 function searchMenu(){
    document.querySelector('.message').innerHTML="Use the search bar to search items.<br> Discover more items";
 }

 function orderFood(){
    document.querySelector('.message').innerHTML="To order Food: Search for Items <br>and<br> Add to your list, as simple as that";
}
function scootyTap(){
    doBounce($('.menucontent'), 30, '10px', 300);
    document.querySelector('.message').innerHTML="Tap on The Scooter Icon to See your selected items";
 }
 function checkForScooty(){
     var this_ccok=getCookie('bhet_scoo');
     if(this_ccok!=1){
        document.cookie = "bhet_scoo=1; expires=0; path=/";
         showTutBox();
        scootyTap();
     }
 }