"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useTaskStore_1 = require("../store/useTaskStore");
var Avatar_1 = require("./Avatar");
function PresenceBarComponent() {
    var presence = (0, useTaskStore_1.useTaskStore)(function (state) { return state.presence; });
    var count = presence.length;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white border rounded-lg p-3 flex items-center justify-between mb-4", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-sm font-medium", children: [count, " ", count === 1 ? "person is" : "people are", " viewing this board"] }), (0, jsx_runtime_1.jsx)("div", { className: "flex -space-x-2", "aria-label": "".concat(count, " active users viewing this board"), children: presence.map(function (user) { return ((0, jsx_runtime_1.jsx)(Avatar_1.default, { name: user.name, color: user.color, small: true }, user.id)); }) })] }));
}
var PresenceBar = (0, react_1.memo)(PresenceBarComponent);
exports.default = PresenceBar;
