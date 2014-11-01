$(".tabs").children().each(function( index ) {
  if (index == 0) {
  	var tabContent = String(this);
  	$(tabContent).show()
  }
  else {
  	var tabContent = String(this);
  	$(tabContent).hide()
  }
});

$( document ).ready(function() {
    console.log( "ready!" );
});

$( 'a[href="#top5"]' ).click(function() {
	$("#top5").show();
	$("#menu").hide();
	console.log("top5");
});

$( 'a[href="#menu"]' ).click(function() {
	$("#menu").show();
	$("#top5").hide();
	console.log("menu");
});

console.log("here");