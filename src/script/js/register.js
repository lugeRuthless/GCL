define(['config'],function(){
    require(['jquery'],function(){
            return {
                formvalidate:(function(){
                   var $url='http://10.31.162.11:8088/samsclub/php/';
                   $('.vip a').on('click',function(){
                       $(this).addClass('active').siblings('a').removeClass('active');
                       if($(this).index()==1){
                           $('.vip_reg').show();
                           $('.regsiter_name').hide();
                       }else{
                           $('.regsiter_name').show();
                           $('.vip_reg').hide();
                       }
                   });
                   //密码强度检验
                   $('.username').focus();
                   $('.password').on('input',function(){
                       var rergnum=/\d+/;
                       var lowcase=/[a-z]+/;
                       var upcase=/[A-Z]+/;
                       var other=/[^0-9a-zA-Z]+/;
                       var num=0;
                       //console.log($(this).val().length);
                       if($(this).val().length>=6 && $(this).val().length<=20){
                           if(rergnum.test($(this).val())){
                               num++;
                           }
                           if(lowcase.test($(this).val())){
                               num++;
                           }
                           if(upcase.test($(this).val())){
                               num++;
                           }
                           if(other.test($(this).val())){
                               num++;
                           }
                           console.log(num);
                           switch(num){
                               case 1 : $('.default_strong').find('span').eq(num).show().siblings('span').hide();
                                        $('.regsiter_pwd').find('p').html('密码太简单了');break;
                               case 2 : $('.default_strong').find('span').eq(num).show().siblings('span').hide();
                                        $('.regsiter_pwd').find('p').html('');break;
                               case 3 : $('.default_strong').find('span').eq(num).show().siblings('span').hide();break;
                               case 4 : $('.default_strong').find('span').eq(num).show().siblings('span').hide();break;
                            }
                       }else{
                            $('.default_strong').find('span').eq(0).show().siblings('span').hide();
                           $('.regsiter_pwd').find('p').html('密码长度有误').css('color','red');
                       }
                   });
                   $('.password').on('blur',function(){
                         $('.regsiter_pwd').find('p').html("6-20位字符,可由大小写英文,数字或符号'-,'_'组成").css('color','#aaa');
                   });
                   
                   $('.username').on('input',function(){
                    $(this).next().html('4-20位字符，可由中文、英文、数字').css('color','#aaa');
                   });
                   $('.username').on('blur',function(){
                       if($(this).val()!=''){

                       }else{
                           $(this).next().html('请输入您的用户名').css('color','red');
                           $(this).css('border-color','red');
                       }
                       /* $.ajax({
                           type : 'post',
                           url:$url+'register.php',
                           data:{
                               username : $(this).val()
                           }
                       }).done(function(msg){
                           if(msg){
                               $('.regsiter_name').find('p').html('该用户名已存在').css('color','red');
                           }else{
                               ///location.href='login.html';
                           }
                       }); */
                   });

                
                  
                })()
            }
        });
});