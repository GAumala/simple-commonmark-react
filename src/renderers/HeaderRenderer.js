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
var react_1 = require("react");
var CommonMarkRenderer_1 = require("./CommonMarkRenderer");
var HeaderRenderer = (function (_super) {
    __extends(HeaderRenderer, _super);
    function HeaderRenderer(node) {
        var _this = _super.call(this, node) || this;
        _this.elementName = 'h' + node.level;
        return _this;
    }
    HeaderRenderer.prototype.renderNodeWithProps = function (props) {
        return react_1.createElement(this.elementName, props, []);
    };
    return HeaderRenderer;
}(CommonMarkRenderer_1["default"]));
exports["default"] = HeaderRenderer;
