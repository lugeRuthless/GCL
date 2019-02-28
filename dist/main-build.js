require.config({
    baseUrl:'https://cdnjs.cloudflare.com/ajax/libs/',
    paths:{//引入模块的地址，文件不能添加扩展名
		'jquery':'jquery/1.12.4/jquery',
		'jqlazy':'jquery.lazyload/1.9.0/jquery.lazyload.min',
	},
	shim:{//非AMD规范的JS文件,就需要使用Require中的shim.
		exports:'',//exports 表示输出的对象名
		dep:['jquery']//deps 为数组,表示其依赖的库,
	}
});
define("config", function(){});

define('cookie',[],function(){
	return {
		addcookie: function (key, value, days) {
			var d = new Date();
			d.setDate(d.getDate() + days);
			document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + d;
		},
		getcookie: function (key) {
			var strarr = decodeURIComponent(document.cookie).split('; ');
			for (var i = 0; i < strarr.length; i++) {
				var newarr = strarr[i].split('=');
				if (newarr[0] == key) {
					return newarr[1];
				}
			}
		},
		delcookie:function(key){
			this.addcookie(key,'',-1);
		}
	}
});

define('header',['config','cookie'],function(config,cookie){
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

define('index-module',['config','header'],function(){
    require(['jquery','cookie'],function($,cookie){
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
                        },5000);
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
                    },5000);
    
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
                    var $url='http://10.31.162.11:8088/samsclub/php/'; 
                    $.ajax({
                        type: "get",
                        url: $url+ "productList.php",
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
                                                <img  class="lazy"  data-original="${value.url}"  alt="">
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
                            
                            /* function runnum(min,max){
                                return Math.round(Math.random()*(max-min))+min;
                            }; */
                            if(index>30 && index<34){
                                strhtml1+=`
                                    <div class="lunbo">
                                        <a href="details.html?sid=${value.sid}">
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

/* define(['config'],function(){
    require(['jquery'],function(){
        $('._header').load('header.html', function () {});
        $('._footer').load('footer.html', function () {});
    });
    
});  */
define('details-module',['config','header','cookie'],function(config,header,cookie){ //数据库中提取数据渲染
    //console.log();
    require(['jquery'],function(){
        var $sid=location.search.substring(1).split('=')[1];
        var $url='http://10.31.162.11:8088/samsclub/php/';
        //console.log($sid);
        $.ajax({
            url: $url+"details.php",
            data:{
                sid:$sid
            },
            dataType: 'json',
        }).done(function(data){
            //console.log(data);
            $('.title .title_name').html(data.title);
            $('.title .title_sub').html(data.subtitle);
            $('.price .pricenum').find('strong').html(data.price);
            $('.price .weight').html(data.weight);
            //$('.small-pics li img').attr('src',data.url);
            var $strhtml='';
            var $bightml='';
            //console.log(data.urls.split(','));
             $.each(data.urls.split(','),function(index,value){
                $strhtml+=`<li><img src="${value}" alt=""></li>`;
                $bightml+=`<li><a href="#"><img src="${value}" alt=""></a></li>`;

               // console.log(index,value);
            }); 
            //console.log($strhtml);
            $('.smallimg ul').html($strhtml).find('li:first').addClass('active');
            $('.small-pics').html($bightml).find('li:first').addClass('show');
            if(data.urls.split(',').length<=6){
                $('.up,.down').hide();    //如果小于6按钮消失
            }
        });

        
        class magnifying{   ///放大镜
            constructor(){
                this.$detailimg=$('.detail_left');    
                this.$smallpic=$('.smallpic');
                this.$smallimg=$('.smallimg');
                this.$smallf=$('.smallf');
                this.$bigf=$('.bigf');
                this.$bigpic=$('#bigpic');
                this.$btnup=$('.details .up');
                this.$btndown=$('.details .down');
                this.$num=0;
                this.init();
            }

            init(){
                var that=this;
                
                this.$smallpic.on('mouseenter','li',function(){  //事件委托
                    that.$smallf.show();
                    //console.log($(this).find('img').attr('src'));
                    that.$bigpic.attr('src',$(this).find('img').attr('src'));
                    that.$bigf.stop().animate({
                        opacity:1
                    }).show();
                    that.smallfsize();
                });
                this.$smallpic.on('mouseleave',function(){
                    that.$smallf.hide();
                    that.$bigf.stop().animate({
                        opacity:0
                    }).hide();
                });
                this.$smallpic.on('mousemove',function(ev){
                   //var $l=that.$smallf.position();
                   var $w=ev.pageX-$(this).offset().left-that.$smallf.width()/2;
                   var $h=ev.pageY-$(this).offset().top-that.$smallf.height()/2;
                    if($w<0){
                        $w=0;
                    }else if($w>($(this).width()-that.$smallf.width())){
                        $w=$(this).width()-that.$smallf.width();
                    }
                    if($h<0){
                        $h=0;
                    }else if($h>($(this).height()-that.$smallf.height())){
                        $h=$(this).height()-that.$smallf.height();
                    }
                    // console.log($w,$h);
                  
                    that.$smallf.offset({
                        left:($w+$(this).offset().left),
                        top :($h+$(this).offset().top)
                    });
                    that.$bigpic.offset({
                        left: that.$bigf.offset().left+(-$w*that.$bili),
                        top: that.$bigf.offset().top+(-$h*that.$bili)
                    });
                });
                this.$smallimg.on('mouseenter','li',function(){  
                    $(this).addClass('active').siblings('li').removeClass('active');
                    that.$smallpic.find('li').eq($(this).index()).animate({opacity:1}).addClass('show').siblings('li').removeClass('show');
                });
                this.$btnup.on('click',function(){
                    that.up();
                });
                this.$btndown.on('click',function(){
                    that.down();
                });
            }

            smallfsize(){ //小放大镜尺寸
                this.$smallf.width(this.$smallpic.width()*this.$bigf.width()/this.$bigpic.width());
                this.$smallf.height(this.$smallpic.height()*this.$bigf.height()/this.$bigpic.height());
                this.$bili=this.$bigpic.width()/this.$smallpic.width()
            }
            up(){
              this.$num--;//this.$num=0;
              if(this.$num>=0){
                
                this.$smallimg.find('ul').stop(true).animate({
                    top:-($('.smallimg').find('li').outerHeight(true)*this.$num)
                });
              }else if(this.$num<0){
                  this.$num=0;
              }
            }
            down(){
                this.$num++;
                if(this.$num<($('.smallimg').find('li').size()-5)){
                    this.$smallimg.find('ul').stop(true).animate({
                        top:-($('.smallimg').find('li').outerHeight(true)*this.$num)
                    });
                   // console.log(this.$num);
                }
            }
               
                
        };
        new magnifying();

        //加入购物车
        var $sidarr=[];
        var $numarr=[];
        var $num=$('#num');
       if(cookie.getcookie('cookiesid') && cookie.getcookie('cookienum')){
           $sidarr=cookie.getcookie('cookiesid').split(',');
           $numarr=cookie.getcookie('cookienum').split(',');
       }
       $('.addcart .caaat').on('click',function(){
            $('#alert').show();
            $('#alert .btn_close').on('click',function(){  //弹框
                $('#alert').hide();
            });
            $('#alert .cancel').on('click',function(){//加入
                cart();
            });
            $('#alert .watch').on('click',function(){      //加入
                cart();
            });
           
       });
       function cart() {
           if ($.inArray($sid, $sidarr)==-1) {
               $sidarr.push($sid);
               $numarr.push($num.val());
               cookie.addcookie('cookiesid', $sidarr.toString(), 7);
               cookie.addcookie('cookienum', $numarr.toString(), 7);
           } else {
               var $newnum = parseInt($num.val()) + parseInt($numarr[$.inArray($sid, $sidarr)]);
               $numarr[$.inArray($sid, $sidarr)] = $newnum;
               console.log($numarr);
               cookie.addcookie('cookienum', $numarr.toString(), 7);
           }
       }
       $num.on('keyup',function(){  //表单输入数字
           $(this).val($(this).val().replace(/[^0-9]/g,''));
       });
       $('#addBtn').on('click',function(){  //加减
           var jian=$num.val();
            $num.val(++jian);
       });
       $('#reduceBtn').on('click',function(){
           var jian=$num.val();
           if(jian<=1){
               jian=1;
           }else{
               $num.val(--jian);
           }   
       });
       $('#alert .btn_close,#alert .cancel').on('click',function(){  //弹框
           $('#alert').hide();
       });
    });
});


    
define('cart-module',['config','header'],function(){
    require(['jquery','cookie'],function($,cookie){
        var $url='http://10.31.162.11:8088/samsclub/php/';
            function productlist($sid,$num){
               // console.log(1);
                $.ajax({
                    url:$url+"productlist.php",
                    dataType:'json'
                }).done(function(data){
                    //console.log(data);
                    var cloneProdutlist=$('.cart_list_data:hidden').clone(true,true);
                   // console.log(cloneProdutlist);
                     $.each(data,function(index,value){
                         if($sid==value.sid){
                             value.weight=value.weight.substring(3)
                             var cloneProdutlist=$('.cart_list_data:hidden').clone(true,true);
                             cloneProdutlist.find('.cart_title img').attr('src',value.url);
                             cloneProdutlist.find('.cart_title img').attr('sid',value.sid);
                             cloneProdutlist.find('.cart_title .title_sid').html(value.title);
                             cloneProdutlist.find('.cart_price').html(value.price);
                             cloneProdutlist.find('.cart_weight').html(value.weight);
                             cloneProdutlist.find('.cart_num input').val($num);
                             cloneProdutlist.find('.cart_sum strong').html(($num*value.price).toFixed(2));
                             cloneProdutlist.css('display','block');
                             $('#list').append(cloneProdutlist);
                             priceall();
                        }
                     });
                });
            }

            $('.icon-light').on('click',function(){
               if(!$('.tips').find('p:hidden').length){
                    $('.tips').find('p').hide(200);
               }else{
                    $('.tips').find('p').show(200);
               }
            });
            
           
            if(cookie.getcookie('cookiesid') && cookie.getcookie('cookienum')){
                var $sid=cookie.getcookie('cookiesid').split(',');
                var $num=cookie.getcookie('cookienum').split(','); //获取cookie
                //console.log($sid,$num);
                $.each($sid,function(index,value){
                    productlist($sid[index],$num[index]);
                });
            }
           

            $('.cart_list_header .shou').on('click',function(){
                if($(this).html()=='收起'){
                     $('#list,.cart_list_info').hide(200);
                     $(this).html('展开');
                }else{
                    $('#list,.cart_list_info').show(200);
                    $(this).html('收起');
                }

            });

            empty();
            function empty(){
                if(cookie.getcookie('cookiesid')){
                    $('#cart .empty').hide();
                    $('.cart_list').css('display','block');
                }else{
                    $('#cart .empty').show();
                    $('.cart_list').css('display','none');
                }
            }
            //全选
            $('.checkall').on('change',function(){          
                $('.cart_list_data:visible').find('input:checkbox').prop('checked',$(this).prop('checked'))
                $('.checkall').prop('checked',$(this).prop('checked'));
                priceall();
            });

            var $inputs=$('.cart_list_data:visible').find('input:checkbox');
            $('#list').on('input',$inputs,function(){ //委托给父元素
                if($('.cart_list_data:visible').find('input:checkbox').size()==$('.cart_list_data:visible').find('input:checked').length){
                    $('.checkall').prop('checked',true);
                }else{
                    $('.checkall').prop('checked',false);
                }
                priceall();
            });
            //计算总价
            function priceall(){
               
                var allprice=0;
                var allcount=0;
                var allweight=0;
                $('.cart_list_data:visible').each(function(){
                    if($(this).find('input:checkbox').prop('checked')){
                        allprice+=parseFloat($(this).find('.cart_sum strong').html())
                        allcount+=parseInt($(this).find('.cart_num input').val());
                        allweight+=parseFloat($(this).find('.cart_weight').text())*$(this).find('.cart_num input').val();
                       
                    }
                    //console.log($('.price_all p strong').html(allprice));
                    $('#priceall').html(allprice.toFixed(2));
                    $('.jine').html('￥'+allprice.toFixed(2));
                    $('#countall').html(allcount);
                    //console.log(allweight);
                    $('.weightall').html(allweight.toFixed(2)+' kg');
                });
            }

            $('.cart_num input').on('keyup',function(){  //表单输入数字
                $(this).val($(this).val().replace(/[^0-9]/g,''));
                if($(this).val()>99){
                    $(this).val(99);
                }else if($(this).val()<=1){
                    $(this).val(1);
                }
                $(this).parents('.cart_list_data').find('.cart_sum strong').html(calcprice($(this)));
                priceall();
                changecookie($(this));
            });
            $('.cart_num .addBtn').on('click',function(){
                var addvalue=$(this).parents('.cart_list_data').find('.cart_num input').val();
                addvalue++;
                if(addvalue>99){
    				addvalue=99;
    			}
                $(this).parents('.cart_list_data').find('.cart_num input').val(addvalue);
               // console.log($(this).parents('.cart_list_data').find('.cart_num input').val(addvalue));
                $(this).parents('.cart_list_data').find('.cart_sum strong').html(calcprice($(this)));
                priceall();
                changecookie($(this));
            });
            $('.cart_num .reduceBtn').on('click',function(){
                var addvalue=$(this).parents('.cart_list_data').find('.cart_num input').val();
                addvalue--;
                if(addvalue<=1){
                    addvalue=1;
                }
                $(this).parents('.cart_list_data').find('.cart_num input').val(addvalue);
                $(this).parents('.cart_list_data').find('.cart_sum strong').html(calcprice($(this)));
                priceall(); 
                changecookie($(this));
            });

            function calcprice(obj){//计算单样商品的总价
                var $singleprice=parseFloat(obj.parents('.cart_list_data').find('.cart_price').html());
                var $addvalue=parseInt(obj.parents('.cart_list_data').find('.cart_num input').val());
                return (($singleprice*$addvalue)).toFixed(2);
            };

            //cookie相关操作
            var $sidarr=[];
            var $numarr=[];
            function cookieArray(){
                if(cookie.getcookie('cookiesid') && cookie.getcookie('cookienum')){
                    $sidarr=cookie.getcookie('cookiesid').split(',');
                    $numarr=cookie.getcookie('cookienum').split(',');
                }
            }

            function changecookie(obj){  //存储新的数量
                cookieArray();
                var $sid=obj.parents('.cart_list_data').find('.cart_title img').attr('sid');
                $numarr[$.inArray($sid,$sidarr)]=obj.parents('.cart_list_data').find('.cart_num input').val();
                cookie.addcookie('cookienum',$numarr.toString(),7);
            }

            //删除操作
               
            $('#list').on('click','.del_rows',function(){ 
               
                var $that=$(this);
               // console.log($(this).parents('.cart_list_data').html());
                //console.log($that.html());
                $('.mask_cart').show();
                $('.pop-close,.btn_cancel').on('click',function(){
                    $('.mask_cart').hide();
                });
                $('.btn_ok').on('click',function(){
                    console.log($sidarr);
                    //console.log($sidarr)
                    console.log($that.parents('.cart_list_data').html()); 
                    console.log($sidarr,$sid);
                    deletecookie($that.parents('.cart_list_data').find('.cart_title img').attr('sid'));
                    $that.parents('.cart_list_data').remove();
                   // deletecookie($that.parents('.cart_list_data').find('.cart_title img').attr('sid'));
                    $('.mask_cart').hide();
                    priceall();
                    empty();
                });
            });

            $('.delete_list').on('click',function(){
                $('.mask_cart').show();
                $('.pop-close,.btn_cancel').on('click',function(){
                    $('.mask_cart').hide();
                });
                $('.btn_ok').on('click',function(){
                    $('.cart_list_data:visible').each(function(index,element){
                        if($(element).find('input:checkbox').is(':checked')){
                            $(this).remove();
                            deletecookie($(this).find('.cart_title img').attr('sid'));
                        }
                    });
                    priceall();
                    empty();
                    $('.mask_cart').hide();
                   
                   
                    
                });
            });
            
            
            function deletecookie($sid){
                cookieArray();
                var $index=$.inArray($sid,$sidarr);
                 
                $sidarr.splice($index,1);
                $numarr.splice($index,1);
                cookie.addcookie('cookiesid',$sidarr.toString(),7)
                cookie.addcookie('cookienum',$numarr.toString(),7);
            };
            
    });
});
define('login',['config','cookie'],function(config,cookie){
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
define('register',['config'],function(){
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
require(['index-module','details-module','cart-module','login','register']);
define("main", function(){});

