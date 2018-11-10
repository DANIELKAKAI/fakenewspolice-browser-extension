$(function(){


	
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
    	var url = tabs[0].url;
    	var title = tabs[0].title;
    		
    	chrome.storage.sync.get(null, function(items) {
    		var allValues = Object.values(items);
    		for (var i = 0; i < allValues.length; i++) {
    			if (url == allValues[i])
    			{
    				disable_btn();
    				return true;
    			}

    		};
    		
		});

		});
	





function disable_btn(){
	$("#report-button").prop('disabled','disabled').html("Reported");

}


});