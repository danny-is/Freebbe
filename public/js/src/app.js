var app;
var siteId='rodcocr';
var currentSlideId='root';
var lastSlideId='';
var lastSlideName='';


var Slide = Model("slide" , function() {
  this.unique_key = "_id"
})

var Site = Model("site" , function() {
  this.unique_key = "_id"
})

function init() {
	$(":text").labelify();
	$("textarea").labelify();
}

$(document).ready(function() {
	init();

	app = $.sammy('body', function(){ 
		this.use(Sammy.JSON);
		this.use(Sammy.Template, 'erb');
		this.debug = true;
		
		this.get('#/post',function() {
			var context = this;
		});

		this.get('#/' , function() {
			var context = this;
			context.trigger('Slide_Get');
		});

		this.get('#/post/:id' , function() {
			var context = this;
		});

		this.bind('run', function() {
			var context = this;
			app = this;
			this.redirect('#/');
		});
	});

	app.run('#/');

});
