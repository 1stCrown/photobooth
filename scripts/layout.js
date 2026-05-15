// Generate layout options
for (const [key, layout] of Object.entries(layouts)) {
    //CREATE LAYOUT OPTION
    const layoutOption = document.createElement("div");

    const layoutBox = document.createElement("div");
    layoutBox.classList.add("layout-box");
    layoutBox.style.gap = layout.gap + "px";
    const sizeMult = 75;
    const boxWidth = (layout.w * sizeMult);
    const boxHeight = (layout.h * sizeMult)
    layoutBox.style.width = boxWidth + "px";
    layoutBox.style.height = boxHeight + "px";
    layoutBox.style.padding = layout.padding + "px";
    layoutBox.style.alignItems = layout.align;
    layoutBox.style.flexDirection = layout.flex;
    layoutBox.style.justifyContent = layout.start;

    //ADD LSITENER EVENT TO LAYOUT OPTION
    layoutBox.addEventListener("click", function () {
        selectedLayout = key;
        console.log("Layout Selected: " + selectedLayout)
        HideLayout();
        ShowCamera();
        
    })

    //TEXT BOX
    const textInfo = document.createElement("div");
    textInfo.style.justifyItems = "center";

    const fontName = document.createElement("h4");
    fontName.classList.add("semi-bold");
    fontName.textContent = layout.font;
    textInfo.appendChild(fontName);

    const size = document.createElement("p");
    size.textContent = "Size " + layout.w + "x" + layout.h + " Strip";
    textInfo.appendChild(size);

    const numShots = document.createElement("p");
    numShots.textContent = layout.shots + " poses";
    textInfo.appendChild(numShots);

    //APPEND
    layoutOption.appendChild(layoutBox);
    layoutOption.appendChild(textInfo);
    layoutOptions.appendChild(layoutOption);

    for (let i = 0; i < layout.shots; i++) {
        const blankPhoto = document.createElement("div");

        if (layout.flex === "column") {
            const photoWidth = boxWidth - layout.padding * 2;
            const photoHeight = (photoWidth / layout.shotRatio[i].w) * layout.shotRatio[i].h;
            blankPhoto.style.width = photoWidth + "px";
            blankPhoto.style.height = photoHeight + "px";
        } else {
            const photoHeight = boxHeight - layout.padding * 2;
            const photoWidth = (photoHeight / layout.shotRatio[i].h) * layout.shotRatio[i].w;
            blankPhoto.style.width = photoWidth + "px";
            blankPhoto.style.height = photoHeight + "px";
        }
        blankPhoto.classList.add("blank-photo");
        

        layoutBox.appendChild(blankPhoto);
    }
}


// HIDE LAYOUT
function HideLayout(){
    layoutSelection.classList.add("hidden");
    //backgroundGradient.classList.add("hidden");
}
// SHOW LAYOUT
function ShowLayout(){
    layoutSelection.classList.remove("hidden");
    //backgroundGradient.classList.remove("hidden");
}
// HIDE CAMERA
function HideCamera(){
    video.classList.add("hidden");
    boothMenu.classList.add("hidden");
}
// SHOW CAMERA
function ShowCamera(){
    video.classList.remove("hidden");
    boothMenu.classList.remove("hidden");
}

// HIDE PREVIEW
function HidePreview(){

}
// SHOW PREVIEW
function ShowPreview(){
    preview.classList.remove("hidden")
}