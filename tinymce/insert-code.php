<?php include ( '../includes/prism-languages.php'); ?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>插入代码</title>
<base target="_self"/>
<style type='text/css'>
body {
	font: 14px "Microsoft YaHei", Helvetica, Arial, Lucida Grande, Tahoma, sans-serif;
	background-color: #f1f1f1;
	color: #222;
}
.codeArea {
	margin: 5px;
} 
textarea {
	margin-top: 10px;
	width: 100%;
	height: 320px;
    border-radius: 3px;
	resize: vertical;
}
.button {
	display: inline-block;
    text-decoration: none;
    font-size: 13px;
    line-height: 2.15384615;
    min-height: 30px;
    margin: 0;
    padding: 0 10px;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    -webkit-appearance: none;
    border-radius: 3px;
    white-space: nowrap;
    box-sizing: border-box;
}
.button-primary {
	float: right;
	background: #007cba;
    border-color: #007cba;
    color: #fff;
    text-decoration: none;
    text-shadow: none;
}
.button-primary.focus,.button-primary.hover,.button-primary:focus,.button-primary:hover {
	background: #0091cd;
	border-color: #0073aa;
	-webkit-box-shadow: inset 0 1px 0 rgba(120,200,230,.6);
	box-shadow: inset 0 1px 0 rgba(120,200,230,.6);
	color: #fff
}
.submitdelete {
	float: left;
	color: #0071a1;
    border-color: #0071a1;
    background: #f3f5f6;
    vertical-align: top;
}
.submitdelete.focus,.submitdelete.hover,.submitdelete:focus,.submitdelete:hover {
	background: #0073aa;
	border-color: #0073aa;
	color: #fff
}
select {
	font-size: 14px;
    line-height: 2;
    color: #32373c;
    border-color: #7e8993;
    box-shadow: none;
    border-radius: 3px;
    padding:0 5px;
    min-height: 30px;
    max-width: 25rem;
    background-size: 16px 16px;
    cursor: pointer;
    vertical-align: middle;
}
input[type=text]{
	padding: 0 8px;
    line-height: 2;
	min-height: 30px;
	box-shadow: 0 0 0 transparent;
    border-radius: 4px;
    border: 1px solid #7e8993;
    background-color: #fff;
    color: #32373c;
}
</style>
</head>
<body id="link" >

<form name="iocode" action="#">
	<div class="codeArea">
		<label for="lang">选择语言：</label>
		<select id="iocode_lang" name="iocode_main" style="width: 120px">
		<?php 
			foreach (ioch_languages() as $key => $value) {
				echo '<option value="'.$key.'">'.$value.'</option>';
			}
		?>
		</select>
		<label for="iocode_linenumber"> 高亮行：</label>
		<input type="text" name="linenumber" id="iocode_linenumber" value="" size="8"/>
		<label for="iocode_linenumber">如：1,3-5,8</label>
		<textarea id="iocode_code" autofocus></textarea>
		<p>
			<input type="submit" id="insert" name="insert" value="确定" class="button button-primary" onclick="insertiocode();"/>
			<input type="button" id="cancel" name="cancel" value="取消" class="button submitdelete" onclick="javascript:window.parent.tinyMCE.activeEditor.windowManager.close();"/>
		</p>
	</div>
</form>
<script>
	var html = window.parent.tinyMCE.activeEditor.selection.getContent();
	document.getElementById('iocode_code').value = html;
	
	function escapeHtml(text) {
		return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "'").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	function insertiocode() {
		var langname = document.getElementById('iocode_lang').value;
		var linenumber = document.getElementById('iocode_linenumber').value;
	
		var html = escapeHtml(document.getElementById('iocode_code').value);
		if(linenumber != '')
			linenumber = 'data-line=' + linenumber;
			
		var tagtext = '<pre class="line-numbers ioch-code" ' + linenumber + ' data-lang="' + langname + '"><code class="language-' + langname + '">' + html + '</code></pre>';
	
		window.parent.tinyMCE.activeEditor.execCommand('mceInsertContent', 0, tagtext);
		window.parent.tinyMCE.activeEditor.windowManager.close();
		return;
	}
</script>
</body>
</html>