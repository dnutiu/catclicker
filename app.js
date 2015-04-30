var model = {
	currentCat: null,
	currentCatIndex: 0,
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
	setCurrentCat: function(cat, i) {
		model.currentCat = cat;
		model.currentCatIndex = i;
	},
	getCats: function() {
		return model.cats;
	},
	getCatIndex: function() {
		return model.currentCatIndex;
	},
	adminGetData: function () {
		//get data
		var name = $('#a-cat-name').val();
		var image = $('#a-cat-image').val();
		var clicks = $('#a-cat-clicks').val();
		$('.admin_form').trigger("reset");
		$('#admin-panel').toggle('display');
		this.adminChangeData(name, image, clicks);
	},
	adminChangeData: function(name, image, clicks) {
		var index = this.getCatIndex();

		if (image == "") {
			image = model.currentCat.catImg;
		} 
		if (clicks == "") {
			clicks = model.currentCat.catCounter;
		}
		if (name == "") {
			name = model.currentCat.catName;
		}

		var cat = {
			catName: name,
			catCounter: clicks,
			catImg: image
		}

		this.setCurrentCat(cat, index);
		this.getCats()[index] = cat;

		view.drawList();
		view.drawDisplayArea();
	},
	bindClicks: function() {

		$('#toggle-admin').click(function () {
			$('#admin-panel').toggle('display');	
		});

		$('#a-submit-btn').click(function(e) {
			e.preventDefault();

			var index = $('#cat-list li').attr('id');
			controller.adminGetData();
			view.drawDisplayArea();
		});

		$('#cat-image').click(function() {
			model.currentCat.catCounter++;
			view.updateCounter();
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

		$('#cat-list').html(' ');
		$('#cat-list').append("<ul id=\"cat-list-display\"></ul>");
		for(var i = 0; i < cats.length; i++) {
			$('#cat-list-display').append(
				"<li id=" + i + ">" + cats[i].catName + "</li>"
				);
		}

		$('#cat-list li').click(function() {
			var index = $(this).attr('id');
			controller.setCurrentCat(cats[index], index);
			view.drawDisplayArea();
		});
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