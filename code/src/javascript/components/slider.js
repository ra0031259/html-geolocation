(function() {

	this.TPSlider = function(sliderWrapper) { 

		// Public Method 

		TPSlider.prototype.init = function (sliderWrapper) {

			//cache jQuery objects
			var slider = sliderWrapper.find('.tp-slider'),
				sliderNav = sliderWrapper.find('.tp-slider-navigation'),
				sliderControls = sliderWrapper.find('.tp-slider-controls').find('li');

			//update visible slide when user clicks next/prev arrows
			sliderNav.on('click', '.next-slide', function(event){
				event.preventDefault();
				nextSlide(slider, sliderControls);
			});
			sliderNav.on('click', '.prev-slide', function(event){
				event.preventDefault();
				prevSlide(slider, sliderControls);
			});

			//detect swipe event on mobile - update visible slide
			slider.on('swipeleft', function(event){
				nextSlide(slider, sliderControls);
			});
			slider.on('swiperight', function(event){
				prevSlide(slider, sliderControls);
			});

			//update visible slide when user clicks .cd-slider-controls buttons
			sliderControls.on('click', function(event){
				event.preventDefault();
				var selectedItem = $(this);
				if(!selectedItem.hasClass('selected')) {
					// if it's not already selected
					var selectedSlidePosition = selectedItem.index(),
						selectedSlide = slider.children('li').eq(selectedSlidePosition),
						visibleSlide = retrieveVisibleSlide(slider),
						visibleSlidePosition = visibleSlide.index(),
						direction = '';
					direction = ( visibleSlidePosition < selectedSlidePosition) ? 'next': 'prev';
					updateSlide(visibleSlide, selectedSlide, direction, sliderControls);
				}
			});

			//keyboard slider navigation
			$(document).keyup(function(event){
				if(event.which=='37' && elementInViewport(slider.get(0)) ) {
					prevSlide(slider, sliderControls);
				} else if( event.which=='39' && elementInViewport(slider.get(0)) ) {
					nextSlide(slider, sliderControls);
				}
			});
		}

		// Private Methods

		function retrieveVisibleSlide(slider, sliderControls) {
			return slider.find('.visible');
		}

		function nextSlide(slider, sliderControls ) {
			var visibleSlide = retrieveVisibleSlide(slider),
				nextSlide = ( visibleSlide.next('li').length > 0 ) ? visibleSlide.next('li') : slider.find('li').eq(0);
			updateSlide(visibleSlide, nextSlide, 'next', sliderControls);
		}

		function prevSlide(slider, sliderControls) {
			var visibleSlide = retrieveVisibleSlide(slider),
					prevSlide = ( visibleSlide.prev('li').length > 0 ) ? visibleSlide.prev('li') : slider.find('li').last();
				updateSlide(visibleSlide, prevSlide, 'prev', sliderControls);
		}

		function updateSlide(oldSlide, newSlide, direction, controls) {
			oldSlide.removeClass('visible');
			newSlide.addClass('visible');
			updateNavSlide(newSlide, controls);
		}

		function updateNavSlide(actualSlide, controls) {
			var position = actualSlide.index();
			controls.removeClass('selected').eq(position).addClass('selected');
		}

		/*
			How to tell if a DOM element is visible in the current viewport?
			http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
		*/
		function elementInViewport(el) {
			var top = el.offsetTop;
			var left = el.offsetLeft;
			var width = el.offsetWidth;
			var height = el.offsetHeight;

			while(el.offsetParent) {
			    el = el.offsetParent;
			    top += el.offsetTop;
			    left += el.offsetLeft;
			}

			return (
			    top < (window.pageYOffset + window.innerHeight) &&
			    left < (window.pageXOffset + window.innerWidth) &&
			    (top + height) > window.pageYOffset &&
			    (left + width) > window.pageXOffset
			);
		}


		// initialize slider 
		this.init(sliderWrapper);

	}

}());
