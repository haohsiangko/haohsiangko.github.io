// JavaScript Document
$(document).ready(function(e) {
	$('div.articlebody>article').find('img').each(function(index, element) {
        $(this).removeAttr('style').addClass('_rwdimg');
    });
	
	$('a.fbmsg').click(function(){
		/*FB.ui({
			app_id:'375064809499438',
			method: 'send',
			link: fbmsg_url,
			redirect_uri:'http://www.agriharvest.tw/close.html',
		});*/ 
		
window.open('http://www.facebook.com/dialog/send?app_id=375064809499438&link='+page_url+'&redirect_uri=http://www.agriharvest.tw/close.html', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,fullscreen=yes');	
	});
	
	
	$('a.facebook').click(function(){
		window.open('http://www.facebook.com/share.php?u='+page_url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');		
		//更新分享數
		
		/*var token = '1798094030405851|8cfa6c8d5f14fd683ff70a1b08c83640';
		var token = '375064809499438|48f2152ccc485870c529b3881c59d9fe';
		$.ajax({
		  	url: 'https://graph.facebook.com/v2.7/',
			dataType: 'jsonp',
			type: 'GET',
			data: {access_token: token, id: page_url },
			success: function(data){
				//data.share.share_count
				$.post('/act.php',{type:'FB_share',id:article_id,num:data.share.share_count},function(){
					
				});
			}
		});*/
	});
	
	$('a.googleplus').click(function(){
		window.open('https://plus.google.com/share?url='+page_url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');		
	});

	$('a.twitter').click(function(){
		window.open('http://twitter.com/home/?status='+page_url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');		
	});
	
	$('a.line').click(function(){
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){ 
			location.href ='http://line.naver.jp/R/msg/text/?'+page_title+page_url;
		}else{
			window.open('https://lineit.line.me/share/ui?url='+page_url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		}
	});
	
	$('a.linkedin').click(function(){ 
		window.open('https://www.linkedin.com/cws/share?url='+page_url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');		
	});
	

	$('a.flipboard').click(function(){ 
		window.open('https://share.flipboard.com/bookmarklet/popout?v=2&url='+page_url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');		
	});
	
	
	//收藏文章,訂閱作者 
	$('a[data-type="BM_article"],a[data-type="BM_author"]').click(function(){
		var func_type = $(this).attr('data-type');
		$.post('act.php',{type:func_type,id:$(this).attr('data-id')},function(data){
			alert(data);	
		});
	});
	
	

});