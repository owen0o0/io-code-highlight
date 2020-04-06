(function() {
	tinymce.create('tinymce.plugins.iochButtons', {
		init: function(ed, url) {
			ed.addCommand('ioch_code',
			function() {
				ed.windowManager.open({
					title: '插入代码',
					file: url +'/insert-code.php',
					width: 600,
					height: 430,
					inline: 1
				},
				{
					plugin_url: url // Plugin absolute URL
				});
			});

			ed.addButton('ioch_code', {
				title: '代码高亮',
				cmd: 'ioch_code',
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
	tinymce.PluginManager.add('ioch_code_button', tinymce.plugins.iochButtons);
})();
