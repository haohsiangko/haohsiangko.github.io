// JavaScript Document
$(document).ready(function(e) {
	$('#send_search_btn,#send_search_btn2').click(function(){
		var keyword = $(this).prev('input[type=text]').val().trim();
		//var keyword = $('input[name=keyword]').val().trim();
		if( keyword!='' ){
			window.location="/search.php?site_search=Y&keyword="+keyword;
		}else{
			alert('請輸入關鍵字');
		}
	});
	$('#orderby').change(function(){
		var keyword = $('input[name=keyword2]').val().trim();
		window.location="/search.php?site_search=Y&keyword="+keyword+"&orderby="+$(this).val();	
	});
	
	//補發驗證信
	$('#send_verify').on('click',function(){
		$.post('act.php',{type:'send_verify'},function( data ){
			alert(data);
		});
	});
	
	$('select[name=city]').change(function(){
		$.post('act.php',{type:'GET_town',city:$(this).val()},function( data ){
			$('select[name=town]').append(data);
		});
	});
	
	//==== 會員專區 頁籤link =====
	$('#M_article,#M_author,#M_epaper,#M_profile').click(function(){
		var ID = ['M_article','M_author','M_epaper','M_profile'];
		var url = ['/member.php?func=article','/member.php?func=author','/member.php?func=epaper','/member.php'];
		var index = ID.indexOf($(this).attr('id'));
		window.location = url[index]; 
	});
	
});
