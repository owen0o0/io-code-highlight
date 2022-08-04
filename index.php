<?php
/**
 * Plugin Name:  io Code Highlight
 * Plugin URI:   https://www.iowen.cn
 * Description:  一个代码语法高亮插件
 * Version:      2.0
 * Author:       一为
 * Author URI:   https://www.iowen.cn
 * License:      GPL2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:   https://www.iotheme.cn/plugins/io-code-highlight/
 * Text Domain:  io_plugin
 */

define('IOTHEME_BLOCK_VERSION', '2.0');
define('IOTHEME_BLOCK_URL', plugins_url('', __FILE__));
define('IOTHEME_BLOCK_PATH', plugin_dir_path( __FILE__ ) );

define('DEFAULT_LANG', 'php');
define('DEFAULT_NUMB', false);

require IOTHEME_BLOCK_PATH . '/tinymce.php';
require IOTHEME_BLOCK_PATH . '/block.php';

/**
 * 加载enlighter js
 */
function io_code_add_enlighter_assets() {
    // 请检查是否需要加载高亮代码
    if ( ! is_admin() ) {
        global $posts;
        $force_load = apply_filters( 'io_code_force_loading', false );
        // 判断是否存在代码块
        // 如果未找到块，则跳过加载资源
        if ( !$force_load ) {
            $found_block = array_reduce( $posts, function($found, $post) { 
                return $found || has_block( 'code', $post ) || preg_match('/(crayon-|<\/pre>)/i', $post->post_content, $matches);
            }, false );
            if ( !$found_block ) {
                return;
            }
        }
    }
    
    $_min = WP_DEBUG === true?'':'.min';

    $enlighter_js_path  = '/assets/js/enlighterjs'.$_min.'.js';
    $enlighter_css_path = '/assets/css/enlighterjs'.$_min.'.css';

    if(is_single()){
        wp_enqueue_style('io-enlighter-css',IOTHEME_BLOCK_URL . $enlighter_css_path, array(), IOTHEME_BLOCK_VERSION);
        wp_enqueue_script('io-enlighter-js',IOTHEME_BLOCK_URL . $enlighter_js_path, array('jquery'), IOTHEME_BLOCK_VERSION, true );
    }
    wp_localize_script('io-enlighter-js', 'io_code_settings', array(
        'pre_c'        => '© '.get_bloginfo('name'),
    ));
}
add_action('wp_enqueue_scripts',  'io_code_add_enlighter_assets' );
