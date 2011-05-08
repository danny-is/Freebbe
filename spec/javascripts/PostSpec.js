describe("First", function() {

	it("should get the Value of an input text change", function() {
		e = new event();
		e.currentTarget = new input();
		e.currentTarget.val('test');
		doDataEvent(e);
		

  });

	 
  

});