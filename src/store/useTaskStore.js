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
exports.useTaskStore = void 0;
var zustand_1 = require("zustand");
var seed_1 = require("../data/seed");
var defaultFilters = {
    status: [],
    priority: [],
    assignee: [],
    from: "",
    to: "",
};
function arePresenceUsersEqual(a, b) {
    if (a === b)
        return true;
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; i++) {
        if (a[i].id !== b[i].id || a[i].name !== b[i].name)
            return false;
    }
    return true;
}
exports.useTaskStore = (0, zustand_1.create)(function (set) { return ({
    tasks: seed_1.seedTasks,
    view: "kanban",
    filters: defaultFilters,
    sortKey: "title",
    sortDirection: "asc",
    presence: [],
    setView: function (view) { return set(function (state) { return (state.view === view ? state : { view: view }); }); },
    setFilters: function (filters) { return set({ filters: filters }); },
    updateTaskStatus: function (taskId, status) {
        return set(function (state) {
            var changed = false;
            var updated = state.tasks.map(function (task) {
                if (task.id !== taskId)
                    return task;
                if (task.status === status)
                    return task;
                changed = true;
                return __assign(__assign({}, task), { status: status });
            });
            return changed ? { tasks: updated } : state;
        });
    },
    setSort: function (key) {
        return set(function (state) { return ({
            sortKey: key,
            sortDirection: state.sortKey === key && state.sortDirection === "asc"
                ? "desc"
                : "asc",
        }); });
    },
    setPresence: function (users) {
        return set(function (state) {
            return arePresenceUsersEqual(state.presence, users)
                ? state
                : { presence: users };
        });
    },
}); });
