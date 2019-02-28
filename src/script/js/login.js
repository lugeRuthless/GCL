define(['config','cookie'],function(config,cookie){
    require(['jquery'],function(){
        return {
            validate:(function(){
                var $url="http://10.31.162.11:8088/samsclub/php/";
                $('input').not('input:last').on('focus',function(){
                    $(this).css('border-color','#00abdd');
                });
                $('input').not('input:last').on('blur',function(){
                    $(this).css('border-color','#dcdcdc');
                });

                $('.btn_login').on('click',function(){
                    if($('.username').val()!='' && $('.pwd').val()!=''){
                         $.ajax({
                            type: "post",
                            url: $url+"login.php",
                            data: {
                                username:$('.username').val(),
                                pwd:$('.pwd').val()
                            },
                        }).done(function(data){
                            if(!data){
                               // $('.username').css('border-color','red');
                                $('.warning').html('账号和密码不匹配,请重新输入');
                                //$('.username').css('border-color','red');
                            
                            }else{
                                cookie.addcookie('name',$('.username').val(),7);
                                $('.btn_login').val('正在提交请求').css('background','#aaa');
                                setTimeout(function(){
                                    location.href='index.html';
                                },3000);
                                
                            }
                        });
                    }else{
                        $('.warning').html('请填写账号名或密码');
                    }      
                });
            })() 
        };
    });
});