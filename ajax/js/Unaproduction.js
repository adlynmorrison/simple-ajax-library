var Unaproduction = {};

//create the xhr object
Unaproduction.createXHR = function(url, options){
	var xhr = false;
	//if the browser handles xmlhttpRequest
	if (window.XMLHttpRequest){
		//if yes, create the object
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject){
		try {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			xhr = false;
		}
	}
	//make sure we have an xml object to work with
	if (xhr){
		//if yes, options object with options or default values
		options = options || {};
		//options methods default with a get request
		options.method = options.method || "GET";
		//option.data default value
		options.data = options.data || null;

		if (options.data) {
			var qstring = [];

			for (var key in options.data) {
				qstring.push(encodeURIComponent(key)+"="+encodeURIComponent(options.data[key]));
			}

			options.data = qstring.join("&");
		}

		xhr.onreadystatechange = function() {
			if(xhr.readyState == 1){
				if(options.before){
					options.before.call(xhr);
				}
			}

			if ((xhr.readyState == 4) && (xhr.status == 200 || xhr.status == 304)){
				var contentType = xhr.getResponseHeader('Content-Type');
				//did the user set the complete callback function?
				if (options.complete) {
					if (contentType == 'application/json'){
						options.complete.call(xhr, JSON.parse(xhr.responseText));
					} else if (contentType == "text/xml" || contentType == "application/xml"){
						options.complete.call(xhr, xhr.responseXML);
					} else{
						options.complete.call(xhr, xhr.responseText);
					}
					//if yes, call the complete method's call method, seting the this keyword to xhr
				}
			}
		};
		//open request and pass in the options method and url
		xhr.open(options.method, url, true);
		return xhr;
	} else{
		return false;
	}
};

//cal the method
Unaproduction.ajax = function(url, options) {
	var xhr = Unaproduction.createXHR(url, options);

	if (xhr) {
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		if (options.method.toUpperCase() == "POST") {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		xhr.send(options.data);
	}
};

Unaproduction.flash = function(elem){
	elem.style.backgroundColor = "yellow";

	window.setTimeout(function(){
		elem.style.backgroundColor = "white";
	}, 300);
};