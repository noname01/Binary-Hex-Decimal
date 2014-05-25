var WIDTH = 6;
var HEIGHT = 6;

// just for demo, more variations could be added
var DATA = [{num: "3", base: 10},{num: "0011", base: 2},
            {num: "4", base: 10},{num: "0100", base: 2},
            {num: "5", base: 10},{num: "0101", base: 2},
            {num: "6", base: 10},{num: "0110", base: 2},
            {num: "7", base: 10},{num: "0111", base: 2},
            {num: "8", base: 10},{num: "1000", base: 2},
            {num: "9", base: 10},{num: "1001", base: 2},
            {num: "1010", base: 2},{num: "A", base: 16},
            {num: "11", base: 10},{num: "1011", base: 2},
            {num: "1100", base: 2},{num: "C", base: 16},
            {num: "13", base: 10},{num: "1101", base: 2},
            {num: "1110", base: 2},{num: "E", base: 16},
            {num: "1111", base: 2},{num: "F", base: 16},
            {num: "10010", base: 2},{num: "12", base: 16},
            {num: "10101", base: 2},{num: "21", base: 10},
            {num: "11001", base: 2},{num: "25", base: 10},
            {num: "11011", base: 2},{num: "1B", base: 16},
            {num: "29", base: 10},{num: "1D", base: 16}];

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


Meteor.methods({
  initNums: function() {
    DATA = shuffle(DATA);
    Squares.remove({});
    for (var i = 0; i < WIDTH; i++) {
      for (var j = 0; j < HEIGHT; j++) {
        Squares.insert({
          x: i,
          y: j,
          value: DATA[i * HEIGHT + j].num,
          base: DATA[i * HEIGHT + j].base,
          evaluated: parseInt(DATA[i * HEIGHT + j].num, DATA[i * HEIGHT + j].base),
          selected: false,
          solved: false
        });
      };
    };
  },
  restart: function(){
    Meteor.setTimeout(function(){
      Meteor.call("initNums");   
    }, 5000);
  }
});

Meteor.startup(function () {
  // code to run on server at startup
  Meteor.call("initNums");
});