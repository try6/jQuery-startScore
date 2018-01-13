//第一种方法，js方式实现

var num = 2;
var rating = $('.rating')
var item = rating.find('.rating-item');
//点亮
function lightOn(num) {
	item.each(function(index) {
		if (index < num) {
			$(this).css('background-position', '0 0px');

		} else {
			$(this).css('background-position', '0 -25px');
		}
	});
}

//init
lightOn(num);

//事件绑定
item.on('mouseover', function() {
		lightOn($(this).index() + 1);

	}).on('click', function() {
		num = $(this).index() + 1;
		//lightOn(num);
	})
	/*.on('click', function() {
		lightOn($(this).index() - 1);
	})*/
rating.on('mouseout', function() {
	lightOn(num);
})