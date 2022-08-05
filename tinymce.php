<?php
/*
 * @Author: iowen
 * @Author URI: https://www.iowen.cn/
 * @Date: 2020-03-19 17:36:40
 * @LastEditors: iowen
 * @LastEditTime: 2022-08-05 23:51:14
 * @FilePath: \io-code-highlight\tinymce.php
 * @Description: 
 */
defined('ABSPATH') || die;


/**
 * 添加经典编辑器内容
 * 
 * @return void 
 */
function io_code_add_buttons() { 
	if (get_user_option('rich_editing') == 'true') { 
		add_filter( 'mce_external_plugins', 'io_code_plugin_tinymce_js' );
        add_filter( 'mce_buttons', 'io_code_plugin_register_tinymce_button' );
		add_filter( 'mce_css', 'io_code_plugin_mce_css' );

	}
}
add_action('admin_init', 'io_code_add_buttons');
/**
 * 加载 css
 * 
 * @param mixed $mce_css 
 * @return string 
 */
function io_code_plugin_mce_css( $mce_css ) {
    if ( ! empty( $mce_css ) )
        $mce_css .= ',';
    $mce_css .= IOTHEME_BLOCK_URL . '/assets/css/tinymce-style.css?v=' . IOTHEME_BLOCK_VERSION ;
    return $mce_css;
}
/**
 * 添加按钮
 * 
 * @param mixed $buttons 
 * @return array 
 */
function io_code_plugin_register_tinymce_button($buttons) {
	array_push($buttons,  "io_code_high");
	return $buttons;
}
/**
 * 添加 js
 * 
 * @param mixed $plugin_array 
 * @return mixed 
 */
function io_code_plugin_tinymce_js($plugin_array){
	$plugin_array['io_code_button'] = IOTHEME_BLOCK_URL . '/assets/js/tinymce-plugin.js?v=' . IOTHEME_BLOCK_VERSION ;
	return $plugin_array;
}
