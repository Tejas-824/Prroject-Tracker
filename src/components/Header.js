"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
var jsx_runtime_1 = require("react/jsx-runtime");
var useTaskStore_1 = require("../store/useTaskStore");
function Header() {
    var view = (0, useTaskStore_1.useTaskStore)(function (s) { return s.view; });
    var setView = (0, useTaskStore_1.useTaskStore)(function (s) { return s.setView; });
    var btnClass = function (name) {
        return "px-4 py-2 rounded-lg border ".concat(view === name ? "bg-slate-900 text-white" : "bg-white");
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3 mb-4", children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () { return setView("kanban"); }, className: btnClass("kanban"), children: "Kanban" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setView("list"); }, className: btnClass("list"), children: "List" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setView("timeline"); }, className: btnClass("timeline"), children: "Timeline" })] }));
}
