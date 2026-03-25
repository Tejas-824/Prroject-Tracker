"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTasks = generateTasks;
var titles = [
    "Design dashboard",
    "Fix login bug",
    "Create API docs",
    "Build table view",
    "Update timeline",
    "Test filters",
    "Refactor card layout",
    "Prepare release",
    "Check drag logic",
    "Improve UI spacing",
];
var assignees = ["Aman", "Priya", "Ravi", "Neha", "Karan", "Sneha"];
var priorities = ["Critical", "High", "Medium", "Low"];
var statuses = ["To Do", "In Progress", "In Review", "Done"];
function randomIndex(length) {
    return Math.floor(Math.random() * length);
}
function randomItem(arr) {
    return arr[randomIndex(arr.length)];
}
function pad2(value) {
    return value < 10 ? "0".concat(value) : String(value);
}
function formatDateParts(year, month, day) {
    return "".concat(year, "-").concat(pad2(month + 1), "-").concat(pad2(day));
}
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
function generateTasks(count) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var daysInMonth = getDaysInMonth(year, month);
    return Array.from({ length: count }, function (_, index) {
        var i = index + 1;
        var hasStartDate = Math.random() >= 0.15;
        var startDate = null;
        var dueDate;
        if (hasStartDate) {
            var startDay = randomIndex(daysInMonth) + 1;
            var maxDuration = Math.min(7, daysInMonth - startDay);
            var duration = randomIndex(maxDuration + 1);
            var dueDay = startDay + duration;
            startDate = formatDateParts(year, month, startDay);
            dueDate = formatDateParts(year, month, dueDay);
        }
        else {
            var dueDay = randomIndex(daysInMonth) + 1;
            dueDate = formatDateParts(year, month, dueDay);
        }
        return {
            id: "task-".concat(i),
            title: "".concat(randomItem(titles), " ").concat(i),
            assignee: randomItem(assignees),
            priority: randomItem(priorities),
            status: randomItem(statuses),
            startDate: startDate,
            dueDate: dueDate,
        };
    });
}
