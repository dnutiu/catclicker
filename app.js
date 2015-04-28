
var cats = $(".cat");
var buttons = $("button");

function hideAllCats(){
	for (var i=0; i<cats.length; i++){
		$(cats[i]).hide();
	}
}

function bindButtonToCat(idNumber){
	$("#button"+idNumber).click(function(){
		hideAllCats();
		$("#cat"+idNumber).show();
	})
}

function bindCounterToCat(idNumber){
	var cat = "#cat"+idNumber
	$(cat).click(function(){
		var count = $(cat+" > .counter").text();
		count = parseInt(count) + 1;
		$(cat+" > .counter").text(count);
	})
}

for (var i=1; i<=buttons.length; i++){
	bindButtonToCat(i);
}

for (var i=1; i<=cats.length; i++){
	bindCounterToCat(i);
}

hideAllCats();
$("#cat1").show();

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