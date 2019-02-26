define(['config'],function(){
    require(['jquery'],function(){
        return {
            validate:(function(){
                $('input').on('focus',function(){
                    $(this).css('border-color','#00abdd');
                });
                $('input').on('blur',function(){
                    $(this).css('border-color','#dcdcdc');
                });
                $('.btn_login').on('click',function(){

                    if($('.username').val()!='' && $('.pwd').val()!=''){
                         $.ajax({
                            type: "post",
                            url: "http://10.31.162.11:8088/samsclub/php/login.php",
                            data: {
                                username:$('.username').val(),
                                pwd:$('.pwd').val()
                            },
                        }).done(function(data){
                            if(!data){
                                $('.warning').html('账号和密码不匹配,请重新输入');
                                $('.username').css('border-color','red');
                            
                            }else{
                                //成功跳转主页
                            }
                        });
                    }else if($('username').val()=='' || $('pwd').val()==''){
                        $('.warning').html('请填写账号名或密码');
                     
                    }
                   
                });
            })()
        };
    });
});