define(['config'],function(){
    require(['jquery'],function(){  
        $(function(){        //请求页面并加载网页头部的效果
            $('._header').load('header.html', function () {
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
            });
            $('._footer').load('footer.html', function () {});
        });     
        
    }); 
});