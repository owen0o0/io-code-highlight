<?php defined('ABSPATH') || die;
/**
 * 加载prism js
 */
function ioch_add_prism_assets() {
	// 请检查是否需要加载高亮代码
	if ( ! is_admin() ) {
		global $posts;
		$force_load = apply_filters( 'mkaz_code_syntax_force_loading', false );
		// 判断是否存在代码块
		if ( !$force_load ) {
			$found_block = array_reduce( $posts, function($found, $post) { 
				return $found || has_block( 'code', $post ) || preg_match('/(crayon-|<\/pre>)/i', $post->post_content, $matches);
			}, false );
			if ( !$found_block ) {
				return;
			}
		}
	}
 
	$prism_js_path   = '/includes/prism/prism.js';
	$prism_css_path   = '/includes/prism/prism.css';
	$prism_settings_path = '/includes/prism/prism-settings.js';
 
	wp_enqueue_style('io-prism-css',IOTHEME_BLOCK_URL . $prism_css_path, array(),filemtime( IOTHEME_BLOCK_PATH . $prism_css_path ));
	wp_enqueue_script('io-prism-js',IOTHEME_BLOCK_URL . $prism_js_path, array('jquery'),filemtime( IOTHEME_BLOCK_PATH . $prism_js_path ), true );
 
	// prism其他语言路径
	wp_localize_script('io-prism-js', 'ioch_settings', array(
		'prismUrl' => IOTHEME_BLOCK_URL,
		'copyPop' => __('复制成功！','io_plugin'),
	));
}
add_action('wp_enqueue_scripts',  'ioch_add_prism_assets' );
