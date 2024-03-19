(function(){
  // Vertical Timeline - by CodyHouse.co (modified)
	function VerticalTimeline( element ) {
		this.element = element;
		this.blocks = this.element.getElementsByClassName("cd-timeline__block");
		this.images = this.element.getElementsByClassName("cd-timeline__img");
		this.contents = this.element.getElementsByClassName("cd-timeline__content");
		this.dates = this.element.getElementsByClassName("cd-timeline__date");
		this.offset = 0.8;
		this.hideBlocks();
	};

	VerticalTimeline.prototype.hideBlocks = function() {
		if ( !"classList" in document.documentElement ) {
			return; // no animation on older browsers
		}
		//hide timeline blocks which are outside the viewport
		var self = this;
		for( var i = 0; i < this.blocks.length; i++) {
			(function(i){
				if( self.blocks[i].getBoundingClientRect().top > window.innerHeight*self.offset ) {
					self.images[i].classList.add("cd-timeline__img--hidden");
					self.contents[i].classList.add("cd-timeline__content--hidden");
					self.dates[i].classList.add("cd-timeline__date--hidden");
				}
			})(i);
		}
	};

	VerticalTimeline.prototype.showBlocks = function() {
		if ( ! "classList" in document.documentElement ) {
			return;
		}
		var self = this;
		for( var i = 0; i < this.blocks.length; i++) {
			(function(i){
				if((self.contents[i].classList.contains("cd-timeline__content--hidden") || self.contents[i].classList.contains("cd-timeline__content--bounce-out")) && self.blocks[i].getBoundingClientRect().top <= window.innerHeight*self.offset ) {
					// add bounce-in animation
					self.images[i].classList.add("cd-timeline__img--bounce-in");
					self.contents[i].classList.add("cd-timeline__content--bounce-in");
					self.dates[i].classList.add("cd-timeline__date--bounce-in");
					self.images[i].classList.remove("cd-timeline__img--hidden");
					self.contents[i].classList.remove("cd-timeline__content--hidden");
					self.dates[i].classList.remove("cd-timeline__date--hidden");
					self.images[i].classList.remove("cd-timeline__img--bounce-out");
					self.contents[i].classList.remove("cd-timeline__content--bounce-out");
					self.dates[i].classList.remove("cd-timeline__date--bounce-out");
				}
			})(i);
		}
	};

	VerticalTimeline.prototype.hideBlocksScroll = function () {
		if ( ! "classList" in document.documentElement ) {
			return;
		}
		var self = this;
		for( var i = 0; i < this.blocks.length; i++) {
			(function(i){
				if(self.contents[i].classList.contains("cd-timeline__content--bounce-in") && self.blocks[i].getBoundingClientRect().top > window.innerHeight*self.offset ) {
					self.images[i].classList.remove("cd-timeline__img--bounce-in");
					self.contents[i].classList.remove("cd-timeline__content--bounce-in");
					self.dates[i].classList.remove("cd-timeline__date--bounce-in");
					self.images[i].classList.add("cd-timeline__img--bounce-out");
					self.contents[i].classList.add("cd-timeline__content--bounce-out");
					self.dates[i].classList.add("cd-timeline__date--bounce-out");
				}
			})(i);
		}
	}

	var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
		verticalTimelinesArray = [],
		scrolling = false;
	if( verticalTimelines.length > 0 ) {
		for( var i = 0; i < verticalTimelines.length; i++) {
			(function(i){
				verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
			})(i);
		}

		//show timeline blocks on scrolling
		window.addEventListener("scroll", function(event) {
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
			}
		});

		function animationEnd(event) {
			if (event.target.classList.contains("cd-timeline__img--bounce-out")) {
				event.target.classList.add("cd-timeline__img--hidden");
				event.target.classList.remove("cd-timeline__img--bounce-out");
			} else if (event.target.classList.contains("cd-timeline__content--bounce-out")) {
				event.target.classList.add("cd-timeline__content--hidden");
				event.target.classList.remove("cd-timeline__content--bounce-out");
			} else if (event.target.classList.contains("cd-timeline__date--bounce-out")) {
				event.target.classList.add("cd-timeline__date--hidden");
				event.target.classList.remove("cd-timeline__date--bounce-out");
			}
		}

		window.addEventListener("animationend", animationEnd);
		window.addEventListener("webkitAnimationEnd", animationEnd);
	}

	function checkTimelineScroll() {
		verticalTimelinesArray.forEach(function(timeline){
			timeline.showBlocks();
			timeline.hideBlocksScroll();
		});
		scrolling = false;
	};
})();
