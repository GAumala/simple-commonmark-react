"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var CommonMarkRenderer = (function () {
    function CommonMarkRenderer(node) {
        this.node = node;
    }
    CommonMarkRenderer.prototype.mergeCustomPropsWithDefaultProps = function (customProps, key) {
        return __assign({}, customProps, { key: key });
    };
    CommonMarkRenderer.prototype.renderNode = function (customProps, key) {
        var props = this.mergeCustomPropsWithDefaultProps(customProps, key);
        return this.renderNodeWithProps(props);
    };
    return CommonMarkRenderer;
}());
exports["default"] = CommonMarkRenderer;
