"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitials = getInitials;
exports.isToday = isToday;
exports.overdueDays = overdueDays;
exports.formatDue = formatDue;
function getInitials(name) {
    return name
        .trim()
        .split(" ")
        .filter(Boolean)
        .map(function (item) { return item[0]; })
        .join("")
        .toUpperCase();
}
function getTodayStr() {
    var d = new Date();
    return "".concat(d.getFullYear(), "-").concat(String(d.getMonth() + 1).padStart(2, "0"), "-").concat(String(d.getDate()).padStart(2, "0"));
}
function isToday(dateStr) {
    return getTodayStr() === dateStr;
}
function overdueDays(dateStr) {
    var today = new Date();
    var due = new Date(dateStr);
    // normalize time to avoid partial day issues
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    var diff = today.getTime() - due.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}
function formatDue(dateStr) {
    if (isToday(dateStr))
        return "Due Today";
    var days = overdueDays(dateStr);
    if (days > 0) {
        if (days > 7)
            return "".concat(days, " days overdue");
        return "".concat(days, "d overdue");
    }
    return dateStr;
}
