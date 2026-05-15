// PREVIEW CARD
function buildPreviewCard(){
    previewCard.innerHTML = "";
    previewCard.classList.add("layout-box");
    previewCard.style.alignItems = layouts[selectedLayout].align;
    previewCard.style.flexDirection = layouts[selectedLayout].flex;
    previewCard.style.justifyContent = layouts[selectedLayout].start;
    //SIZE
    const parentHeight = previewCard.parentElement.clientHeight;
    const ratioW = layouts[selectedLayout].w;
    const ratioH = layouts[selectedLayout].h;
    const sizeMult = 75;
    const scaleMult = parentHeight / (ratioH * sizeMult);
    const boxWidth = (ratioW * sizeMult);
    const boxHeight = (ratioH * sizeMult);
    previewCard.style.width = boxWidth * scaleMult + "px";
    previewCard.style.height = boxHeight * scaleMult + "px";
    previewCard.style.gap = layouts[selectedLayout].gap * scaleMult + "px";
    previewCard.style.padding = layouts[selectedLayout].padding * scaleMult + "px";



    for (let i = 0 ; i < layouts[selectedLayout].shots; i++) {
        const div = document.createElement("div");

        div.style.width = "100%";
        div.style.aspectRatio = layouts[selectedLayout].shotRatio[i].w + "/" + layouts[selectedLayout].shotRatio[i].h;
        console.log("Aspect Ratio: " + layouts[selectedLayout].shotRatio[i].w + "/" + layouts[selectedLayout].shotRatio[i].h);
        div.classList.add("blank-photo");
        div.style.overflow = "hidden";
        div.style.alignContent = "center";
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";

        const img = document.createElement("img");
        img.src = photos[i];
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.objectPosition = "center";

        div.appendChild(img);
        previewCard.appendChild(div);
    }
}