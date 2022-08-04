<?php 
/*
 * @Author: iowen
 * @Author URI: https://www.iowen.cn/
 * @Date: 2020-03-19 20:49:49
 * @LastEditors: iowen
 * @LastEditTime: 2022-08-04 01:22:15
 * @FilePath: \io-code-highlight\block.php
 * @Description: 
 */

function io_code_block() {
    
    $depends = array( 'wp-blocks', 'wp-element', 'wp-components' );

    if ( wp_script_is( 'wp-edit-widgets' ) ) {
        $depends[] = 'wp-edit-widgets';
    } else {
        $depends[] = 'wp-edit-post';
    }

    wp_register_script( 
        'code_block',
        IOTHEME_BLOCK_URL . '/assets/js/code-editor.js',
        $depends,
        IOTHEME_BLOCK_VERSION
    );

    wp_register_style(
        'code_block',
        IOTHEME_BLOCK_URL . '/assets/css/code-editor.css',
        array( 'wp-edit-blocks' ),
        IOTHEME_BLOCK_VERSION
    );

    register_block_type( 'code/block', array(
        'editor_script' => 'code_block',
        'editor_style'  => 'code_block',
    ) );
    
    require_once IOTHEME_BLOCK_PATH . '/code-languages.php';
    

    wp_add_inline_script(
        'code_block',
        implode( 
            array(
                'const io_code_languages = ' . json_encode( io_code_languages() ) . ';',
                'const io_code_default_lang = "' . DEFAULT_LANG . '";',
                'const io_code_default_numb = ' . (DEFAULT_NUMB?'true':'false') . ';',
            )
        ),
        'before'
    );
}
if (function_exists('register_block_type')) {
    add_action('init', 'io_code_block');
    $wp_version = get_bloginfo('version', 'display');

    if (version_compare('5.7.9', $wp_version) == -1) {
        add_filter('block_categories_all', function ($categories, $post) {
            return array_merge(
                array(
                    array(
                        'slug'  => 'io_block_cat',
                        'title' => 'IO 模块',
                    ),
                ),
                $categories
            );
        }, 10, 2);
    } else {
        add_filter('block_categories', function ($categories, $post) {
            return array_merge(
                array(
                    array(
                        'slug'  => 'io_block_cat',
                        'title' => 'IO 模块',
                    ),
                ),
                $categories
            );
        }, 10, 2);
    }
}
