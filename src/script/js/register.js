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
                  // $('.username').focus();
                   
                   var usernameflag=true;
                   var emailflag=true;
                   var pwdflag=true;
                   var telflag=true;
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
                          // console.log(num);
                           switch(num){
                               case 1 : $('.default_strong').find('span').eq(num).show().siblings('span').hide();pwdflag=false;;
                                        $('.regsiter_pwd').find('p').html('密码太简单了');break;
                               case 2 : $('.default_strong').find('span').eq(num).show().siblings('span').hide();$('.password').css('border-color','rgb(0,171,221)');pwdflag=true;
                                        $('.regsiter_pwd').find('p').html('');break;
                               case 3 : $('.default_strong').find('span').eq(num).show().siblings('span').hide();break;
                               case 4 : $('.default_strong').find('span').eq(num).show().siblings('span').hide();break;
                            }
                       }else{
                            $('.default_strong').find('span').eq(0).show().siblings('span').hide();
                            $('.regsiter_pwd').find('p').html('密码长度有误').css('color','red');
                            $('.password').css('border-color','red');
                            pwdflag=false;
                       }
                   });
                   $('.password').on('blur',function(){
                       if($(this).val()!=''){
                        $('.regsiter_pwd').find('p').html("6-20位字符,可由大小写英文,数字或符号'-,'_'组成").css('color','#aaa');
                        pwdflag=true;
                       }else{
                            $('.password').css('border-color','red');
                            $(this).next().html('密码不能为空').css('color','red');   
                            pwdflag=false;              
                       }
                         
                   });
                   $('.confirm_password').on('blur',function(){
                        if($(this).val()!=$('.password').val()){
                            $(this).next().html('两次密码不一致请重新输入').css('color','red');
                            $('.confirm_password').css('border-color','red');
                            pwdflag=false;
                        }else{
                            $(this).next().html('').css('color','#aaa');
                            $('.confirm_password').css('border-color','#aaa');  
                            pwdflag=true; 
                        }
                   });

                   $('.tel').on('blur',function(){
                       if($(this).val()!=''){
                            var tel=/^1[3578]\d{9}$/;
                            if(tel.test($(this).val())){
                                $(this).next().html('');
                                $('.code').css({
                                    'background-color':'#f7f7f7',
                                    'color':'#666'
                                });
                                telflag=true;
                            }else{
                                $(this).next().html('您的手机号格式不正确').css('color','red');
                                $('.tel').css('border-color','red');
                                $('.code').css({
                                    'background-color':'#eee',
                                     'color':'#ccc'
                                });
                                telflag=false;
                            }
                       }else{
                           $(this).next().html('手机号码不能为空').css('color','red');
                           $('.tel').css('border-color','red');
                           telflag=false;
                       }
                   });


                   
                   $('.username').on('input',function(){ 
                           $(this).next().html('4-20位字符，可由中文、英文、数字').css('color','#aaa');                     
                   });
                   $('.username').on('blur',function(){
                       if($(this).val()!=''){
                            if($(this).val().length>=4 && $(this).val().length<=20){
                                $(this).next().html('4-20位字符，可由中文、英文、数字').css('color','#aaa');
                                usernameflag=true;
                                $.ajax({
                                        type : 'post',
                                        url: $url+'regist.php',
                                        data:{
                                            username : $('.username').val()
                                        },
                                        success:function(data){
                                            //console.log(data);
                                            if(data){
                                              //  console.log(data);
                                                $('.username').next().html('该用户名已存在').css('color','red');
                                                usernameflag=false;
                                                $('.username').css('border-color','red');
                                            } 
                                        }

                                    });
                            }else{
                                $(this).next().html('用户名长度有误').css('color','red');
                                $('.username').css('border-color','red');
                                usernameflag=false;
                            }
                           
                       }else{
                           $(this).next().html('请输入您的用户名').css('color','red');
                           $('.username').css('border-color','red');
                           usernameflag=false;
                       }
                       
                   });
                   
                   $('.email').on('blur',function(){
                        if($(this).val()!=''){
                            var email=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                            if(email.test($(this).val())){
                                $(this).next().html('请输入常用邮箱，可用作登录账户，接受订单通知和找回密码之用').css('color','#aaa');
                                $('.email').css('border-color','#aaa');
                                emailflag=true;
                            }else{
                                $(this).next().html('邮箱的格式有误').css('color','red');
                                $('.email').css('border-color','red');
                                emailflag=false;
                            }
                        }else{
                           $(this).next().html('邮箱不能为空').css('color','red');
                           $('.email').css('border-color','red');
                           emailflag=false;
                        }
                   });

                $('.onsubmit').on('click',function(){
                    if($('.username').val()==''){
                        usernameflag=false;
                    }
                    if($('.password').val()==''){
                        pwdflag=false;
                    }
                    if($('.email').val()==''){
                        emailflag=false;
                    }
                    if($('.tel').val()==''){
                        telflag=false;
                    }
                    //console.log(telflag,pwdflag,usernameflag,emailflag);
                    $('input:visible').not('input:last').each(function(index,ele){
                        if($(this).val()==''){
                            $(this).next('p').html('请填写此字段').css('color','red');
                            $(this).css('border-color','red');
                            return false;   
                        }
                    });
                    
                   // console.log($('.username').val());
                    if(telflag && pwdflag && usernameflag && emailflag){
                        $.ajax({
                            type :'post',
                            url : $url+'register1.php',
                            data:{
                                tel: window.encodeURIComponent($('.tel').val()),
                                password: window.encodeURIComponent($('.password').val()),
                                username:$('.username').val(),
                                email:$('.email').val()
                            }
                        }).done(function(data){
                            $('input').not('last').val('');
                            if(data){
                                setTimeout(function(){
                                    $('.onsubmit').animate().val('请稍后').css('background','#aaa');
                                    location.href='login.html';
                                },2000);
                            }
                        });
                    }
                });
                  
                })()
            }
        });
});