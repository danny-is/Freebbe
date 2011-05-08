/**
 * jQuery.labelify - Display in-textbox hints
 * Stuart Langridge, http://www.kryogenix.org/
 * Released into the public domain
 * Date: 25th June 2008
 * @author Stuart Langridge
 * @version 1.3
 *
 *
 * Basic calling syntax: $("input").labelify();
 * Defaults to taking the in-field label from the field's title attribute
 *
 * You can also pass an options object with the following keys:
 *   text
 *     "title" to get the in-field label from the field's title attribute 
 *      (this is the default)
 *     "label" to get the in-field label from the inner text of the field's label
 *      (note that the label must be attached to the field with for="fieldid")
 *     a function which takes one parameter, the input field, and returns
 *      whatever text it likes
 *
 *   labelledClass
 *     a class that will be applied to the input field when it contains the
 *      label and removed when it contains user input. Defaults to blank.
 *  
 */

$(document).ready(function(){
  $(":text").labelify();
	equalifyContentColumns();
 toggleActions_h4();
 toggleActions_h3();
 toggleActions_actionMenu();
	tabifyColumns();
	minimizePresentations();
	toogleActions_buttonMenu();
});

function minimizePresentations(){

	$('.presentation > h3').css('cursor','pointer');
	$('.presentation .feed').css('display','none');

	$('.presentation > h3').click(function(e){
			var display = $(this).parent().find('.feed').css('display');
		if(display=='none'){
				$(this).parent().find('.feed').css('display','block');
				return false;	
		}
		else{
				$(this).parent().find('.feed').css('display','none');
				return false;
		}
	});
 
$('.presentation > h3:first').click();

}

function toogleActions_buttonMenu(){
	
	
	$('.presentation > h3').hover(
		  function () {
				$(this).find('.buttonMenu').css('display','inline');
		  }, 
		  function() {
		    $(this).find('.buttonMenu').css('display','none');
		  }
		);
	
		$('.presentation .menu').each(function(){
	 		$(this).parent().css('cursor','pointer');
			$(this).parent().click(function(){
				var w= $(this).width();
				$(this).css('position','relative');
			$(this).find('.menu').css('left', '0px');
				$(this).find('.menu').css('top','15px');
		    $(this).find('.menu').fadeIn(100);
				
				return false;
				});
			$(this).parent().hover(
				  function () {
						return false;
				  }, 
				  function() {
				     $(this).find('.menu').fadeOut(200);
				  }
				);		
		});
	}

function toggleActions_actionMenu(){
	$('.actionMenu .menu').each(function(){
 		$(this).parent().css('cursor','pointer');
		$(this).parent().click(function(){
			$(this).css('position','relative');
			var p = $(this).position().top;
			$(this).find('.menu').css('top',-p + 117 + 'px');
	    $(this).find('.menu').fadeIn(100);
			
		});
		$(this).parent().hover(
			  function () {
					return false;
			  }, 
			  function() {
			     $(this).find('.menu').fadeOut(200);
			  }
			);		
	});
}

function toggleActions_h4(){
	$('h4>.tools').each(function(){
 		$(this).parent().css('cursor','pointer');
		$(this).parent().hover(
			  function () {
					var w= $(this).width();
					$(this).css('position','relative');
					$(this).find('.tools').css('left',w + 'px');
					$(this).find('.tools').css('top','-5px');
			    $(this).find('.tools').fadeIn(100);
			  }, 
			  function() {
			     $(this).find('.tools').fadeOut(300);
			  }
			);
		
	});
}
 
function toggleActions_h3(){
	$('h3>.tools').each(function(){
 		$(this).parent().css('cursor','pointer');
		$(this).parent().hover(
			  function () {
					var w= $(this).width();
					$(this).css('position','relative');
					$(this).find('.tools').css('left',150 + 'px');
					$(this).find('.tools').css('top','-5px');
			    $(this).find('.tools').fadeIn(100);
			  }, 
			  function() {
			     $(this).find('.tools').fadeOut(300);
			  }
			);
		
	});
}

function tabifyColumns(){
		//hide all divs
		$('#tabsContents>div').hide();
		//take all ul#tabs
		$('#tabs >li ').each(function(){
			//add onClick
			$(this).click(function(){
				var title = $(this).find('a').attr('title');
				$('#tabsContents>div').hide(100);
				$('#tabsContents #'+ title).show(200);
				$("#tabs>li").removeClass("selected");
				$(this).addClass("selected");
			});
			
		});
		
		$('#tabs >li.selected').click();
	
}


//Make ContentColumns Equal
function equalifyContentColumns(){
//columns are called left, center ,right

	var h1 = $('#leftColumn').height();
	var h2 = $('#centerColumn').height();
	var h3 = $('#rightColumn').height();
	
	var max = Math.max(h1,h2)
	max =  Math.max(max,h3)  
	
	 $('#leftColumn').height(max);
	$('#centerColumn').height(max);
	 $('#rightColumn').height(max);
	
	
}


