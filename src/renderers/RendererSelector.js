"use strict";
exports.__esModule = true;
var BoldRenderer_1 = require("./BoldRenderer");
var CodeRenderer_1 = require("./CodeRenderer");
var CodeBlockRenderer_1 = require("./CodeBlockRenderer");
var DocumentRenderer_1 = require("./DocumentRenderer");
var ItalicsRenderer_1 = require("./ItalicsRenderer");
var HeaderRenderer_1 = require("./HeaderRenderer");
var LineBreakRenderer_1 = require("./LineBreakRenderer");
var ParagraphRenderer_1 = require("./ParagraphRenderer");
var TextRenderer_1 = require("./TextRenderer");
var getRendererByNodeType = function (node) {
    switch (node.type) {
        case 'code':
            return new CodeRenderer_1["default"](node);
        case 'code_block':
            return new CodeBlockRenderer_1["default"](node);
        case 'document':
            return new DocumentRenderer_1["default"](node);
        case 'emph':
            return new ItalicsRenderer_1["default"](node);
        case 'heading':
            return new HeaderRenderer_1["default"](node);
        case 'paragraph':
            return new ParagraphRenderer_1["default"](node);
        case 'softbreak':
            return new LineBreakRenderer_1["default"](node);
        case 'strong':
            return new BoldRenderer_1["default"](node);
        case 'text':
            return new TextRenderer_1["default"](node);
        default:
            throw Error('Unsupported type: ' + node.type);
    }
};
exports["default"] = getRendererByNodeType;
