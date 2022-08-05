/*
 * @Author: iowen
 * @Author URI: https://www.iowen.cn/
 * @Date: 2020-03-19 18:23:12
 * @LastEditors: iowen
 * @LastEditTime: 2022-08-05 23:36:37
 * @FilePath: \io-code-highlight\assets\js\tinymce-plugin.js
 * @Description: 
 */
(function() {
	tinymce.create('tinymce.plugins.io_codeButtons', {
		init: function(ed, url) {
			ed.addCommand('io_code',
			function() {
				var e = ed.dom.getViewPort(),
					w = Math.min((Math.min(e.w-20, window.innerWidth-20) || 660), 660),
					h = Math.min((Math.min(e.h, window.innerHeight) || 520), 520);
				ed.windowManager.open({
					title: '插入代码',
					layout: "flex",
					direction: "column",
					align: "stretch",
					width: w,
					height: h,
					body: [
						{
							type: "listbox",
							name: "lang",
							label: "语言",
							values: toOption(io_code_languages), 
							value: io_code_default_lang,
						}, {
							type: "checkbox",
							name: "linenumber",
							label: "显示行号",
							checked: io_code_default_numb,
						}, {
							type: "textbox",
							name: "lineoffset",
							label: "起始行号",
							multiline: !1,
							placeholder: "如：12", 
						}, {
							type: "textbox",
							name: "highlight",
							label: "高亮行",
							multiline: !1,
							placeholder: "如：1,3-5,8", 
						}, {
							type: "textbox",
							name: "code",
							flex: 1,
							multiline: !0,
							spellcheck: !1,
							style: "direction: ltr; text-align: left",
							classes: "monospace",
							autofocus: !0
						}
					],
					onSubmit: function (api) {
						if (api.data.code !== "") {
							var data = api.data;
							var code = tinymce.html.Entities.encodeAllRaw(data.code.replace(/\r\n/gim, "\n"));
							var linenumber = data.linenumber ? 'true' : 'false';
							var content = '<pre class="io-enlighter-pre"><code class="code" data-enlighter-language="' + data.lang + '" data-enlighter-linenumbers="' + linenumber + '" data-enlighter-lineoffset="' + data.lineoffset + '" data-enlighter-highlight="' + data.highlight + '">' + code + '</code></pre><p></p>';
							ed.insertContent(content);
						}
					}
				})
			});
			
			ed.addButton('io_code_high', {
				title: '代码高亮',
				cmd: 'io_code',
				icon: 'code'
			});
		},
		createControl: function(n, cm) {
			return null;
		},
		getInfo: function() {
			return null;
		}
	});
	tinymce.PluginManager.add('io_code_button', tinymce.plugins.io_codeButtons);

	function toOption(data) {
		var language = [];
		data.forEach( function (key, value) {
			language.push({
				text: value,
				value: key
			})
		});
		return language;
	} 
})();
