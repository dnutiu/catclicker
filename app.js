var model = {
	currentCat: null,
	cats: [
		{
			catName: "Luca",
			catCounter: 0,
			catImg: "cat_picture1.jpg"
		},
		{
			catName: "Tutu",
			catCounter: 0,
			catImg: "cat_picture2.jpeg"
		},
		{
			catName: "Tommy",
			catCounter: 0,
			catImg: "cat_picture3.jpeg"
		},
		{
			catName: "Mita",
			catCounter: 0,
			catImg: "cat_picture4.jpeg"
		},
		{
			catName: "France",
			catCounter: 0,
			catImg: "cat_picture5.jpeg"
		},
	]
};

var controller = {
	init: function() {
		model.currentCat = model.cats[0];
		view.init();
	},
	getCurrentCat: function() {
		return model.currentCat;
	},
	getCats: function() {
		return model.cats;
	},
	adminGetData: function () {
		console.log('test');
		//get data
		//clear form
		//hide form
		//call this.adminChangeData();
	},
	adminChangeData: function(name, image, clicks) {
		//update modal
		//set current cat?
	},
	bindClicks: function() {
		$('#cat-image').click(function() {
			model.currentCat.catCounter++;
			view.updateCounter();
		});

		$('#cat-list li').click(function() {
			var index = $(this).attr('id');
			model.currentCat = model.cats[index];
			view.drawDisplayArea();
		});

		$('#toggle-admin').click(function () {
			$('#admin-panel').toggle('display');	
		});

		$('#a-submit-btn').click(function(e) {
			e.preventDefault();
			controller.adminGetData();
			view.drawDisplayArea();
		});
	}
};

var view = {
	init: function() {
		this.drawList();
		this.drawDisplayArea();
		controller.bindClicks();
	},
	drawList: function() {
		var cats = controller.getCats();
		$('#cat-list').append("<ul id=\"cat-list-display\"></ul>");
		for(var i = 0; i < cats.length; i++) {
			$('#cat-list-display').append(
				"<li id="+i+">" + cats[i].catName + "</li>"
				);
		}
	},
	drawDisplayArea: function() {
		var cat = controller.getCurrentCat();

		$('#cat-name').text(' ');
		$('#cat-counter').text(' ');
		
		$('#cat-name').append(cat.catName);
		$('#cat-counter').append(cat.catCounter)
		$('#cat-image').attr('src', cat.catImg);
	},
	updateCounter: function() {
		var cat = controller.getCurrentCat();
		$('#cat-counter').html(' ');
		$('#cat-counter').append(cat.catCounter)
	}
};
controller.init();