window.onload = function () {
	var newdiv1 = document.createElement("div");
	var flag = 0;
	var key = false;
	newdiv1.style.cssText = "width: 200px; height: 200px; background: red; margin: 0px; padding: 0px; color: #fff"
	document.body.appendChild(newdiv1);
	newdiv1.addEventListener("click", function () {
		if(key == false){
			key = true;
		 	flag = 1 - flag;
			if(flag == 1){
				newdiv1.style.background = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
			 	timer = setInterval (go,20);
			}
			else{
				newdiv1.style.background = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
				timer1 = setInterval (back,20);
		    }
		}
	},false);
	
	function go () {
			newdiv1.style.marginLeft = parseInt(newdiv1.style.marginLeft) + 10 + 'px'; 
			if(parseInt(newdiv1.style.marginLeft) >= 500){
				clearInterval(timer);
				key = false;
			}
	}
	function back () {
			newdiv1.style.marginLeft = parseInt(newdiv1.style.marginLeft) -10 + 'px';
			if(parseInt(newdiv1.style.marginLeft) <= 0){
				clearInterval(timer1);
				key = false;
			}
	}
	var xhr = new XMLHttpRequest();
	xhr.open("get", "http://123.207.89.151/jrtt/forecast", true);
	xhr.send(null);
	xhr.onreadystatechange = function () {
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
		    var content = JSON.parse(xhr.responseText);
				newdiv1.innerText = ("天气：")
				var weather = document.createTextNode(content.明天.天气); 
				newdiv1.appendChild(weather);
			}
		}
	}
	var newdiv2 = document.createElement("div");
	newdiv2.style.cssText = "width: 100px; height: 100px; background: #56f;  position: absolute; top: 210px; left: 10px;"
	document.body.appendChild(newdiv2);
	var dragging = null, diffX = 0, diffY = 0;
	var handler = function (event) {
		switch (event.type){
			case "mousedown" :
				dragging = event.target;
				diffX = event.clientX - newdiv2.offsetLeft;
				diffY = event.clientY - newdiv2.offsetTop;
				break;
			case "mousemove" :
				if(dragging != null){
					var Left = event.clientX - diffX;
					var Top = event.clientY - diffY;
					if(Left < 0){
						Left = 0 ;
					}
					else if(Left > document.documentElement.clientWidth - newdiv2.offsetWidth){
						Left = document.documentElement.clientWidth - newdiv2.offsetWidth + 'px';
					}
					if(Top < 0){
						 Top = 0;
					}
					else if(Top > document.documentElement.clientHeight - newdiv2.offsetHeight){
						Top = document.documentElement.clientHeight - newdiv2.offsetHeight +'px';
					}
					dragging.style.left = Left + 'px';
					dragging.style.top = Top + 'px';
				}
				break;
			case "mouseup" :
				dragging = null;
				break;
		}
	};
	document.onmousedown = handler;
	document.onmousemove = handler;
	document.onmouseup = handler; 
}
