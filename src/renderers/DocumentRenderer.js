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
exports.__esModule = true;
var CommonMarkRenderer_1 = require("./CommonMarkRenderer");
var DocumentRenderer = (function (_super) {
    __extends(DocumentRenderer, _super);
    function DocumentRenderer(node) {
        return _super.call(this, node) || this;
    }
    DocumentRenderer.prototype.renderNodeWithProps = function (props) {
        return null; //ignore this type of node
    };
    return DocumentRenderer;
}(CommonMarkRenderer_1["default"]));
exports["default"] = DocumentRenderer;