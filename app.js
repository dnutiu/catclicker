var model = {
	currentCat: null,
	currentCatIndex: 0,
	cats: [
		{
			name: "Luca",
			clicks: 0,
			image: "cat_picture1.jpg"
		},
		{
			name: "Tutu",
			clicks: 0,
			image: "cat_picture2.jpeg"
		},
		{
			name: "Tommy",
			clicks: 0,
			image: "cat_picture3.jpeg"
		},
		{
			name: "Mita",
			clicks: 0,
			image: "cat_picture4.jpeg"
		},
		{
			name: "France",
			clicks: 0,
			image: "cat_picture5.jpeg"
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
	getCurrentCatIndex: function() {
		return model.currentCatIndex;
	},
	getCats: function() {
		return model.cats;
	},
	incrementClicks: function() {
		model.currentCat.clicks++
	},
	adminChangeData: function() {
		var index = this.getCurrentCatIndex();
		var name = $('#a-cat-name').val();
		var image = $('#a-cat-image').val();
		var clicks = $('#a-cat-clicks').val();

		if (image == "") {
			image = model.currentCat.image;
		} 
		if (clicks == "") {
			clicks = model.currentCat.clicks;
		}
		if (name == "") {
			name = model.currentCat.name;
		}

		var cat = {
			name: name,
			clicks: clicks,
			image: image
		}

		this.setCurrentCat(cat, index);
		this.getCats()[index] = cat;

		view.drawListArea();
		view.drawDisplayArea();

		$('#admin-panel').toggle('display');
	}
};

var view = {
	init: function() {
		this.drawListArea();
		this.drawDisplayArea();
		this.drawAdminArea();
		this.updateAdminArea();

		$('#cat-image').click(function() {
			controller.incrementClicks();
			view.updateCounter();
		});
	},
	drawListArea: function() {
		var cats = controller.getCats();

		$('#cat-list').html(' ');
		$('#cat-list').append("<ul id=\"cat-list-display\"></ul>");
		for(var i = 0; i < cats.length; i++) {
			$('#cat-list-display').append(
				"<li id=" + i + ">" + cats[i].name + "</li>"
				);
		}

		$('#cat-list li').click(function() {
			var index = $(this).attr('id');
			controller.setCurrentCat(cats[index], index);
			view.drawDisplayArea();
			view.updateAdminArea();
		});
	},
	drawDisplayArea: function() {
		var cat = controller.getCurrentCat();

		$('#cat-name').text(' ');
		$('#cat-counter').text(' ');
		
		$('#cat-name').append(cat.name);
		$('#cat-counter').append(cat.clicks)
		$('#cat-image').attr('src', cat.image);

	},
	drawAdminArea: function() {
		$('#toggle-admin').click(function () {
			$('#admin-panel').toggle('display');	
		});

		$('#a-submit-btn').click(function(e) {
			e.preventDefault();

			var index = $('#cat-list li').attr('id');
			controller.adminChangeData();
			view.drawDisplayArea();
		});

		$('#a-cancel-btn').click(function(e) {
			e.preventDefault();
			view.updateAdminArea();
		});
	},
	updateAdminArea: function() {
		var cat = controller.getCurrentCat();

		var name = $('#a-cat-name').val(cat.name);
		var image = $('#a-cat-image').val(cat.image);
		var clicks = $('#a-cat-clicks').val(cat.clicks);
	},
	updateCounter: function() {
		var cat = controller.getCurrentCat();
		var clicks = $('#a-cat-clicks').val(cat.clicks);
		
		$('#cat-counter').html(' ');
		$('#cat-counter').append(cat.clicks)
	}
};
controller.init();