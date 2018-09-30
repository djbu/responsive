(function(w){

	var commentsActive = false,
		sw = document.documentElement.clientWidth,
		breakpoint = 650; 
	
	$(document).ready(function() {
	
		commentContainerInit();
		
		//For each comment, show
		$.each(comments.comments, function(i, item) {
			$(item.el).bind('click',function(e) {
			    if(commentsActive) {
					e.preventDefault();
			    	updateComment(item.el,item.title,item.comment);
					return false;
				}
			});
			
		});
	});
	
	function toggleComments() {
		if (!commentsActive) {
			commentsActive = true;
			$.each(comments.comments, function(i, item) {
				$(item.el).addClass('has-comment');
			});
			$('#comment-link strong').text('ON');
		} else {
			commentsActive = false;
			$.each(comments.comments, function(i, item) {
				$(item.el).removeClass('has-comment');
			});
			$('#comment-link strong').text('OFF');
			slideComment(999);
		}
	};
	
	function commentContainerInit() {
			$('<div id="comment-container"></div>').html('<a href="#" id="close-comments">Close</a><h2 id="comment-title">Annotation Title</h2><div id="comment-text">Here is some comment text</div>').appendTo('body').css('bottom',-$(this).outerHeight());
			
			if(sw<breakpoint) {
				$('#comment-container').hide();
			} else {
				$('#comment-container').show();
			}
			
			$('body').delegate('#close-comments','click',function(e) {
				var commentHeight = $('#comment-container').outerHeight();
				slideComment(commentHeight);
				return false;
			});
	}
	
	function slideComment(pos) {
		$('#comment-container').show();
		if(sw>breakpoint) {
			$('#comment-container').css('bottom',-pos);
		} else {
			var offset = $('#comment-container').offset().top;
			$('html,body').animate({scrollTop: offset}, 500);
		}
	}
		
	
	function updateComment(el,title,msg) {
			var $container = $('#comment-container'),
				$title = $('#comment-title'),
				$text = $('#comment-text');
			$title.text(title);
			$text.html(msg);
			slideComment(0);
	}
	
	
})(this);
