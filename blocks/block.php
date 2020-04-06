<?php 

function code_block() {
    wp_register_script( 
        'code_block',
        IOTHEME_BLOCK_URL . '/blocks/code-editor.js',
		array( 'wp-block-editor', 'wp-components', 'wp-element', 'wp-hooks', 'wp-i18n', 'wp-polyfill' ),
		IOTHEME_BLOCK_VERSION
    );

    wp_register_style(
        'code_block',
        IOTHEME_BLOCK_URL . '/blocks/code-editor.css',
		array( 'wp-edit-blocks' ),
		IOTHEME_BLOCK_VERSION
    );

    register_block_type( 'code/block', array(
        'editor_script' => 'code_block',
        'editor_style'  => 'code_block',
	) );
	
	require IOTHEME_BLOCK_PATH . '/includes/prism-languages.php';
	
	$default_lang = 'php';
	$default_numb = 1;

	wp_add_inline_script(
		'code_block',
		implode( 
			array(
				'const ioch_code_languages = ' . json_encode( ioch_languages() ) . ';',
				'const ioch_code_default_lang = "' . $default_lang . '";',
				'const ioch_code_default_numb = ' . $default_numb . ';',
			)
		),
		'before'
	);
}
if (function_exists('register_block_type')) { 
    add_action( 'enqueue_block_editor_assets', 'code_block' );
}
