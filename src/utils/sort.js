"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortTasks = sortTasks;
var priorityOrder = {
    Critical: 4,
    High: 3,
    Medium: 2,
    Low: 1,
};
function sortTasks(tasks, key, direction) {
    var mul = direction === "asc" ? 1 : -1;
    return __spreadArray([], tasks, true).sort(function (a, b) {
        switch (key) {
            case "title":
                return a.title.localeCompare(b.title) * mul;
            case "priority":
                return ((priorityOrder[b.priority] - priorityOrder[a.priority]) * mul);
            case "dueDate":
                return ((new Date(a.dueDate).getTime() -
                    new Date(b.dueDate).getTime()) * mul);
            default:
                return 0;
        }
    });
}
