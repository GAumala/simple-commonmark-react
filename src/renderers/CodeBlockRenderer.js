"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var CommonMarkRenderer_1 = require("./CommonMarkRenderer");
var CodeBlockRenderer = (function (_super) {
    __extends(CodeBlockRenderer, _super);
    function CodeBlockRenderer(node) {
        return _super.call(this, node) || this;
    }
    CodeBlockRenderer.prototype.findLanguageName = function () {
        var codeInfo = this.node.info ? this.node.info.split(/ +/) : [];
        if (codeInfo.length > 0 && codeInfo[0].length > 0)
            return codeInfo[0];
    };
    CodeBlockRenderer.prototype.resolveClassName = function (customProps) {
        var languageName = this.findLanguageName();
        var languageClass = languageName ? 'language-' + languageName + ' ' : '';
        var className = languageClass + (customProps.className || '');
        if (className.length > 0)
            return className;
    };
    CodeBlockRenderer.prototype.renderInnerCodeElement = function (props) {
        var codeText = this.node.literal;
        return react_1.createElement('code', props, codeText);
    };
    CodeBlockRenderer.prototype.renderNodeWithProps = function (props) {
        var className = this.resolveClassName(props);
        var codeChild = this.renderInnerCodeElement(props);
        return react_1.createElement('pre', __assign({}, props, { className: className }), codeChild);
    };
    return CodeBlockRenderer;
}(CommonMarkRenderer_1["default"]));
exports["default"] = CodeBlockRenderer;
