//import { url } from "inspector";

/* define(['config'],function(){
    require(['jquery'],function(){       //请求页面并加载网页头部的效果
        $('._header').load('header.html', function () {
            var $subnav=$('.nav .subnav');
            var $address=$('.chgadress .module');
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
        });
        $('._footer').load('footer.html', function () {});
        return {
            lunbo:(function(){
                console.log($);
            })(),
        }
    }); 
}); */

define(['config','header'],function(){
    require(['jquery'],function($,lazy){
        require(['jqlazy'],function(){
            return {
                lunbo :(function(){
                    var $banner=$('.banner');
                    var $btns=$('.banner ol li');
                    var $pics=$('.banner ul li');
                    var $num=0;
                    var $autoplay=null;
                    $banner.hover(function(){
                        clearInterval($autoplay);
                    },function(){
                        $autoplay=setInterval(function(){
                            $num++;
                            if($num>$btns.length-1){
                                $num=0;
                            }
                            change();
                        },4000);
                    });
                    $btns.on('click',function(){
                        $num=$(this).index();
                        change();
                    });
    
                    $autoplay=setInterval(function(){
                        $num++;
                        if($num>$btns.length-1){
                            $num=0;
                            }
                        change();
                    },4000);
    
                    function change(){
                        $btns.eq($num).addClass('active').siblings('li').removeClass('active');
                        $pics.eq($num).animate({
                            opacity:1
                        }).siblings('li').animate({opacity:0});
                    };
                })(),
                fixbar:(function(){
                    $(window).on('scroll',function(){
                        var $fixnav=$('#fixnav');
                        var $top=$(window).scrollTop();
                        if($top>150){
                           $fixnav.stop().animate({
                               top:0
                           },30);
                        }else{
                            $fixnav.stop().animate({
                                top : -58
                            },30);
                        }
                    });
                })(),
                productList:(function(){    
                    $.ajax({
                        type: "get",
                        url: "http://10.31.162.11:8088/samsclub/php/productList.php",
                        dataType: "json",
                    }).done(function(data){
                        var strhtml='';
                        var strhtml1='';
                        var $viphot=$('#vip .viphot');
                        $.each(data,function(index,value){
                            if(index<30){
                                strhtml+=`
                                    <div class="item">
                                        <a href="details.html?sid=${value.sid}" title="${value.title}">
                                            <div class="img-border">
                                                <img  class="lazy"  data-original="${value.url}" width="270" height="270" alt="">
                                            </div>
                                            <p><u class="jsd_tag"></u>${value.title}</p>
                                            <span><em>￥</em>${value.price}</span>
                                        </a>
                                        <div class="dashed">
                                            <p class="item-info">${value.subtitle}</p>
                                            <p class="item-info">${value.subtitle}</p>
                                        </div>
                                    </div>
                                `;
                            }
                            
                            function runnum(min,max){
                                return Math.round(Math.random()*(max-min))+min;
                            };
                            if(index>30 && index<runnum(31,34)){
                                strhtml1+=`
                                    <div class="lunbo">
                                        <a href="details.html?sid=${value.url}">
                                            <div class="img-border">
                                                <img class="lazy"  data-original="${value.url}" width="225" height="225" alt="">
                                            </div>
                                            <p>${value.title}</p>
                                            <span>
                                                <em>￥</em>
                                                ${value.price}
                                            </span>
                                        </a>
                                    </div>
                                `;
                            }
                        });
                        $('.product').html(strhtml); //渲染结构
                        $('.viphot .flag').after(strhtml1);
                        $('img.lazy').lazyload({  //懒加载图片   
                            effect:'fadeIn'
                        });
                    });
                })()
            };
        });
            
    });
});
