(function(){
	//reference link element ... index 0
	var link = document.getElementsByTagName("a")[0];
	
	link.onclick = function (){
				
		Unaproduction.ajax('files/ajax.txt', {
			method: "GET",
			cache: false,
			complete: function(response){
				alert(response);
			}
		});

		return false;
	};

	var form = document.getElementsByTagName('form')[0];

	form.onsubmit = function() {
		var emailVal = document.getElementById("email").value;
		var url = form.getAttribute("action");

		var body = document.getElementsByTagName("body")[0];
		var d = document.createElement("div");
		body.appendChild(d);

		var div = document.getElementsByTagName("div")[0];

		//specified the url
		Unaproduction.ajax(url, {
			method: "POST",
			//pass the data that we want to send to the server along to the request
			data: {
				//allows us to pass in multiple objects
				email: emailVal
			},
			before: function(){
				div.innerHTML = "<p>Loading...</p>"
			},
			complete: function(response){
				div.innerHTML = response;
				Unaproduction.flash(div);
			}
		});

		return false;
	};

})();