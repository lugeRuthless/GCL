define(['config','cookie'],function(config,cookie){
    require(['jquery'],function(){  
        $(function(){        //请求页面并加载网页头部的效果
            $('._header').load('header.html', function () {
                var $url='http://10.31.162.11:8088/samsclub/php/';
                var $subnav=$('.nav .subnav');
                var $address=$('.chgadress .module');
                var $search=$('.header_right .search input');
                var $box=$('.header_right .search .search_news');
                //console.log($subnav);
                $address.on('click',function(){
                    $('#mask').show();
                    $('.close_btn').on('click',function(){
                        $('#mask').hide();
                    });
                });
                $('.nav li').hover(function(){
                    $subnav.eq($(this).index()).show();
                },function(){
                    $subnav.eq($(this).index()).hide();
                });

                //购物车数量
                setInterval(function(){
                    if (cookie.getcookie('cookiesid')) {
                        var shangpinnum = cookie.getcookie('cookienum').split(',');
                        var numhtml = 0;
                        $.each(shangpinnum, function (index, value) {
                            numhtml += parseInt(value);
                        });
                        $('.cart .shangpin').text(parseInt(numhtml));
                    }
                },30);
               
            var timer=setInterval(function(){
                     $('.toutiao li:first,.toutiao i:first').toggleClass('lunboact').next().toggleClass('lunboact');
                    },3000);
              $('.toutiao ul').hover(function(){
                  clearInterval(timer);
              },function(){
                 timer=setInterval(function(){
                    $('.toutiao li:first,.toutiao i:first').toggleClass('lunboact').next().toggleClass('lunboact');
                   },3000);
              },3000)
                
                //搜索引擎
                $search.blur(function(){
                    $box.hide();
                });
                $search.on('input',function(){
                    $.ajax({
                        type:'get',
                        url : 'https://suggest.taobao.com/sug?code=utf-8&q='+$search.val()+'&_ksTS=1551093161921_723&callback=cb',
                        dataType:'jsonp',
                    }).done(function(data){
                        if($search.val()!=''){
                            $box.show();
                            var str='<li>热搜</li>';
                            if(data.result.length>7){
                                data.result.length=7;
                            }
                            $.each(data.result,function(index,value){
                                str+=`<li><a href="#">${data.result[index][0]}</a></li>`;
                            });
                        }else{
                            $box.hide();
                        }   
                    $box.html(str);
                    });
                });
                //登录
                ;(function(){
                  // console.log(new Date());
                  var now = new Date();
                  var hour = now.getHours();
                    if (hour < 6) {
                        $('.time').find('span').html("凌晨好！")
                    } else if (hour < 9) {
                         $('.time').find('span').html("早上好！")
                    } else if (hour < 12) {
                         $('.time').find('span').html("上午好！")
                    } else if (hour < 14) {
                         $('.time').find('span').html("中午好！")
                    } else if (hour < 17) {
                         $('.time').find('span').html("下午好！")
                    } else if (hour < 19) {
                         $('.time').find('span').html("傍晚好！")
                    } else if (hour < 22) {
                         $('.time').find('span').html("晚上好！")
                    } else {
                         $('.time').find('span').html("夜里好！")
                    }
                    if(cookie.getcookie('name')){
                        $('.login_info').find('a:first').html(cookie.getcookie('name'));
                        $('.login_info').show();
                        $('.welcome').hide();
                    }
                    $('.close').on('click',function(){
                       cookie.delcookie('name'); 
                       $('.welcome').show();
                       $('.login_info').hide();                     
                    });
                })();
            });
            $('._footer').load('footer.html', function () {});
        });     
        
    }); 
});