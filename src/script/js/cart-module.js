define(['config','header'],function(){
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