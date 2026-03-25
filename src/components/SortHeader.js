"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SortHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var useTaskStore_1 = require("../store/useTaskStore");
function SortHeader(_a) {
    var label = _a.label, sortKey = _a.sortKey;
    var activeKey = (0, useTaskStore_1.useTaskStore)(function (s) { return s.sortKey; });
    var direction = (0, useTaskStore_1.useTaskStore)(function (s) { return s.sortDirection; });
    var setSort = (0, useTaskStore_1.useTaskStore)(function (s) { return s.setSort; });
    return ((0, jsx_runtime_1.jsxs)("button", { className: "font-semibold", onClick: function () { return setSort(sortKey); }, children: [label, " ", activeKey === sortKey ? (direction === "asc" ? "↑" : "↓") : ""] }));
}
