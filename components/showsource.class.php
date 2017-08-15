<?php

/**
 * showSource
 * 
 * This is a simple class that can be used to highlight documents with HTML and XHTML syntax.
 * 
 * It outputs a XHTML document that shows the input document using different CSS styles to 
 * configure the presentation of comments, data, tags, attributes and attribute values.
 * 
 * ##EXAMPLE
 * 
 * $htmlfile = join ("", file ("./test.htm")); //load HTML file  
 * 
 * $sc = new viewSource; //create new instance of sourcecode (class) 
 * echo "<p class=\"code\">".$sc->html($htmlfile)."</p>"; //print result
 * 
 * #EXAMPLE END
 * 
 * @package viewSource MODX Extra
 * @author demon.devin
 * @copyright 2016
 * @version 1.1
 * @access public
 */
class showsource {
	public $host = null;
	public $assetsPath;
	public $cssPath;
	public $jsPath;

	public function __construct() {
		
		$this->assetsPath = $this->host.'assets/';
		$this->cssPath = $this->assetsPath.'css/';
		$this->jsPath = $this->assetsPath.'js/';
		
	}
	
	public function setHost($host) {
		
		$this->host = isset($host) ? $host : $_SERVER['SERVER_NAME'];
		
	}
	
	public function getHost() {
		
		return $this->host;
		
	}

	public function readFile($page) {
		$this->page = $page;
		$handle = fopen($this->page, "rb");
		$this->contents = "";

		// read the contents of the file
		do {
			$data = fread($handle, 8192);
			if(strlen($data) == 0) {
				break;
			}
			$this->contents .= $data;
		} while (true);
		fclose($handle);

		return $this->contents;
	}

	public function source($input, $page, $edit = false) {
		$this->contents = $input;
		$this->page = $page;
		$this->edit = $edit;
		$source = '';

		$this->contents = preg_replace("/(<!--)(.+?)(-->)/", "[[+comment_b]]\\2[[+comment_e]]", $this->contents);

		$tag_array = preg_split("/(<.+?>)/", $this->contents, -1, PREG_SPLIT_DELIM_CAPTURE);

		while (list($ar_counter, $ar_value) = each($tag_array)) {

			if($ar_counter % 2 != 0) {

				$re = array("/(<+)([\/]?)(\S+)(>| [^>]*>)/", "/ (\S+)( *= *)([\`\"']?)([^\"'>]+)([\`\"' \?>]?)/");
				$replacement = array("\\1\\2[[+tag_b]]\\3[[+span_e]]\\4", " [[+attribute_b]]\\1[[+span_e]]\\2[[+value_b]]\\3\\4\\5[[+span_e]]");
				$ar_value = preg_replace($re, $replacement, $ar_value);

				$ar_value = htmlspecialchars($ar_value);

				$ar_value = str_replace("[[+tag_b]]", "<span class=\"tag\">", $ar_value);
				$ar_value = str_replace("[[+value_b]]", "<span class=\"value\">", $ar_value);
				$ar_value = str_replace("[[+attribute_b]]", "<span class=\"attribute\">", $ar_value);
				$ar_value = str_replace("[[+span_e]]", "</span>", $ar_value);

			}
			else {

				$ar_value = str_replace("[[+comment_b]]", "<span class=\"comment\">&lt;!--", $ar_value);
				$ar_value = str_replace("[[+comment_e]]", "--&gt;</span>", $ar_value);

			}

			$source .= $ar_value;

		}

		$render  = " <a href=\"javascript:closeSourceWindow();\" class=\"mBtn\">".PHP_EOL;
		$render .= "  <i class=\"icon-cancel-squared\"></i>".PHP_EOL;
		$render .= " </a>".PHP_EOL;
		$render .= " <figcaption>".basename($this->page)." - <span class='close'>(Ctrl + X or 'X' button on far right to close)</span></figcaption>".PHP_EOL;
		$render .= " <pre><code contenteditable=\"".($this->edit?'true':'false')."\" tabindex=\"0\" spellcheck=\"false\">".$source.PHP_EOL;
		$render .= " </code></pre>".PHP_EOL;

		return $render;

	}

	public function printViewLink() {
		$url = "";
		$url .= "javascript:void(z=";
		$url .= "document.body.appendChild(document.createElement('script')));";
		$url .= "void(z.language='javascript');void(z.type='text/javascript');";
		$url .= "void(z.src='http://".$this->host."Source.php?p=' + location.href);";

		echo '<a href="'.$url.'" title="View Source">View Source</a>';
	}

}
