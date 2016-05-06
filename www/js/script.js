if(document.getElementById('build') != null) {
	document.getElementById('build').onclick = function() {
	    window.location = 'build.html';
	};
}

if(document.getElementById('approve') != null) {
	document.getElementById('approve').onclick = function() {
	    window.location = 'approve.html';
	};
}

if(document.getElementById('prepare') != null) { 
	document.getElementById('prepare').onclick = function() {
	    window.location = 'prepare.html';
	};
}

if(document.getElementById('rewards') != null) { 
	document.getElementById('rewards').onclick = function() {
	    window.location = 'rewards.html';
	};
}

if(document.getElementById('home') != null) { 
	document.getElementById('home').onclick = function() {
		console.log("entering home");
	    window.location = 'menu.html';
	};
}
