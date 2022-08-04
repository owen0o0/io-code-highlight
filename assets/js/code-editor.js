/*
 * @Author: iowen
 * @Author URI: https://www.iowen.cn/
 * @Date: 2022-08-03 18:23:12
 * @LastEditors: iowen
 * @LastEditTime: 2022-08-04 06:08:31
 * @FilePath: \io-code-highlight\assets\js\code-editor.js
 * @Description: 
 */
(function (blocks, blockEditor, element, components) {
    var el = element.createElement; //用于输出HTML

    var registerBlockType = blocks.registerBlockType,
        createBlock = blocks.createBlock,
        PlainText = blockEditor.PlainText,
        Fragment = element.Fragment,
        InspectorControls = blockEditor.InspectorControls,
        PanelBody = components.PanelBody,
        TextControl = components.TextControl,
        RadioControl = components.RadioControl,
        Toolbar = components.Toolbar,
        SelectControl = components.SelectControl,
        ToggleControl = components.ToggleControl
        DropdownMenu = components.DropdownMenu,
        BlockControls = blockEditor.BlockControls;

    registerBlockType("ioblock/enlighter", {
        title: "IO:高亮代码",
        icon: "editor-code",
        category: "io_block_cat",
        description: "输入代码，将自动高亮显示",
        keywords: ["code", "代码"],
        attributes: { 
            content: {
                type: "string",
                selector: "code.gl",
                source: "text"
            },
            language: {
                type: "string",
                attribute: "data-enlighter-language",
                default: ""
            },
            linenumbers: {
                type: "boolean",
                attribute: "data-enlighter-linenumbers",
                default: ""
            },
            lineoffset: {
                type: "string",
                attribute: "data-enlighter-lineoffset",
                default: ""
            },
            highlight: {
                type: "string",
                attribute: "data-enlighter-highlight",
                default: ""
            }
        },
        transforms: {
            from: [
                {
                    type: "raw",
                    priority: 4,
                    isMatch: function (e) {
                        return "PRE" === e.nodeName && 1 === e.children.length && "CODE" === e.firstChild.nodeName
                    },
                    transform: function (e) {
                        return createBlock("ioblock/enlighter", {
                            content: e.textContent
                        })
                    }
                }, {
                    type: "block",
                    blocks: ["core/code", "core/preformatted", "core/paragraph"],
                    transform: function (e) {
                        var t = e.content;
                        return createBlock("ioblock/enlighter", {
                            content: t
                        })
                    }
                }
            ],
            to: [
                {
                    type: "block",
                    blocks: ["core/code"],
                    transform: function (e) {
                        var t = e.content;
                        return createBlock("core/code", {
                            content: t
                        })
                    }
                }, {
                    type: "block",
                    blocks: ["core/preformatted"],
                    transform: function (e) {
                        var t = e.content;
                        return createBlock("core/preformatted", {
                            content: t
                        })
                    }
                }
            ]
        },
        edit: function (props) {
            var r = props.setAttributes;
            const { content, language, linenumbers, lineoffset, highlight } = props.attributes;
            if (!language && io_code_default_lang) {
                r({language: io_code_default_lang});
            }
            if ( linenumbers==="" && io_code_default_numb!=="") {
                r({ linenumbers: io_code_default_numb });
            }
            var sm = el(Toolbar, null, el(DropdownMenu, {
                className: "enlighter-dropdownmenu",
                icon: "embed-generic",
                label: "设置代码语言",
                controls: Object.keys(io_code_languages).map(
                        (lang) => ({
                            title: io_code_languages[lang],
                            value: lang,
                            onClick: function () {
                                return r({
                                    language: lang
                                })
                            }
                        })
                    ) 
                }
            ));
            var sp = el(PlainText, {
                value: content,
                placeholder: "请输入代码...",
                "aria-label": "Code",
                onChange: function (e) {
                    return r({
                        content: e
                    })
                }
            }),
                sz = el(InspectorControls, null,
                    el(
                        PanelBody, {
                            title: "代码设置"
                        },
                        el(SelectControl, {
                            label: "代码语言",
                            value: language,
                            options: [
                                {
                                    label: "选择代码语言",
                                    value: "",
                                },
                            ].concat(
                                Object.keys(io_code_languages).map(
                                    (lang) => ({
                                        label: io_code_languages[lang],
                                        value: lang,
                                    })
                                )
                            ),
                            onChange: function (e) {
                                return r({
                                    language: e
                                })
                            }
                        }),
                        el(ToggleControl, {
                            label: "显示行号",
                            checked: linenumbers,
                            onChange: function (e) {
                                return r({
                                    linenumbers: e
                                })
                            }
                        }),
                        el(TextControl, {
                            label: "起始行号",
                            value: lineoffset,
                            onChange: function (e) {
                                return r({
                                    lineoffset: e
                                })
                            },
                            placeholder: "输入行号。例：12"
                        }),
                        el(TextControl, {
                            label: "高亮行号",
                            value: highlight,
                            onChange: function (e) {
                                return r({
                                    highlight: e
                                })
                            },
                            placeholder: "格式：1,2,20-22"
                        })
                    )
                );
            return el("div", null, el(Fragment, null, el(BlockControls, null, sm)),
                el("div", {
                        className: "enlighter-block-wrapper"
                    },
                    el("div", {
                            className: "enlighter-header"
                        },
                        el("div", {
                            className: "enlighter-title"
                        })
                    ),
                    el("pre", {
                            tagName: "pre",
                            className: "enlighter-pre",
                        },
                        el("span", {
                            className: "enlighter-label"
                        }, language), sp
                    ),
                    el("div", {
                        className: "enlighter-footer"
                    }), sz
                )
            )
        },
        save: function (props) {
            const { content, language, linenumbers, lineoffset, highlight } = props.attributes;
            var tt = el("code", {
                    className: "gl",
                    "data-enlighter-language": language,
                    "data-enlighter-linenumbers": linenumbers,
                    "data-enlighter-lineoffset": lineoffset,
                    "data-enlighter-highlight": highlight
                },
                content);
            return el("pre", {}, tt)
        }
    });
}(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.element,
    window.wp.components,
));
    