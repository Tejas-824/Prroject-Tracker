"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiltersFromQuery = getFiltersFromQuery;
exports.setQueryFromFilters = setQueryFromFilters;
function getFiltersFromQuery(search) {
    var _a, _b;
    var params = new URLSearchParams(search);
    var parseArray = function (key) { var _a, _b; return (_b = (_a = params.get(key)) === null || _a === void 0 ? void 0 : _a.split(",").filter(Boolean)) !== null && _b !== void 0 ? _b : []; };
    return {
        status: parseArray("status"),
        priority: parseArray("priority"),
        assignee: parseArray("assignee"),
        from: (_a = params.get("from")) !== null && _a !== void 0 ? _a : "",
        to: (_b = params.get("to")) !== null && _b !== void 0 ? _b : "",
    };
}
function setQueryFromFilters(filters) {
    var params = new URLSearchParams();
    var setArray = function (key, values) {
        if (values.length)
            params.set(key, values.join(","));
    };
    setArray("status", filters.status);
    setArray("priority", filters.priority);
    setArray("assignee", filters.assignee);
    if (filters.from)
        params.set("from", filters.from);
    if (filters.to)
        params.set("to", filters.to);
    return params.toString();
}
