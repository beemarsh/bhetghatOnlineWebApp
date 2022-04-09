onloadLStorage();
function send_req(req_para){
    var reqsParas=req_para+"&token="+document.querySelector('#token').value;
    // console.log(reqsParas);
    $.ajax({
        data:reqsParas,
        method:'POST',
        url:"apihandlers/menushow.php",
        cache:false,
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
        success:function(html){
            tknize();
            hideLoader();
            gotoSearch();
            // console.log(html);
            if(parseInt(html)==1){
                showError(1);
            }else if(parseInt(html)==0){
                showError(0);
            }else{
                displayContents(JSON.parse(html));
            }
        }
    })
}
function showAll(){
    showLoader();
    var reqtoshowall="showall=1";
    send_req(reqtoshowall);
}
function displayContents(resp_paras){
    var availableString=['Out Of Stock','Yes,Of Course.','Out of Stock due to LockDown.']
    $('.menuContainer').empty();
    for(i=0;i<resp_paras.length;i++){
        var menuBox=document.createElement('div');//Outer Cover MenuBox
        var menuBoxClass=document.createAttribute('class');
        menuBoxClass.value='menuBox';
        menuBox.setAttributeNode(menuBoxClass);

        var tickbox=document.createElement('label');//Tickbox
        var tickboxClass=document.createAttribute('class');
        tickboxClass.value="container";
        tickbox.setAttributeNode(tickboxClass);
        var inputcheckbox=document.createElement('input');
        var inputcheckboxtype=document.createAttribute('type');
        inputcheckboxtype.value="checkbox";
        inputcheckbox.setAttributeNode(inputcheckboxtype);
        tickbox.appendChild(inputcheckbox);
        var spancheckmark=document.createElement('span');
        spancheckmarkclass=document.createAttribute('class');
        spancheckmarkclass.value="checkmark";
        spancheckmark.setAttributeNode(spancheckmarkclass);
        tickbox.appendChild(spancheckmark);
        menuBox.appendChild(tickbox);


        var name=document.createElement('div');//Name Box
        var nameClass=document.createAttribute('class');
        nameClass.value="name menuitem";
        name.setAttributeNode(nameClass);
        var nameText=document.createTextNode("Name:");//Name text
        name.appendChild(nameText);
        var namespan=document.createElement('span');//Name Span
        var namespantext=document.createTextNode(resp_paras[i].food);//Actual Name of Food
        namespan.appendChild(namespantext);
        name.appendChild(namespan);
        menuBox.appendChild(name);

        var price=document.createElement('div');//Price BOx
        var priceClass=document.createAttribute('class');
        priceClass.value="price menuitem";
        price.setAttributeNode(priceClass);
        var priceText=document.createTextNode("Price:");//PRice text
        price.appendChild(priceText);
        var pricespan=document.createElement('span');//PRice Span
        var pricespantext=document.createTextNode(resp_paras[i].price);//Actual Price
        pricespan.appendChild(pricespantext);
        price.appendChild(pricespan);
        menuBox.appendChild(price);

        var detail=document.createElement('div');//Detail BOx
        var detailClass=document.createAttribute('class');
        detailClass.value="detail menuitem";
        detail.setAttributeNode(detailClass);
        var detailText=document.createTextNode("Detail:");//Detail text
        detail.appendChild(detailText);
        var detailspan=document.createElement('span');//Deatail Span
        var detailspantext=document.createTextNode(resp_paras[i].detail);//Actual Detail
        detailspan.appendChild(detailspantext);
        detail.appendChild(detailspan);
        menuBox.appendChild(detail);
        
        var available=document.createElement('div');//Available BOx
        var availableClass=document.createAttribute('class');
        availableClass.value="available menuitem";
        available.setAttributeNode(availableClass);
        var availableText=document.createTextNode("Avaibility:");//Available text
        available.appendChild(availableText);
        var availablespan=document.createElement('span');//Available Span
        var availablespantext=document.createTextNode(availableString[parseInt(resp_paras[i].know)]);//Available Detail
        availablespan.appendChild(availablespantext);
        available.appendChild(availablespan);
        menuBox.appendChild(available);

        document.querySelector('.menuContainer').appendChild(menuBox);
    }
    addtoList();
}
function showLoader(){
    document.querySelector('.loader').style.display="block";
}
function hideLoader(){
    document.querySelector('.loader').style.display="none";
}
function showError(showerrPar){
    $('.menuContainer').empty();
    var errval=["Couldn't find results.","Connection couldn't be established.Check your Internet Connection"];
    var errorContainer=document.createElement('div');
    var errorContainerClass=document.createAttribute('class');
    errorContainerClass.value="errorHandler";
    errorContainer.setAttributeNode(errorContainerClass);
    var errImg=document.createElement('img');
    var errImgAttr=document.createAttribute('src');
    errImgAttr.value="pics/error"+Math.floor(Math.random()*3+1)+".png";
    errImg.setAttributeNode(errImgAttr);
    var errText=document.createTextNode(errval[parseInt(showerrPar)]);
    errorContainer.appendChild(errImg);
    errorContainer.appendChild(errText);
    document.querySelector('.menuContainer').appendChild(errorContainer);
}
// Other one
function searchQuery(){
    showLoader();
    var minVal=document.querySelector('#minprice').value;
    var maxVal=document.querySelector('#maxprice').value;
    var search=document.querySelector("#searchbar").value;
    var send_quer="min="+minVal+"&max="+maxVal+"&search="+search;
    send_req(send_quer);
}
function gotoSearch(){
    window.location="#searchPoint";
}
function checkIfEmpty(){
    var lItems=JSON.parse(localStorage.getItem('dat_food_var'));
    if(lItems.length==0){
        $('.menushower').fadeOut();
    }else{
        $('.menushower').fadeIn();
    }
}

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
function addtoList(){
$('.menuBox').click(function(){
    if(this.children[0].children[0].hasAttribute('checked')){
        this.children[0].children[0].removeAttribute('checked');
        remove(this);
    }else{
        this.children[0].children[0].setAttribute("checked","");
        add(this);
    }
    checkIfEmpty();
    checkForScooty();
})
}
function add(e){    
    var f_name=e.children[1].children[0].innerText
    var f_price=e.children[2].children[0].innerText;
    var pre_json=JSON.parse(localStorage.getItem('dat_food_var'));
    var json_d={food:f_name,price:f_price}
    pre_json.push(json_d);
    localStorage.setItem('dat_food_var',JSON.stringify(pre_json));
}
function remove(e){
    var f_name=e.children[1].children[0].innerText
    var f_price=e.children[2].children[0].innerText;
    var pre_json=JSON.parse(localStorage.getItem('dat_food_var'));
    var json_d={food:f_name,price:f_price}
    pre_json.splice(pre_json.indexOf(json_d),1);
    localStorage.setItem('dat_food_var',JSON.stringify(pre_json));
}
function onloadLStorage(){
    localStorage.setItem('dat_food_var',JSON.stringify([]));
}

function showProducts(){
    $('.selecteditems').fadeToggle();
    embedListed();
    showhideBlacker();
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

function showhideBlacker(){
    $('.blacker').fadeToggle();
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
function goToCheckout(){
    var lstt=JSON.parse(localStorage.getItem("dat_food_var"));
    if(lstt.length<=0){
        showErr("Select At least a product | No Products Selected");
    }else{
        window.location.href="users";
    }
}
function showErr(errCode){
    hideLoader();
    $('.blacker').show();
    document.querySelector('.errCode').innerText=errCode;
    $('.errBox').fadeIn();
}
function hideError(){
    $('.errBox').fadeOut();
    $('.blacker').hide();
    $('.selecteditems').hide();
}