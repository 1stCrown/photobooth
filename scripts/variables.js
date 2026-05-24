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

// LAYOUT SELECTION
const layoutOptions =       document.getElementById("layout-options");
const layoutSelection =     document.getElementById("layout-selection");
const backgroundGradient =  document.getElementById("back-gradient");

// CAMERA MODE
const video =               document.getElementById("camera-bg");
const boothMenu =           document.getElementById("booth-menu");
const timerDropdown =       document.getElementById("selected");
const timerOptions =        document.getElementById("set-timer-dropdown");
const timerText =           document.getElementById("timer");
const flash =               document.getElementById("flash");
const effect =              document.getElementById("effect");
const effectOptions =       document.getElementById("effects-options");
const samplePhoto =         document.getElementById("sample-photo");
const frame =               document.getElementById("frame");
const borders = [
                            document.getElementById("top-left"),
                            document.getElementById("top-right"),
                            document.getElementById("bottom-left"),
                            document.getElementById("bottom-right"),
];
const sheet =               document.styleSheets[0];
const photos = [];
selectedTime = 0;
selectedEffect = "0";
const timers = {
    10: document.getElementById("10 sec"),
    5:  document.getElementById("5 sec"),
    3:  document.getElementById("3 sec"),
};
const effects = {

    "none": {},

    // PRIMARY COLORS
    "red": {
        blendmode: "multiply",
        blendcolor: "rgba(255,0,0,0.25)"
    },

    "blue": {
        blendmode: "multiply",
        blendcolor: "rgba(0,120,255,0.25)"
    },


    // SECONDARY COLORS
    "green": {
        blendmode: "multiply",
        blendcolor: "rgba(0,255,120,0.25)"
    },

    "purple": {
        blendmode: "overlay",
        blendcolor: "rgba(150,0,255,0.25)"
    },

    // POPULAR EFFECTS
    "vintage": {
        filter: "sepia(0.6) contrast(1.15) brightness(0.95) saturate(0.8)"
    },

    "black&white": {
        filter: "grayscale(1) contrast(1.1)"
    },

    "vhs": {
        filter: "contrast(1.4) saturate(1.5) hue-rotate(-10deg)"
    },

    "cinematic": {
        filter: "contrast(1.25) brightness(0.9) saturate(0.85)"
    },

    "highcontrast": {
        filter: "contrast(1.8) saturate(1.2)"
    },

    "washedout": {
        filter: "brightness(1.15) contrast(0.8) saturate(0.7)"
    }
};

// PREVIEW
const preview =             document.getElementById("preview");
const previewCard =         document.getElementById("card-preview");
const backToLayout =        document.getElementById("back-to-layout");
const retakePhoto =         document.getElementById("retake-photo");
const savePhoto =           document.getElementById("save-photo");