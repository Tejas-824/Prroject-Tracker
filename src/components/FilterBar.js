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
exports.default = FilterBar;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var seed_1 = require("../data/seed");
var useTaskStore_1 = require("../store/useTaskStore");
var query_1 = require("../utils/query");
var STATUSES = ["To Do", "In Progress", "In Review", "Done"];
var PRIORITIES = ["Critical", "High", "Medium", "Low"];
var EMPTY_FILTERS = {
    status: [],
    priority: [],
    assignee: [],
    from: "",
    to: "",
};
function FilterBar() {
    var location = (0, react_router_dom_1.useLocation)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var filters = (0, useTaskStore_1.useTaskStore)(function (state) { return state.filters; });
    var setFilters = (0, useTaskStore_1.useTaskStore)(function (state) { return state.setFilters; });
    (0, react_1.useEffect)(function () {
        var nextFilters = (0, query_1.getFiltersFromQuery)(location.search);
        var isSame = JSON.stringify(nextFilters) === JSON.stringify(filters);
        if (!isSame) {
            setFilters(nextFilters);
        }
    }, [location.search, filters, setFilters]);
    var updateUrl = (0, react_1.useCallback)(function (nextFilters) {
        var query = (0, query_1.setQueryFromFilters)(nextFilters);
        navigate(query ? "?".concat(query) : "", { replace: true });
    }, [navigate]);
    var updateMulti = (0, react_1.useCallback)(function (field, value) {
        var _a;
        var current = filters[field];
        var updated = current.includes(value)
            ? current.filter(function (item) { return item !== value; })
            : __spreadArray(__spreadArray([], current, true), [value], false);
        var next = __assign(__assign({}, filters), (_a = {}, _a[field] = updated, _a));
        setFilters(next);
        updateUrl(next);
    }, [filters, setFilters, updateUrl]);
    var updateDate = (0, react_1.useCallback)(function (field, value) {
        var _a;
        var next = __assign(__assign({}, filters), (_a = {}, _a[field] = value, _a));
        setFilters(next);
        updateUrl(next);
    }, [filters, setFilters, updateUrl]);
    var hasActive = (0, react_1.useMemo)(function () {
        return Boolean(filters.status.length ||
            filters.priority.length ||
            filters.assignee.length ||
            filters.from ||
            filters.to);
    }, [filters]);
    var clearAll = (0, react_1.useCallback)(function () {
        setFilters(EMPTY_FILTERS);
        navigate("", { replace: true });
    }, [navigate, setFilters]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white border rounded-lg p-4 mb-4 space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold mb-2", children: "Status" }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-2 flex-wrap", children: STATUSES.map(function (item) { return ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: function () { return updateMulti("status", item); }, className: "px-3 py-1 rounded-full border ".concat(filters.status.includes(item)
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white"), "aria-pressed": filters.status.includes(item), children: item }, item)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold mb-2", children: "Priority" }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-2 flex-wrap", children: PRIORITIES.map(function (item) { return ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: function () { return updateMulti("priority", item); }, className: "px-3 py-1 rounded-full border ".concat(filters.priority.includes(item)
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white"), "aria-pressed": filters.priority.includes(item), children: item }, item)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold mb-2", children: "Assignee" }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-2 flex-wrap", children: seed_1.users.map(function (user) { return ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: function () { return updateMulti("assignee", user.name); }, className: "px-3 py-1 rounded-full border ".concat(filters.assignee.includes(user.name)
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white"), "aria-pressed": filters.assignee.includes(user.name), children: user.name }, user.id)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3 flex-wrap items-end", children: [(0, jsx_runtime_1.jsxs)("label", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: "From" }), (0, jsx_runtime_1.jsx)("input", { type: "date", value: filters.from, onChange: function (e) { return updateDate("from", e.target.value); }, className: "border rounded-lg px-3 py-2" })] }), (0, jsx_runtime_1.jsxs)("label", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: "To" }), (0, jsx_runtime_1.jsx)("input", { type: "date", value: filters.to, onChange: function (e) { return updateDate("to", e.target.value); }, className: "border rounded-lg px-3 py-2" })] }), hasActive && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: clearAll, className: "px-4 py-2 bg-red-500 text-white rounded-lg", children: "Clear All Filters" }))] })] }));
}
