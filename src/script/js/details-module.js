/* define(['config'],function(){
    require(['jquery'],function(){
        $('._header').load('header.html', function () {});
        $('._footer').load('footer.html', function () {});
    });
    
});  */
define(['config','header','cookie'],function(config,header,cookie){ //数据库中提取数据渲染
    console.log();
    require(['jquery'],function(){
        var $sid=location.search.substring(1).split('=')[1];
        //console.log($sid);
        $.ajax({
            url: 'http://10.31.162.11:8088/samsclub/php/details.php',
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
                        left: 800+(-$w*that.$bili),
                        top: 214+(-$h*that.$bili)
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
                    console.log(this.$num);
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
           if($.inArray($sid,$sidarr)){
             $sidarr.push($sid);
             $numarr.push($num.val());
             cookie.addcookie('cookiesid',$sidarr.toString(),7);
             cookie.addcookie('cookienum',$numarr.toString(),7);
           }else{
               var $newnum=parseInt($num.val())+parseInt($numarr[$.inArray($sid,$sidarr)]);
               $numarr[$.inArray($sid,$sidarr)]=$newnum;
               cookie.addcookie('cookienum',$numarr.toString(),7);
           }
           $('#alert').show();
       });
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


    