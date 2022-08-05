/*
 * @Author: iowen
 * @Author URI: https://www.iowen.cn/
 * @Date: 2020-05-23 12:23:12
 * @LastEditors: iowen
 * @LastEditTime: 2022-08-05 23:32:21
 * @FilePath: \io-code-highlight\assets\js\code-editor.js
 * @Description: 
 */
(function (blocks, blockEditor, element, components, escapeHtml) {
    "use strict"; 
    var el = element.createElement; 

    var registerBlockType = blocks.registerBlockType,
        createBlock = blocks.createBlock,
        PlainText = blockEditor.PlainText,
        Fragment = element.Fragment,
        InspectorControls = blockEditor.InspectorControls,
        PanelBody = components.PanelBody,
        TextControl = components.TextControl,
        RadioControl = components.RadioControl,
        Toolbar = components.ToolbarGroup,
        SelectControl = components.SelectControl,
        ToggleControl = components.ToggleControl,
        DropdownMenu = components.ToolbarDropdownMenu,
        BlockControls = blockEditor.BlockControls,
        escapeEditableHTML = escapeHtml.escapeEditableHTML ;
    
    registerBlockType("ioblock/enlighter",{
        title: "IO:高亮代码",
        icon: "editor-code",
        category: "io_block_cat",
        description: "输入代码，将自动高亮显示",
        keywords: ["code", "sourcecode", "代码"],
        attributes: { 
            content: {
                type: "string",
                selector: "pre.io-enlighter-pre",
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
                    isMatch: function(e) {
                        return "PRE" === e.nodeName && "io-enlighter-pre" === e.className
                    },
                    transform: function (e) {
                        e = e.firstChild;
                        var n = e.dataset.enlighterLinenumbers == "true" ? true : false;
                        return createBlock("ioblock/enlighter", {
                            content: e.textContent,
                            language: e.dataset.enlighterLanguage || "",
                            highlight: e.dataset.enlighterHighlight || "",
                            linenumbers: n,
                            lineoffset: e.dataset.enlighterLineoffset || ""
                        })
                    }
                }, {
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
        supports: {
            customClassName: !0,
            className: !1
        },
        edit: function(props) {
            var d = props.attributes,
                r = props.setAttributes;
            if (!d.language && io_code_default_lang) {
                d.language = io_code_default_lang;
            }
            if ( d.linenumbers==="" && io_code_default_numb!=="") {
                d.linenumbers = io_code_default_numb;
            }
            var sm = el(Toolbar, null, el(DropdownMenu, {
                className: "enlighter-dropdownmenu",
                icon: "embed-generic",
                label: "设置代码语言",
                text: d.language,
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
                value: d.content,
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
                            value: d.language,
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
                            checked: d.linenumbers,
                            onChange: function (e) {
                                return r({
                                    linenumbers: e
                                })
                            }
                        }),
                        el(TextControl, {
                            label: "起始行号",
                            value: d.lineoffset,
                            onChange: function (e) {
                                return r({
                                    lineoffset: e
                                })
                            },
                            placeholder: "输入行号。例：12"
                        }),
                        el(TextControl, {
                            label: "高亮行号",
                            value: d.highlight,
                            onChange: function (e) {
                                return r({
                                    highlight: e
                                })
                            },
                            placeholder: "格式：1,2,20-22"
                        })
                    )
                );
            return el(Fragment, null, el(BlockControls, null, sm),
                el("div", {
                        className: "io-enlighter-pre"
                    }, 
                    el("span", {
                        className: "enlighter-label"
                    }, d.language ),
                    sp
                ),
                sz
            )
        },
        save: function (props) {
            var d = props.attributes,
                e = props.className; 
            e = "io-enlighter-pre" + (e ? " " + e : "");
            var c = d.content ? escapeEditableHTML(d.content) : null;
            var t = el("code", {
                    className: "gl",
                    "data-enlighter-language": d.language,
                    "data-enlighter-linenumbers": d.linenumbers,
                    "data-enlighter-lineoffset": d.lineoffset,
                    "data-enlighter-highlight": d.highlight
                },
                c
            );
            return el("pre", {className: e}, t)
        }
    }); 
}(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.element,
    window.wp.components,
    window.wp.escapeHtml
));
    
