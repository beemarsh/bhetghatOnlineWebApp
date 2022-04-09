
let c = 0;

function showHideMobileNav() {
    if (c += 1, $(".mobNavList").fadeToggle(), c % 2 == 1) {
        var a = !0;
        $(".mobNavList").show();          
    } else {
        a = !1;
        $(".mobNavList").fadeOut()
    }
    $(".navButt i").toggleClass("flaticon-menu-1", !a), $(".navButt i").toggleClass("flaticon-close", a)
}

if(datacheck()==true){
    no_of_items();
}else{
    $('.okbut').click(function(){
        window.location.href='order';
    })
}

function datacheck(){
    var items=JSON.parse(localStorage.getItem('dat_food_var'));
    if(Array.isArray(items)){
    if(items.length<=0){
        showError('Data is lost ! Fill up again');
        return false;
    }else{
        return true;
    }
}else{
    showError('Data is lost ! Fill up again');
        return false;
}
}
function showError(errCode){
    hideLoader();
    var erroCodes=[0,1,2,3,4,5,6];
    var erroLang=['Sorry! Connection to Server Failed',"Sorry ! Couldn't process this time","Fields cannot be empty. Fill up all the fields","Please Enter a valid name! Numbers not allowed","Please enter a valid email","Please enter a valid phone number","Please enter a valid Address"];
    $('.blacker').show();
    if(erroCodes.includes(parseInt(errCode))){
        errCode=erroLang[parseInt(errCode)];
    }
    document.querySelector('.errCode').innerText=errCode;
    $('.errBox').fadeIn();
}
function hideError(){
    $('.errBox').fadeOut();
    showhideBlacker();
}
function no_of_items(){
    var locallength=JSON.parse(localStorage.getItem('dat_food_var')).length;
    document.querySelector('.total').innerText=locallength;
}
function showProducts(){
    $('.selecteditems').fadeToggle();
    embedListed();
}
function embedListed(){
    $('.contentgrid').empty();
    var g_items=JSON.parse(localStorage.getItem('dat_food_var'));
    var totalPRice=0;
    for(i=0;i<g_items.length;i++){
        var gridBox=document.createElement('div');
        var gridBoxclass=document.createAttribute('class');
        gridBoxclass.value="gridBox";
        gridBox.setAttributeNode(gridBoxclass);
        
        var sn=document.createElement('div');
        var snclass=document.createAttribute('class');
        snclass.value="item-sn";
        sn.setAttributeNode(snclass);
        var dele=document.createElement('div');
        var deleclass=document.createAttribute('class');
        deleclass.value="delete";
        dele.setAttributeNode(deleclass);        
        var delvalue=document.createAttribute('value');
        delvalue.value=i;
        dele.setAttributeNode(delvalue);
        var spandel=document.createElement('span');
        var spandelclass=document.createAttribute('class');
        spandelclass.value="flaticon-remove";
        spandel.setAttributeNode(spandelclass);
        dele.appendChild(spandel);
        sn.appendChild(dele);
        sntext=document.createTextNode(i+1);
        sn.appendChild(sntext);

        var food=document.createElement('div');
        var foodclass=document.createAttribute('class');
        foodclass.value="item-food";
        food.setAttributeNode(foodclass);
        var foodtext=document.createTextNode(g_items[i].food);
        food.appendChild(foodtext);
        
        var price=document.createElement('div');
        var priceclass=document.createAttribute('class');
        priceclass.value="item-price";
        price.setAttributeNode(priceclass);
        var pricetext=document.createTextNode(g_items[i].price);
        price.appendChild(pricetext);

        gridBox.appendChild(sn);
        gridBox.appendChild(food);
        gridBox.appendChild(price);
        document.querySelector('.contentgrid').appendChild(gridBox);
        totalPRice+=parseFloat(g_items[i].price);
    }
    document.querySelector('.priceGround').innerText="Rs "+totalPRice;
    startRemover();
}
function startRemover(){
    $('.delete').click(function(){
        var whereit=parseInt(this.getAttribute('value'));
        var localItem=JSON.parse(localStorage.getItem('dat_food_var'));
        localItem.splice(whereit,1);
        localStorage.setItem("dat_food_var",JSON.stringify(localItem));
        embedListed();
    })
}
function showhideBlacker(){
    $('.blacker').fadeToggle();
}
function submitForm(){
    showLoader();
    var name=document.querySelector('#name').value;
    var phone=document.querySelector('#phone').value;
    var email=document.querySelector('#email').value;
    var address=document.querySelector('#address').value;
    var token=document.querySelector('#token').value;
    var foodList=localStorage.getItem("dat_food_var");
    var data="name="+name+"&phone="+phone+"&email="+email+"&address="+address+"&token="+token+"&food="+foodList;
        $.ajax({
            method:'POST',
            url:"apihandlers/userquery.php",
            cache:false,
            data:data,
            statusCode:{
                404:function(){
                        hideLoader();
                        showError(1);
                },
                403:function(){
                        hideLoader();
                        showError(1);
                }
            },
            success:function(e){
                console.log(e);
                if(checkInArray(e)){
                    showError(e);
            }else if(parseInt(e)==7){//sxs
                hideLoader();
                showCongrats();
            }else{
                showError(1);
            }
        }
    })
    tknize();
}
function hideLoader(){
    $('.loader').fadeOut();
}
function showLoader(){
    $('.loader').fadeIn();
}
function checkInArray(e){
    var erroCodes=[0,1,2,3,4,5,6];    
    if(erroCodes.includes(parseInt(e))){
        return true;
    }else{
        return false;
    }
}
function showCongrats(){
    showhideBlacker();
    $('.congratsbox').show();
}
function hideCongrats(){
    showhideBlacker();
    $('.congratsbox').hide();
    window.location.href='index';
}