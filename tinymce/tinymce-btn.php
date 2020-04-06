<?php defined('ABSPATH') || die;

if (is_admin()) {
	add_action('admin_init', 'ioch_code_addbuttons');
}

function ioch_code_addbuttons() { 
	if (get_user_option('rich_editing') == 'true') { 
		add_filter("mce_external_plugins", "add_ioch_code_tinymce_plugin", 5);
        add_filter('mce_buttons', 'ioch_register_tinymce_button', 5);
        add_editor_style(plugins_url( 'editor-style.css', __FILE__ ));
	}
}
 
function ioch_register_tinymce_button($buttons) {
	array_push($buttons,  "ioch_code");
	return $buttons;
}
 
function add_ioch_code_tinymce_plugin($plugin_array){
	$plugin_array['ioch_code_button'] = plugins_url( 'editor-plugin.js', __FILE__ );
	return $plugin_array;
}
