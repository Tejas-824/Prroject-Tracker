"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TaskCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var Avatar_1 = require("./Avatar");
var date_1 = require("../utils/date");
var useTaskStore_1 = require("../store/useTaskStore");
var priorityClass = {
    Critical: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
};
function TaskCard(_a) {
    var task = _a.task;
    var allPresence = (0, useTaskStore_1.useTaskStore)(function (state) { return state.presence; });
    var presence = allPresence.filter(function (item) { return item.taskId === task.id; });
    var overdue = (0, date_1.overdueDays)(task.dueDate) > 0;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white border rounded-xl p-3 shadow-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-sm", children: task.title }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs px-2 py-1 rounded-full ".concat(priorityClass[task.priority]), children: task.priority })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mt-3", children: [(0, jsx_runtime_1.jsx)(Avatar_1.default, { name: task.assignee, small: true }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs ".concat(overdue ? "text-red-600 font-semibold" : "text-slate-500"), children: (0, date_1.formatDue)(task.dueDate) })] }), presence.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex -space-x-2 mt-3", children: [presence.slice(0, 2).map(function (user) { return ((0, jsx_runtime_1.jsx)(Avatar_1.default, { name: user.name, color: user.color, small: true }, user.id)); }), presence.length > 2 && ((0, jsx_runtime_1.jsxs)("div", { className: "w-7 h-7 rounded-full bg-slate-200 text-xs flex items-center justify-center border", children: ["+", presence.length - 2] }))] }))] }));
}
