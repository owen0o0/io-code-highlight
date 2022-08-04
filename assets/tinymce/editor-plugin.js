/*
 * @Author: iowen
 * @Author URI: https://www.iowen.cn/
 * @Date: 2020-03-19 18:23:12
 * @LastEditors: iowen
 * @LastEditTime: 2022-08-04 14:05:21
 * @FilePath: \io-code-highlight\assets\tinymce\editor-plugin.js
 * @Description: 
 */
(function() {
	tinymce.create('tinymce.plugins.io_codeButtons', {
		init: function(ed, url) {
			ed.addCommand('io_code',
			function() {
				ed.windowManager.open({
					title: '插入代码',
					file: url +'/insert-code.php',
					width: 630,
					height: 430,
					inline: 1
				},
				{
					plugin_url: url // Plugin absolute URL
				});
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
})();
