tknize();
function tknize(){
        $.ajax({
            method:'POST',
            url:"apihandlers/tknize.php",
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
            success:function(e){
                    if(parseInt(e)==0 || parseInt(e)==1){
                            showError(e);
                    }
                document.querySelector('#token').value=e;
                }
        })
}