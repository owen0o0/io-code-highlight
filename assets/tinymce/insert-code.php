<?php
/*
 * @Author: iowen
 * @Author URI: https://www.iowen.cn/
 * @Date: 2020-03-19 17:16:20
 * @LastEditors: iowen
 * @LastEditTime: 2022-08-04 06:33:00
 * @FilePath: \io-code-highlight\assets\tinymce\insert-code.php
 * @Description: 
 */
require_once '../../../../../wp-load.php'; 
require_once IOTHEME_BLOCK_PATH . '/code-languages.php';
?>
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

<form name="io_code" action="#">
	<div class="codeArea">
		<label for="lang">语言</label>
		<select id="io_code_lang" name="io_code_main" style="width: 120px">
		<?php 
			foreach (io_code_languages() as $key => $value) {
				echo '<option value="'.$key.'" '.( $key===DEFAULT_LANG ?'selected = "selected"':'').' >'.$value.'</option>';
			}
		?>
		</select>
		<label for="io_code_linenumber" style="margin-left:10px;"> 显示行号</label>
		<input type="checkbox" name="linenumber" <?php echo(DEFAULT_NUMB?'checked="checked"':'') ?> id="io_code_linenumber">
		<label for="io_code_lineoffset" style="margin-left:10px;"> 起始行号</label>
		<input type="text" name="lineoffset" id="io_code_lineoffset" value="" size="8" placeholder="如：12"/> 
		<label for="io_code_highlight" style="margin-left:10px;"> 高亮行</label>
		<input type="text" name="highlight" id="io_code_highlight" value="" size="8" placeholder="如：1,3-5,8"/> 
		<textarea id="io_code_code" autofocus></textarea>
		<p>
			<input type="submit" id="insert" name="insert" value="确定" class="button button-primary" onclick="insert_io_code();"/>
			<input type="button" id="cancel" name="cancel" value="取消" class="button submitdelete" onclick="javascript:window.parent.tinyMCE.activeEditor.windowManager.close();"/>
		</p>
	</div>
</form>
<script>
	var html = window.parent.tinyMCE.activeEditor.selection.getContent();
	document.getElementById('io_code_code').value = html;
	
	function escapeHtml(text) {
		return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "'").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	function insert_io_code() {
		var langname = document.getElementById('io_code_lang').value; 
		var linenumber = document.getElementById('io_code_linenumber').checked;
		var lineoffset = document.getElementById('io_code_lineoffset').value;
		var highlight = document.getElementById('io_code_highlight').value;
	
		var html = escapeHtml(document.getElementById('io_code_code').value);
			
		var tagtext = '<pre class="enlighter-pre"><code class="code" data-enlighter-language="' + langname + '" data-enlighter-linenumbers="' + linenumber + '" data-enlighter-lineoffset="' + lineoffset + '" data-enlighter-highlight="' + highlight + '">' + html + '</code></pre>';
	
		window.parent.tinyMCE.activeEditor.execCommand('mceInsertContent', 0, tagtext);
		window.parent.tinyMCE.activeEditor.windowManager.close();
		return;
	}
</script>
</body>
</html>