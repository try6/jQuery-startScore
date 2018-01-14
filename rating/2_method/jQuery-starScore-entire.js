/*全局变量使用闭包解决，防止全局变量过多导致重名*/
var rating = (function() {

		//点亮,提取出，作为公共部分，增加参数
		function lightOn(item, num) {
			item.each(function(index) {
				if (index >= num) {
					$(this).css('background-position', '0 -25px');

				} else {
					$(this).css('background-position', '0 0');
				}
			});
		};

		var init = function(el, num) { //el代表评分类名，num代表默认点亮星星数
			//参数复用问题

			var rating = $(el);
			var item = rating.find('.rating-item');



			//初始化星星
			lightOn(item, num);

			//事件绑定,将子元素的事件委托给父元素处理，就不需要给每个元素进行事件绑定
			rating.on('mouseover', '.rating-item', function() {
				lightOn(item, $(this).index() + 1);

			}).on('click', '.rating-item', function() {
				num = $(this).index() + 1;
				//lightOn(num);
			}).on('mouseout', function() {
				lightOn(item, num);
			})
		}
		return {
			init: init
		};


	})() //自我执行匿名函数

rating.init('.rating1', 2);

