<?php
/*
 * @Author: iowen
 * @Author URI: https://www.iowen.cn/
 * @Date: 2020-03-19 17:24:22
 * @LastEditors: iowen
 * @LastEditTime: 2022-08-05 23:40:56
 * @FilePath: \io-code-highlight\code-languages.php
 * @Description: 
 */

function io_code_languages() {
	$languages = array(
		'generic' 		=> __('通配','i_theme'),
		'php'			=> 'PHP',
		'css'			=> 'CSS',
		'scss'			=> 'scss/sass',
		'java'			=> 'Java',
		'javascript'	=> 'JavaScript',
		'yaml' 			=> 'yaml',
		'xml' 			=> 'xml/html',
		'visualbasic' 	=> 'visualbasic',
		'vhdl' 			=> 'vhdl',
		'typescript' 	=> 'TypeScript',
		'swift' 		=> 'swift',
		'squirrel' 		=> 'squirrel',
		'sql' 			=> 'sql',
		'shell' 		=> 'shell',
		'rust' 			=> 'rust',
		'ruby' 			=> 'ruby',
		'raw' 			=> 'raw',
		'python' 		=> 'python',
		'prolog' 		=> 'prolog',
		'powershell' 	=> 'PowerShell',
		'nsis' 			=> 'nsis',
		'markdown' 		=> 'Markdown',
		'matlab' 		=> 'MATLAB',
		'lua' 			=> 'lua',
		'less' 			=> 'less',
		'kotlin' 		=> 'kotlin',
		'json' 			=> 'json',
		'ini' 			=> 'ini/conf',
		'groovy' 		=> 'groovy',
		'go' 			=> 'go/golang',
		'dockerfile' 	=> 'docker',
		'diff' 			=> 'diff',
		'cordpro' 		=> 'cordpro',
		'cython' 		=> 'cython',
		'csharp' 		=> 'csharp',
		'cpp'			=> 'Cpp/C++/C',
		'avrassembly' 	=> 'avrassembly',
		'assembly' 		=> 'assembly',
	);
	/**
	 * 语法高亮列表筛选
	 *
	 * @since 2.0
	 *
	 * @param string $languages 支持的语言数组
	 */
	return apply_filters( 'io_code_language_list', $languages );
}
