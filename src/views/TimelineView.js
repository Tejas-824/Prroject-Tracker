"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TimelineView;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = require("react");
var colors = {
    Critical: "bg-red-500",
    High: "bg-orange-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
};
function TimelineView(_a) {
    var tasks = _a.tasks;
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    return ((0, jsx_runtime_1.jsx)("div", { className: "overflow-auto border rounded-xl bg-white", children: (0, jsx_runtime_1.jsx)("div", { className: "min-w-[1200px]", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid", style: {
                    gridTemplateColumns: "220px repeat(".concat(daysInMonth, ", minmax(40px, 1fr))"),
                }, children: [(0, jsx_runtime_1.jsx)("div", { className: "p-3 font-bold border-b", children: "Task" }), Array.from({ length: daysInMonth }).map(function (_, i) { return ((0, jsx_runtime_1.jsx)("div", { className: "p-2 text-center text-sm border-b", children: i + 1 }, i)); }), tasks.map(function (task) {
                        var due = new Date(task.dueDate).getDate();
                        var start = task.startDate
                            ? new Date(task.startDate).getDate()
                            : due;
                        return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "p-3 border-b text-sm", children: task.title }), Array.from({ length: daysInMonth }).map(function (_, i) {
                                    var day = i + 1;
                                    var show = day >= start && day <= due;
                                    return ((0, jsx_runtime_1.jsx)("div", { className: "border-b border-l h-12", children: show && ((0, jsx_runtime_1.jsx)("div", { className: "h-6 mt-3 rounded ".concat(colors[task.priority]) })) }, i));
                                })] }, task.id));
                    })] }) }) }));
}
