selectedLayout = "";
const layouts = {
    'A': { w: 2, h: 6, shots: 4, shotRatio: [{ w: 6, h: 4 }, { w: 6, h: 4 }, { w: 6, h: 4 }, { w: 6, h: 4 },], flex: "column", start: "flex-start", gap: 10, padding: 10, font: "Font ba to ?" },
    'B': { w: 2, h: 6, shots: 3, shotRatio: [{ w: 4, h: 6 }, { w: 6, h: 4 }, { w: 6, h: 4 }],                  flex: "column", start: "flex-start", gap: 10, padding: 10, font: "Font ba to ?" },
    'C': { w: 2, h: 6, shots: 4, shotRatio: [{ w: 1, h: 1 }, { w: 6, h: 4 }, { w: 6, h: 4 }, { w: 6, h: 4 }],  flex: "column", start: "flex-start", gap: 10, padding: 10, font: "Font ba to ?" },
    'D': { w: 2, h: 6, shots: 2, shotRatio: [{ w: 4, h: 6 }, { w: 4, h: 6 }],                                  flex: "column", start: "flex-start", gap: 10, padding: 10, font: "Font ba to ?" },
    'E': { w: 2, h: 6, shots: 3, shotRatio: [{ w: 6, h: 4 }, { w: 4, h: 6 }, { w: 6, h: 4 }],                  flex: "column", start: "flex-start", gap: 10, padding: 10, font: "Font ba to ?" },
    'F': { w: 2, h: 6, shots: 4, shotRatio: [{ w: 6, h: 4 }, { w: 6, h: 4 }, { w: 6, h: 4 }, { w: 6, h: 4 },], flex: "column", start: "flex-end",   gap: 10, padding: 10, font: "Font ba to ?" },
    'G': { w: 2, h: 6, shots: 3, shotRatio: [{ w: 4, h: 6 }, { w: 6, h: 4 }, { w: 6, h: 4 }],                  flex: "column", start: "flex-end",   gap: 10, padding: 10, font: "Font ba to ?" },
    'H': { w: 2, h: 6, shots: 4, shotRatio: [{ w: 1, h: 1 }, { w: 6, h: 4 }, { w: 6, h: 4 }, { w: 6, h: 4 }],  flex: "column", start: "flex-end",   gap: 10, padding: 10, font: "Font ba to ?" },
    'I': { w: 2, h: 6, shots: 2, shotRatio: [{ w: 4, h: 6 }, { w: 4, h: 6 }],                                  flex: "column", start: "flex-end",   gap: 10, padding: 10, font: "Font ba to ?" },
    'J': { w: 2, h: 6, shots: 3, shotRatio: [{ w: 6, h: 4 }, { w: 4, h: 6 }, { w: 6, h: 4 }],                  flex: "column", start: "flex-end",   gap: 10, padding: 10, font: "Font ba to ?" },
};