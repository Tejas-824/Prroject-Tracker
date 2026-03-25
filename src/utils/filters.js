"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTasks = filterTasks;
function filterTasks(tasks, filters) {
    var statusSet = filters.status.length ? new Set(filters.status) : null;
    var prioritySet = filters.priority.length
        ? new Set(filters.priority)
        : null;
    var assigneeSet = filters.assignee.length
        ? new Set(filters.assignee)
        : null;
    var from = filters.from, to = filters.to;
    return tasks.filter(function (task) {
        if (statusSet && !statusSet.has(task.status))
            return false;
        if (prioritySet && !prioritySet.has(task.priority))
            return false;
        if (assigneeSet && !assigneeSet.has(task.assignee))
            return false;
        if (from && task.dueDate < from)
            return false;
        if (to && task.dueDate > to)
            return false;
        return true;
    });
}
