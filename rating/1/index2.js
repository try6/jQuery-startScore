/*全局变量使用闭包解决，防止全局变量过多导致重名*/
/*var rating = (function() {

		//点亮,提取出，作为公共部分，增加参数
		function lightOn(item, num) {
			item.each(function(index) {
				if (index < num) {
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
rating.init('.rating2', 3);*/



var rating = (function() {
	//继承
	var extend = function(subClass, superClass) {
		var F = function() {};
		F.prototype = superClass.prototype;
		subClass.prototype = new F();
		subClass.prototype.constructor = subClass;
	}



	//抽象类点亮
	var Light = function(el, options) {
		this.el = $(el);
		this.item = this.el.find('.rating-item');
		this.opts = options;
		this.add = 0;
		this.selectEvent = "mouseover";
	};
	Light.prototype.init = function() {
		this.lightOn(this.opts.num);
		if (!this.opts.readOnly) {
			this.bindEvent();
		}

	};
	Light.prototype.lightOn = function(num) {
		num = parseInt(num); //转化为整型
		this.item.each(function(index) {
			if (index > num) {
				$(this).css('background-position', '0 -25px');

			} else {
				$(this).css('background-position', '0 0');
			}
		});
	};
	//点击事件
	Light.prototype.bindEvent = function() {
		//事件绑定
		var self = this;
		var itemLength = this.item.length;
		//var _num = $(this).index() + 1
		this.el.on(self.selectEvent, '.rating-item', function(e) {
			//this.lightOn($(this).index() + 1); //如果这里直接使用this,指向的是点击事件元素this.el
			var _num = 0;
			var $this = $(this);

			self.select(e, $this);
			_num = $(this).index() + self.add;
			self.lightOn(_num);

			(typeof self.opts.select === 'function') && self.opts.select.call(this, _num, itemLength); //如果前面的条件成立，则执行后面的内容
			self.el.trigger('select', [_num, itemLength]);
		}).on('click', '.rating-item', function() {
			//var _num = $(this).index() + self.add
			self.opts.num = $(this).index() + self.add;
			(typeof self.opts.chosen === 'function') && self.opts.chosen.call(this, self.opts.num, itemLength);
			self.el.trigger('chosen', [self.opts.num, itemLength]);
		}).on('mouseout', function() {
			self.lightOn(self.opts.num);
		})
	}
	Light.prototype.select = function() {
		throw new Error("子类必须重写此方法");
	};

	//点亮整颗
	var LightEntire = function(el, options) {
		Light.call(this, el, options) //继承父类构造函数内容
		this.selectEvent = "mouseover";
	};
	extend(LightEntire, Light);

	LightEntire.prototype.lightOn = function(num) {
		Light.prototype.lightOn.call(this, num);
	};
	LightEntire.prototype.select = function() {
		this.add = 0;
	};

	//点亮半颗
	var LightHalf = function(el, options) {
		Light.call(this, el, options)
		this.selectEvent = "mousemove";
	};
	extend(LightHalf, Light);
	LightHalf.prototype.lightOn = function(num) {
		var count = parseInt(num);

		var isHalf = num !== count;
		Light.prototype.lightOn.call(this, count);
		if (isHalf) {
			this.item.eq(count).css('background-position', '0 -50px'); //eq(n)方法，选择第n个元素,从0开始
		}

	};

	LightHalf.prototype.select = function(e, $this) {
		if (e.pageX - $this.offset().left < $this.width() / 2) {
			this.add = 0.5;
		} else {
			this.add = 0;
		}
	};
	//默认参数
	var defaults = {
		mode: 'LightEntire',
		num: 0,
		readOnly: false,
		select: function() {},
		chosen: function() {},
	}

	var mode = {
		'LightEntire': LightEntire,
		'LightHalf': LightHalf
	};

	//init
	var init = function(el, options) {
		options = $.extend({}, defaults, options); //初始化，默认值defaluts,如果option设置参数，则覆盖默认值
		if (!mode[options.mode]) {
			mode[options.mode] = "LightEntire";
		}
		new mode[options.mode](el, options).init();
	}
	return {
		init: init
	};

})();

rating.init('.rating1', {
	mode: 'LightHalf',
	num: 2.5,
	chosen: function() {
		rating.init('.rating')
	}
});
$('.rating').on('select', function(e, num, total) {
	console.log(num + '/' + total);

}).on('chosen', function(e, num, total) {
	console.log(num + '/' + total);
})