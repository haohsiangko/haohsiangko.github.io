//J add start ====
var register_email='';
var register_pwd='';
var register_nickname='';
var login_func = '';
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = '//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.8&appId=375064809499438';
	fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));

(function() {
   var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
   po.src = 'https://apis.google.com/js/client.js?onload=onLoadCallback';
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
 })();

//J add end ====


$(function(){
	//J add START======
	var login_type = '';
	//J add END======
	var timeoutgo=null;
	function wdprcheck(){
        var wdpr=window.devicePixelRatio;
        if(wdpr>=1.1 && wdpr<1.5){
            $('html').addClass('wdpr1_1').removeClass('wdpr1_5');
        }else if(wdpr>=1.5){
            $('html').removeClass('wdpr1_1').addClass('wdpr1_5');
        }else{
            $('html').removeClass('wdpr1_1').removeClass('wdpr1_5');
        }
    }	
    var $site_menuhidewidth=1210;
    var $smallmode_width=1210;
    var $site_mdside=991;
    //寬螢幕時的搜尋視窗呼叫與關閉
    $(".searchzoneshow_btn").click(function(){
        $("#searchzone").addClass("_show");
    })

	$('div.footerbox').find('a[title="會員登入"]').addClass('singupbox_btn');
	$('div.footerbox').find('a[title="會員登出"]').addClass('logout_btn');
	$('body').append('<div id="register_info"></div>');
	//搜尋列動畫結束後focus於搜尋框
    $("#searchzone").on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',function(){
        if($(this).hasClass("_show")){
            $("input.searchinput").focus();
        }
    });
	$('#register_info').load('register.html',function(){
		//登入、註冊、忘記密碼按鈕呼叫與關閉展示
		$(".regboxshow_btn").click(function(){
			$("._fixedtable").removeClass("_show");
			$("#regbox").addClass("_show");
		})
		$(".singupbox_btn").click(function(){
			$("._fixedtable").removeClass("_show");
			$("#singupbox").addClass("_show");
		})
		$(".forgetbox_btn").click(function(){
			$("._fixedtable").removeClass("_show");
			$("#forgetbox").addClass("_show");
		})
		$(".tosbox_btn").click(function(){
			//J modify start  ====
			//var pass = true;
			if($(this).hasClass('facebook')){
				login_type = 'facebook';
			}else if($(this).hasClass('google')){
				login_type = 'google';
			}else if($(this).hasClass('_full')){
				login_type = 'harvest';
			}
			
			if( login_type!=''){
				switch( login_type ){
					case 'facebook':
					case 'google':
						$.post('act.php',{type:'privacy'},function( data ){
							$('#privacy_context').append(data);
							$("._fixedtable").removeClass("_show");
							$("#tosbox").addClass("_show");								
						});
						
						break;
					
					case 'harvest':
						//檢查表單		
						register_email = $('#register_email').val();
						register_pwd = $('#register_pw1').val();
						register_nickname = $('#register_nickname').val();
						
						var check_name = ['register_nickname','register_email','register_pw1','register_pw2'];
						var show_name = ['暱稱','電子信箱','密碼','再次輸入密碼'];
						var txt=[];
						var j = 0;
						for( i=0; i < check_name.length; i++){
							if( $('#'+check_name[i]).val().trim()==''){
								txt[j] = show_name[i];
								j++;	
							}
						}
						if( txt.length > 0 ){
							alert( '您的'+txt.join("、")+'尚未填寫');
							return false;
						}
												
						//檢查email格式
						if(!validateEmail(register_email)){
							alert('輸入的電子信箱格式不正確');
							return false;
						}
						
						if(!checkPWD(register_pwd)){
							alert('密碼設定只能輸入英文或數字');
							return false;
						}
						
						if( $('#register_pw1').val()!= $('#register_pw2').val() ){
							alert('兩次輸入的密碼不同');
							return false;
						}
						//檢查email是否存在
						$.post('act.php',{type:'check_email',email:register_email},function(data){
							if( data=='ok' ){
								$.post('act.php',{type:'privacy'},function( data ){
									$('#privacy_context').append(data);
									$("._fixedtable").removeClass("_show");
									$("#tosbox").addClass("_show");								
								});
							}else{
								alert('這個電子信箱已存在,請直接登入');
								return false;	
							}
						});
						break;
				}
			}else{
				alert('請重新選擇帳號註冊方式');		
			}
			//J modify end  ====
			
		})
		
		$(".regscreenbox_btn").click(function(){
			//J增加條款確認勾選判別START===
			if( $('#checkbox_for_join_member').prop('checked') ){
				login_func = 'register';
				switch( login_type ){
					case 'facebook':
						FB_login();
						break;
					case 'google':
						loginWithGoogle();
						break;
					case 'harvest':
						harvest_login(register_email,register_pwd,register_nickname,'add');
						break;
					default:
						alert('請重新操作!');
						break;
				}
				
			}else{
				alert('請先詳閱服務條款並勾選同意服務條款!');
			}
			//J增加條款確認勾選判別END===
			//$("._fixedtable").removeClass("_show");
			//$("#regscreenbox").addClass("_show");
		})
		$(".changepwbox_btn").click(function(){ 
			$("._fixedtable").removeClass("_show");
			$("#changepwbox").addClass("_show");
		})
		
		$(".changepicbox_btn").click(function(){ 
			$("._fixedtable").removeClass("_show");
			$("#changepicbox").addClass("_show");
		})
		
		$(".alertbox_btn").click(function(){
			//J add start===
			$.post('act.php',{type:'order_epaper'},function(data){
				if( data=='login' ){
					$("._fixedtable").removeClass("_show");
					$("#alertbox").addClass("_show");
				}else if( data=='verify' ){
					$("._fixedtable").removeClass("_show");
					$("#verifybox").addClass("_show");
				}else{
					alert(data);
				}
			});
			//J add end===
			
		})
		$("._closepopzone").click(function(){
			if(($(this).parent().parent().attr('id'))=='regscreenbox'){
				$(this).parent().parent().removeClass("_show");
				location.reload();
			}else{
				$(this).parent().parent().removeClass("_show");
			}
		})
		
		//J's add start=======
		//忘記密碼
		$('#send_pwd').on('click',function(){
			if( $('#pwd_to_email').val()!='' ){
				$.post('act.php',{type:'GET_pwd',email:$('#pwd_to_email').val()},function( data ){
					alert(data);
				});
			}else{
				alert('請輸入email');
			}
		});
		 
		//更新密碼
		$('#modify_pwd').click(function(){
			var pwd = $('#new_pwd1').val();
			if(!checkPWD(pwd)){
				alert('密碼設定只能輸入英文或數字');
				return false;
			}
			
			if( $('#new_pwd1').val()!= $('#new_pwd2').val() ){
				alert('兩次輸入的密碼不同');
				return false;
			}	
			
			$.post('act.php',{type:'modify_pwd',pwd:pwd},function(data){
				alert(data);	
			});
			
		});
		
		
		//取消作者訂閱
		$('a[data-type="del_BM_author"]').click(function(){
			var _this = $(this);
			if( confirm('確定取消訂閱此作者?') ){
				$.post('act.php',{type:'del_BM_author',id:$(this).attr('data-id')},function(data){
					if( data=='ok' ){
						_this.closest('div.item').remove();	
					}else{
						alert(data);
					}
				});
			}
		});
		
		$('.logout_btn').click(function(){
			$.post('/act.php',{type:'logout'},function(){
				alert("帳號已登出");
				location.reload();	
			});
		});
		
		$('.go_member').click(function(){
			window.location = "/member.php";
		});
		//3種登入
		$('#FB_login').click(function(){
			login_func = 'login';
			FB_login();
		});
		$('#Google_login').click(function(){
			login_func = 'login';
			loginWithGoogle();
		});
		$('#Harvest_login').click(function(){
			if( $('#login_email').val()!='' && $('#login_pwd').val()!=''){
				harvest_login($('#login_email').val(),$('#login_pwd').val(),'','login');
			}else{
				alert('請輸入帳號及密碼'); 
			}
		});
		

		//聯絡我們
		$('#contactUs_btn').click(function(){
			var check_input = ['user','email','context','check_code'];
			var check_name = ['姓名','E-Mail','您的意見','驗證碼'];
			var txt = [];
			var j = 0;
			for( var i=0; i<check_input.length; i++ ){
				if( $('#'+check_input[i]).val().trim()=='' ){
					txt[j] = check_name[i];
					j++;
				}
			}
			if( txt.length > 0 ){
				alert(txt.join("、")+'尚未填寫');
				return false;
			}

			if(!validateEmail($('#email').val())){
				alert('輸入的E-Mail格式不正確');
				return false;
			}
			
			$.post('/act.php?type=check_code&code='+$('#check_code').val(),function(data){
				if(data=='no'){
					alert('輸入的驗證碼不正確');
					return false;
				}else{
					document.contactUs_form.submit();	
				}
			});
		});		
		$('#site-title').click(function(){
			window.location = "/index.php";	
		});
		//J's add end=======		
		
	});
    

    
    //窄螢幕時的選單呼叫
    $(".menuicon").click(function(){
        $(this).toggleClass("select");
        if($(this).hasClass("select")){
            $("#site-nav").slideDown(500,function(){
                sitenavCheck();
            });
        }else{
            $("#site-nav").slideUp(500,function(){
                $("#site-nav").removeAttr("style");
                $("body").removeClass("_ov-h");
            });
        }
    })
    //reset選單
    function resetsitenavshow(){
        $("#site-nav").removeAttr("style");
        $(".menuicon").removeClass("select");
        $("body").removeClass("_ov-h");
    }
    //當視窗高度短於選單時的處理
    function sitenavCheck(){
        var winHeight=$(window).height();
        var sitenavHeight=$("#site-nav").outerHeight(true);
        var topzoneHeight=$("#topzone").outerHeight(true);
        var siteheaderHeight=sitenavHeight+topzoneHeight;
        /*170106 追加條件，只有在主選單被打開的時候才會隱藏body scroll*/
		if(siteheaderHeight>winHeight && $("#site-nav").css("display")=="block"){
            $("#site-nav").height(winHeight-topzoneHeight);
            $("body").addClass("_ov-h");
        }else{
            //$("#site-nav").height("auto");
            $("body").removeClass("_ov-h");
        }
    }
    function checkwinscroll(){
        var nowWinScroll=$(window).scrollTop();
        if(nowWinScroll>120 && $('body').innerWidth()>$smallmode_width){
            $("#site-header").addClass('smallmode');
        }else{
            $("#site-header").removeClass('smallmode');
        }
    }

    

   //頁簽切換功能
   $(".listbox >.js-list01>.tagbtn").click(function(){
        var getid="#"+$(this).attr("data-id");
        $(".listbox >.js-list01>.tagbtn,.listbox .articlelist").removeClass("select");
        $("#listgroup>.listbox ._hide,.listbox ._col3 ._hide,.listbox ._fullsize ._hide").removeAttr("style");
        $(getid).addClass("select");
        $(this).addClass("select");
   })
   $(".jsmore").click(function(){
        $("#listgroup>.listbox ._hide").css("display","flex");
        $(".listbox ._col3 ._hide,.listbox ._fullsize ._hide,.authorslist .item._hide").css("display","block");
   })
   
   $(".hotarticlelist>.tagbtnlist>.tagbtn").click(function(){
        var getid="#"+$(this).attr("data-id");
        $(".hotarticlelist .hotarticlebox,.hotarticlelist>.tagbtnlist>.tagbtn").removeClass("select");
        $(getid).addClass("select");
        $(this).addClass("select");
   })
   $(".jsmore2").click(function(){
        $(".topicslist ._bhide").removeClass("_bhide");
   })

   $(".listbox >.js-list01>.tagbtn").eq(0).click();
   $(".hotarticlelist>.tagbtnlist>.tagbtn").eq(0).click();

   //了解更多icon動畫
    var moreiconplaying=false;
    $(".morebtn2").on("touchstart mouseenter", function () {
        var target=$(this).children('._svgbox').children('.svgchild').children('svg')
        if(!moreiconplaying){
            moreiconplaying=true;
            TweenLite.to($(target).children("#m_re1"), 0, {attr:{'transform':'matrix(1, 0, 0, 1, 0, 0)'}, ease: Power1.easeIn}),
            TweenLite.to($(target).children("#m_re2"), 0, {attr:{'transform':'matrix(1, 0, 0, 1, 0, 0)'}, ease: Power1.easeIn}),
            TweenLite.to($(target).children("#m_re3"), 0, {attr:{'transform':'matrix(1, 0, 0, 1, 0, 0)'}, ease: Power1.easeIn}),
            TweenLite.to($(target).children("#m_re4"), 0, {attr:{'transform':'matrix(1, 0, 0, 0, 0, 0)'}, ease: Power1.easeIn}),
            TweenLite.to($(target).children("#m_po1"), 0, {attr:{'transform':'rotate(0,112.5,112.5)'}, ease: Power1.easeIn})
            TweenLite.to($(target).children("#m_re1"), 0.5, {attr:{'transform':'matrix(0, 0, 0, 1, 0, 0)'}, ease: Power1.easeIn}),
            TweenLite.to($(target).children("#m_re2"), 0.5, {attr:{'transform':'matrix(1, 0, 0, 1, -275, 0)'}, ease: Power1.easeIn}),
            TweenLite.to($(target).children("#m_re3"), 0.5, {attr:{'transform':'matrix(1, 0, 0, 1, 0, 275)'}, ease: Power1.easeIn}),
            TweenLite.to($(target).children("#m_re4"), 0.5, {attr:{'transform':'matrix(1, 0, 0, 1, 0, 0)'}, ease: Power1.easeIn}),
            TweenLite.to($(target).children("#m_po1"), 0.5, {attr:{'transform':'rotate(90,112.5,112.5)'}, ease: Power1.easeIn, onComplete:function(){moreiconplaying=false}})
        }
    });
   
    //js--feature-inforBtn
    $(".js--feature-inforBtn").click(function(){
        if($(".js--feature-infor").css("display")=="none"){
            $(this).children(".js--img").addClass("close");
        }else{
            $(this).children(".js--img").removeClass("close");
        }
        $(".js--feature-infor").slideToggle();
    })   

    //浮動選單內容高於視窗高度時處理
    function boxscrollcheck(){
        var winHeight=$(window).height();
        var targetHeight=$("._fixedtable._show .boxscroll").height();
        if(targetHeight>winHeight){
            $("._fixedtable._show .boxscroll").addClass("_over");
            $("body").addClass("fixedhide");
        }else{
            $("._fixedtable._show .boxscroll").removeClass("_over");
            $("body").removeClass("fixedhide");
        }
    }

    $(window).scroll(function(){
        $(window).resize();
    })
    $(window).resize(function(){
        var siteheaderHeight=$("#site-header").outerHeight(true);
        var topzoneHeight=$("#topzone").outerHeight(true);
        var sitenavHeight=$("#site-nav").outerHeight(true);
        boxscrollcheck();
        sitenavCheck();
		wdprcheck();
        clearTimeout(timeoutgo);
            timeoutgo = setTimeout(function(){ 
                if($('body').innerWidth()>=$site_menuhidewidth){
                    //當視窗寬度恢復到桌面時，reset選單功能
                    resetsitenavshow();
                    //當視窗寬度恢復到桌面時，檢查主選單是否要採用縮小模式
                    checkwinscroll();
                    //當視窗寬度恢復到桌面時bodypaddingtop的數值
                    //console.log("siteheaderHeight:"+siteheaderHeight+";sitenavHeight:"+sitenavHeight+";#site-header-height:"+$("#site-header").height());
                    $('body').css('padding-top',($("#site-header").height()+sitenavHeight));
                }else if($('body').innerWidth()<$site_menuhidewidth){
                    //console.log("B");
                    //當視窗寬度為窄版時bodypaddingtop的數值
                    $('body').css('padding-top',siteheaderHeight);
                    $("#site-header").removeClass('smallmode');
                }
            }, 200);
        
    })
    $(window).resize();
})

//J's function start=======
function FB_login(){
	FB.login(function (response) {
		FB.getLoginStatus(function (response) {
			if (response.status === 'connected') {  // 
				var email = "";
				var uid = response.authResponse.userID; // 取得 UID
				var accessToken = response.authResponse.accessToken; // 取得 accessToken
				var signedRequest = response.authResponse.email;
				FB.api('/me',{fields: 'email,name'}, function(response) {
					email = response.email; 
					if( email!='' ){
						$.post('act.php',{type:'FB',func:login_func,email:email,nickname:response.name},function( data ){
							if(data=='login'){
								location.reload();
							}else if( data=='register' ){
								alert('找不到您的資料，請先註冊會員!');
							}else{
								$("._fixedtable").removeClass("_show");
								$("#regscreenbox").addClass("_show");
							}
						});

					}else{
						alert('無法取得您的資料,請重新操作!');
					}
				});	
			} else if (response.status === 'not_authorized') {  // 帳號沒有連結到 Facebook 程式
				
			} else {    // 帳號沒有登入
			}
		});
	}, { scope: "public_profile,email" });
} 

loginWithGoogle = function(){
	var myParams = {
		'clientid' : '975695175404-nq2evkc3flcor305f9lpvue4ih304uje.apps.googleusercontent.com',
		'cookiepolicy' : 'single_host_origin',
		'callback' : 'loginCallback',
		'approvalprompt':'force',
		'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
	};
	gapi.auth.signIn(myParams);
}


function loginCallback(result){
	if(result['status']['signed_in']){
		var request = gapi.client.plus.people.get({
				'userId': 'me'
		});
		request.execute(function (resp){
			var email = '';
			var nickname = '';
			if(resp['emails']){
				for(i = 0; i < resp['emails'].length; i++){
					if(resp['emails'][i]['type'] == 'account'){
						email = resp['emails'][i]['value'];
					}
				}
			}
			nickname = resp['displayName'];
			$.post('/act.php?type=Google&func='+login_func+'&nickname='+nickname+'&email='+email,function(data){
				if( data=='login' ){
					location.reload();
				}else if( data=='register' ){
					alert('找不到您的資料，請先註冊會員!');
				}else{
					$("._fixedtable").removeClass("_show");
					$("#regscreenbox").addClass("_show");
				}
			});
		});
	}
}
function onLoadCallback(){
	gapi.client.setApiKey('AIzaSyBY_aWLeKcaOUKwRIV8gGqEpWXYcBqScw4');
	gapi.client.load('plus', 'v1',function(){});
}



function harvest_login(email,pwd,nickname,func){
	$.post('/act.php?type=harvest&func='+func+'&email='+email+'&pwd='+pwd+'&nickname='+nickname,function(data){
		if( data=='login' ){
			location.reload();
		}else if(data=='new'){
			$("._fixedtable").removeClass("_show");
			$("#regscreenbox").addClass("_show");
		}else{
			if( data !='' )  alert(data);
		}
	});
}

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function checkPWD(str){
	var pattern = /^[a-zA-Z0-9]+$/;
	if (pattern.test(str)){
		return true;
	}else{
		return false;
	}
}

//J's function end=======

//Jiau add start====
//關閉酒類警語
$(function(){
	$('#Alcohol_Warning_close').click(function(){
		$('#Alcohol_Warning').hide();
	});	
});
//Jiau add end ===