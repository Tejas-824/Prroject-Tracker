"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VirtualList;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var ROW_HEIGHT = 56;
var BUFFER = 5;
var CONTAINER_HEIGHT = 500;
function VirtualList(_a) {
    var tasks = _a.tasks, renderRow = _a.renderRow;
    var _b = (0, react_1.useState)(0), scrollTop = _b[0], setScrollTop = _b[1];
    var frameRef = (0, react_1.useRef)(null);
    var handleScroll = (0, react_1.useCallback)(function (e) {
        var nextScrollTop = e.currentTarget.scrollTop;
        if (frameRef.current !== null) {
            cancelAnimationFrame(frameRef.current);
        }
        frameRef.current = requestAnimationFrame(function () {
            setScrollTop(nextScrollTop);
        });
    }, []);
    (0, react_1.useEffect)(function () {
        return function () {
            if (frameRef.current !== null) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);
    var _c = (0, react_1.useMemo)(function () {
        var start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
        var end = Math.min(tasks.length, Math.ceil((scrollTop + CONTAINER_HEIGHT) / ROW_HEIGHT) + BUFFER);
        return {
            startIndex: start,
            endIndex: end,
            visibleItems: tasks.slice(start, end),
        };
    }, [scrollTop, tasks]), startIndex = _c.startIndex, endIndex = _c.endIndex, visibleItems = _c.visibleItems;
    var topSpace = startIndex * ROW_HEIGHT;
    var bottomSpace = (tasks.length - endIndex) * ROW_HEIGHT;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg overflow-auto bg-white", style: { height: CONTAINER_HEIGHT }, onScroll: handleScroll, children: [(0, jsx_runtime_1.jsx)("div", { style: { height: topSpace } }), visibleItems.map(function (task) { return renderRow(task); }), (0, jsx_runtime_1.jsx)("div", { style: { height: bottomSpace } })] }));
}
