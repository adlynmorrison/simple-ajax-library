(function(){
	//reference link element ... index 0
	var link = document.getElementsByTagName("a")[0];
	link.onclick = function (){
		//xhr object
		var xhr = new XMLHttpRequest();

		//handle the "onreadystatechange" event
		//xhr.readyState property values
		//0 = uninialized = the request hasn't been opned
		//1 = loading the = the requet has been opens
		//2 = loaded = the request has been sent to the server
		//3 = interactive = in the process of sending something back
		//4 = complete we have access to the server's response
		
		xhr.onreadystatechange = function() {
			if ((xhr.readyState == 4) && (xhr.status == 200 || xhr.status == 304)){
				var body = document.getElementsByTagName("body")[0];
				var d = document.createElement("div");
				body.appendChild(d);

				var div = document.getElementsByTagName("div")[0];
				div.innerHTML = xhr.responseText;

				body.removeChild(link);
			}
		};
		//open the request #1
		xhr.open("GET", "files/ajax.html", true);
		//send the request to the server #2
		xhr.send(null)
		//disable default behavior doesn't follow through.
		return false;
	};
})();