$.sammy('body', function(){ 
	
	this.bind('Site_Get', function(e,data) {
			var context = this;
			//Mock call to get siteId
	});
	
	this.bind('Site_Get_handleSuccess', function(e,data) {
			siteId='rodcocr.com';
			context.trigger('Slide_Get');
	});
	
	this.bind('Site_Get_handleError', function(e,data) {
		alert(app.json(data));
	});
	
});