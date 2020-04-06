<?php
/**
 * Plugin Name:  io Code Highlight
 * Plugin URI:   https://www.iowen.cn
 * Description:  一个代码语法高亮插件
 * Version:      1.0
 * Author:       一为
 * Author URI:   https://www.iowen.cn
 * License:      GPL2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:  io_plugin
 */

define('IOTHEME_BLOCK_VERSION', '1.0ss');
define('IOTHEME_BLOCK_URL', plugins_url('', __FILE__));
define('IOTHEME_BLOCK_PATH', plugin_dir_path( __FILE__ ) );

//include( 'tinymce/tinymce-btn.php' );
//include( 'includes/start-code.php' );
require IOTHEME_BLOCK_PATH . '/tinymce/tinymce-btn.php';
require IOTHEME_BLOCK_PATH . '/includes/start-code.php';
require IOTHEME_BLOCK_PATH . '/blocks/block.php';