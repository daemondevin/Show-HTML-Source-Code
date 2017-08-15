<?php header("Content-Type: text/javascript"); 

include(dirname(__FILE__) . '/components/showsource.class.php');

$vs = new showsource();

if (!($vs instanceof showsource)) {
    echo '[ShowSource] ShowSource class was not found.';
    return false;
}

$vs->setHost('softables.tk/')

?>

css=document.body.appendChild(document.createElement("link"));
css.id="showSourceCSS";
css.rel="stylesheet";
css.href="<?php echo $vs->cssPath; ?>/showSource.css";
css.type="text/css";

m=document.body.appendChild(document.createElement("figure"));
m.id = "mSourceWindow";

<?php

$p = $_GET['p'];
if($p == "") {
	$p = "http://".$vs->getHost()."/";
	echo("alert(\"No page specified! usage:Source.php?p=http://www.example.com/\")");
	return false;
}

$contents = "";

$contents = $vs->readFile($p);

?>
m.innerHTML=`<?php echo $vs->source($contents, $p, false); ?>`;


function closeSourceWindow(){
	document.body.removeChild(document.getElementById("mSourceWindow"));
	document.body.removeChild(document.getElementById("showSourceCSS"));
}

  (function() {
	  for (var tags = ['figure', 'figcaption'], i = 0; i < tags.length; i++) {
	    document.createElement(tags[i]);
	  }
	})();

	(function() {
	  //filter IE8 and earlier which don't support the generated content
	  if (typeof(window.getComputedStyle) == 'undefined') {
	    return;
	  }

	  //get the collection of PRE elements
	  var pre = document.getElementsByTagName('pre');

	  //now iterate through the collection
	  for (var len = pre.length, i = 0; i < len; i++) {
	    //get the CODE or SAMP element inside it, 
	    //or just in case there isn't one, continue to the next PRE
	    var code = pre[i].getElementsByTagName('code').item(0);
	    if (!code) {
	      code = pre[i].getElementsByTagName('samp').item(0);
	      if (!code) {
	        continue;
	      }
	    }

	    //create a containing DIV column (but don't append it yet)
	    //including aria-hidden so that ATs don't read the numbers
	    var column = document.createElement('div');
	    column.setAttribute('aria-hidden', 'true');
	    column.setAttribute('class', 'numbers');

	    //split the code by line-breaks to count the number of lines
	    //then for each line, add an empty span inside the column
	    for (var n = 0; n < code.innerHTML.split(/[\n\r]/g).length; n++) {
	      column.appendChild(document.createElement('span'));
	    }

	    //now append the populated column before the code element
	    pre[i].insertBefore(column, code);

	    //finally add an identifying class to the PRE to trigger the extra CSS
	    pre[i].className = 'line-numbers';
	  }

	})();