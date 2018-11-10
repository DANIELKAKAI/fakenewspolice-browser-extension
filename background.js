$(function(){


$("#report-button").click(function(){

   //console.log("ajax called");
  //check_report();
   report_news();
 
});


$("#web-button").click(function(){
		window.open('http:127.0.0.1','_blank');
		//get_all_keys();
		//get_link();
		//get_all_values();
	});

 
function get_url()
{
	
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
    	var url = tabs[0].url;
    	var title = tabs[0].title;
    		
		});

}


	chrome.tabs.onUpdated.addListener( 
    function (tabId, changeInfo, tab) 
    {
    	if (changeInfo.status == 'loading' && /^http/.test(changeInfo.url))
    	{
    		ajax_check(changeInfo.url);
    	}

       
    }

);


function ajax_report(title,url){
		 $.ajax({
      	url: 'https://1fb95732.ngrok.io/fakenews/add/',
      	type:"GET",
        dataType: 'json',
        data: { "url": url,"title":title},
        success: function(data) {
        	//console.log(data.res)
  			  store_link(url);
          //$("#report-button").attr("style","color:#dadada;").html("Reported");
          $("#report-button").prop('disabled','disabled').html("Reported");

        },
        error:function(response){
          console.log(response);
        },
  
      });
}



function ajax_check(url){
		 $.ajax({
      	url: 'https://1fb95732.ngrok.io/fakenews/check/',
      	type:"GET",
        dataType: 'json',
        data: { "url": url},
        success: function(data) {
        	if(data.result){
        		var reports = String(data.result.reports);
            		var verifications = String(data.result.verifications);
        		alert("Fake news Alert !!\nReports: num\nVerifications: verified".replace("num",reports).replace("verified",verifications))
        	}

        },
        error:function(response){
          console.log(response);
        },
  
      });
}


function store_link(url){
	var date = new Date();
	var key = String(date.getTime());
	var js = '{"key":"url"}'.replace("key",key).replace("url",url);
	var obj = JSON.parse(js);

	chrome.storage.sync.set(obj, function() {
      console.log("link saved");
    });
}

function get_link(){
	chrome.storage.sync.get('link', function(data) {
        alert(data.link)
  });
}

function get_all_keys(){
	chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    return allKeys;
});

}

function get_all_values(){
	chrome.storage.sync.get(null, function(items) {
    var allValues = Object.values(items);
    return allValues;
});
}


function check_report(){
	
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
    	var url = tabs[0].url;
    	var title = tabs[0].title;
    		
    	chrome.storage.sync.get(null, function(items) {
    		var allValues = Object.values(items);
    		for (var i = 0; i < allValues.length; i++) {
    			if (url == allValues[i])
    			{
    				alert("Already Reported !!");
    				return true;
    			}

    		};
    		ajax_report(title,url);
		});

		});
}


function report_news(){
  
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
      var url = tabs[0].url;
      var title = tabs[0].title;
         
        ajax_report(title,url);
  

    });
}


function check_existing(){
	
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
	
}




function disable_btn(){
	$("#report-button").attr("style","color:#dadada;").html("Reported");

}



});
