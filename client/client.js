var WIDTH = 6;
var HEIGHT = 6;

Template.grid.rows = function() {
	var rows = [];

	for (var i = 0; i < HEIGHT; i++) {
		rows.push({
			squares: Squares.find({ y: i })
		});
	};

	return rows;
};

Template.square.selected_class = function () {
	if(Squares.findOne({_id: this._id}).selected)
		return "selected";
	return "";
};

Template.square.solved_class = function () {
	if(Squares.findOne({_id: this._id}).solved)
		return "solved";
	return "unsolved";
};

Template.square.events({
	'click .unsolved': function() {
		//Session.set("selected_square", this._id);
		Meteor.call("updateSelected", this._id);
	}
});

