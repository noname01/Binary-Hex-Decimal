Squares = new Meteor.Collection('squares');


function clearSelected(){
	Squares.update({selected: true}, {$set: {selected: false}}, {multi: true});	
}

Meteor.methods({
	updateSelected: function(id){
		Squares.update({_id: id}, {$set: {selected: true}});
		var selected_squares = Squares.find({selected: true});

		if(selected_squares.count() === 2){	
			var num = [];
			var ids = [];
			selected_squares.forEach(function(doc){
				num.push(doc.evaluated);
				ids.push(doc._id);
			});
			if(num[0] === num[1]){
				Squares.update({_id: ids[0]}, {$set: {solved: true}});	
				Squares.update({_id: ids[1]}, {$set: {solved: true}});
			}
			Meteor.setTimeout(clearSelected, 500);
		}

		if(Squares.find({solved: false}).count() === 0){
			//win
			Meteor.call("restart");
		}
	}
});