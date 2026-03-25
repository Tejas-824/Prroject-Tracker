"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TrackerPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var FilterBar_1 = require("../components/FilterBar");
var Header_1 = require("../components/Header");
var PresenceBar_1 = require("../components/PresenceBar");
var seed_1 = require("../data/seed");
var useTaskStore_1 = require("../store/useTaskStore");
var filters_1 = require("../utils/filters");
var sort_1 = require("../utils/sort");
var KanbanView_1 = require("../views/KanbanView");
var ListView_1 = require("../views/ListView");
var TimelineView_1 = require("../views/TimelineView");
function TrackerPage() {
    var tasks = (0, useTaskStore_1.useTaskStore)(function (s) { return s.tasks; });
    var view = (0, useTaskStore_1.useTaskStore)(function (s) { return s.view; });
    var filters = (0, useTaskStore_1.useTaskStore)(function (s) { return s.filters; });
    var sortKey = (0, useTaskStore_1.useTaskStore)(function (s) { return s.sortKey; });
    var sortDirection = (0, useTaskStore_1.useTaskStore)(function (s) { return s.sortDirection; });
    var setPresence = (0, useTaskStore_1.useTaskStore)(function (s) { return s.setPresence; });
    var processedTasks = (0, react_1.useMemo)(function () {
        var filtered = (0, filters_1.filterTasks)(tasks, filters);
        return (0, sort_1.sortTasks)(filtered, sortKey, sortDirection);
    }, [tasks, filters, sortKey, sortDirection]);
    (0, react_1.useEffect)(function () {
        if (!tasks.length)
            return;
        var interval = setInterval(function () {
            var activeUsers = seed_1.users.slice(0, 3).map(function (user) {
                var randomTask = tasks[Math.floor(Math.random() * tasks.length)];
                return __assign(__assign({}, user), { taskId: randomTask.id });
            });
            setPresence(activeUsers);
        }, 2500);
        return function () { return clearInterval(interval); };
    }, [setPresence]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 md:p-6 max-w-[1440px] mx-auto", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold mb-4", children: "Project Tracker" }), (0, jsx_runtime_1.jsx)(PresenceBar_1.default, {}), (0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(FilterBar_1.default, {}), view === "kanban" && (0, jsx_runtime_1.jsx)(KanbanView_1.default, { tasks: processedTasks }), view === "list" && (0, jsx_runtime_1.jsx)(ListView_1.default, { tasks: processedTasks }), view === "timeline" && (0, jsx_runtime_1.jsx)(TimelineView_1.default, { tasks: processedTasks })] }));
}
