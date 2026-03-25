"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ListView;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var VirtualList_1 = require("../components/VirtualList");
var SortHeader_1 = require("../components/SortHeader");
var useTaskStore_1 = require("../store/useTaskStore");
var STATUS_OPTIONS = [
    "To Do",
    "In Progress",
    "In Review",
    "Done",
];
function ListView(_a) {
    var tasks = _a.tasks;
    var updateTaskStatus = (0, useTaskStore_1.useTaskStore)(function (state) { return state.updateTaskStatus; });
    var setFilters = (0, useTaskStore_1.useTaskStore)(function (state) { return state.setFilters; });
    var clearFilters = (0, react_1.useCallback)(function () {
        setFilters({
            status: [],
            priority: [],
            assignee: [],
            from: "",
            to: "",
        });
    }, [setFilters]);
    var renderRow = (0, react_1.useCallback)(function (task) { return ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 gap-4 items-center px-3 h-14 border-b bg-white", children: [(0, jsx_runtime_1.jsx)("div", { className: "truncate", children: task.title }), (0, jsx_runtime_1.jsx)("div", { children: task.priority }), (0, jsx_runtime_1.jsx)("div", { children: task.dueDate }), (0, jsx_runtime_1.jsx)("select", { value: task.status, onChange: function (e) {
                    return updateTaskStatus(task.id, e.target.value);
                }, className: "border rounded-lg px-2 py-1 bg-white", "aria-label": "Change status for ".concat(task.title), children: STATUS_OPTIONS.map(function (status) { return ((0, jsx_runtime_1.jsx)("option", { value: status, children: status }, status)); }) })] }, task.id)); }, [updateTaskStatus]);
    if (tasks.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white border rounded-xl p-8 text-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-semibold mb-2", children: "No tasks found" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-500 mb-4", children: "Clear filters to see all tasks." }), (0, jsx_runtime_1.jsx)("button", { onClick: clearFilters, className: "px-4 py-2 rounded-lg bg-slate-900 text-white", children: "Clear filters" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 gap-4 bg-slate-200 p-3 rounded-t-lg font-semibold", children: [(0, jsx_runtime_1.jsx)(SortHeader_1.default, { label: "Title", sortKey: "title" }), (0, jsx_runtime_1.jsx)(SortHeader_1.default, { label: "Priority", sortKey: "priority" }), (0, jsx_runtime_1.jsx)(SortHeader_1.default, { label: "Due Date", sortKey: "dueDate" }), (0, jsx_runtime_1.jsx)("div", { children: "Status" })] }), (0, jsx_runtime_1.jsx)(VirtualList_1.default, { tasks: tasks, renderRow: renderRow })] }));
}
