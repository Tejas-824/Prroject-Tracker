"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Avatar;
var jsx_runtime_1 = require("react/jsx-runtime");
var date_1 = require("../utils/date");
function Avatar(_a) {
    var name = _a.name, _b = _a.color, color = _b === void 0 ? "#334155" : _b, small = _a.small;
    return ((0, jsx_runtime_1.jsx)("div", { className: "rounded-full text-white flex items-center justify-center font-bold ".concat(small ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm"), style: { background: color }, children: (0, date_1.getInitials)(name) }));
}
