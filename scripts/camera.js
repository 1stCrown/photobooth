navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
})
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.log("Camera error:", error);
    });


//BETTER DROP DOWN
for (const [key, timer] of Object.entries(timers)) {
    timer.addEventListener("click", function () {
        document.getElementById("set-timer-text").textContent = key + " SECONDS";
        selectedTime = key;
        console.log("Selected Time: " + selectedTime);

        timerDropdown.classList.remove("removed");
        timerOptions.classList.add("removed");
    })
}

timerDropdown.addEventListener("click", function () {
    timerOptions.classList.remove("removed");
    timerDropdown.classList.add("removed");
})

//CAPTURE
document.getElementById("capture").addEventListener("click", async function () {
    if (selectedTime <= 0) selectedTime = 10;
    photos.length = 0;

    for (let i = layouts[selectedLayout].shots; i > 0; i--) {

        console.log(i);
        frame.classList.remove("hidden");
        Frame();
        
        timerText.textContent = "CAMERA";
        timerText.classList.remove('hidden');
        await new Promise(resolve => setTimeout(resolve, 1000));
        for (let j = selectedTime; j > 0; j--) {
            timerText.textContent = j;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        timerText.textContent = "FLASH";
        flash.classList.remove("removed");
        flash.style.animation = "flashFade 600ms ease-out";
        
        TakePicture();
        
        await new Promise(resolve => setTimeout(resolve, 500));
        flash.classList.add("removed");
        await new Promise(resolve => setTimeout(resolve, 500));
        timerText.classList.add('hidden');
        
    }
    frame.classList.add("hidden");

    HideCamera();
    buildPreviewCard();
    ShowPreview();

});

//TAKE A PICTURE
function TakePicture() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const shotIndex = photos.length;

    const ratioW = layouts[selectedLayout].shotRatio[shotIndex].w;
    const ratioH = layouts[selectedLayout].shotRatio[shotIndex].h;

    const outputHeight = video.videoHeight;
    const outputWidth = (outputHeight / ratioH) * ratioW;

    canvas.width = outputWidth;
    canvas.height = outputHeight;


    canvas.width = outputWidth;
    canvas.height = outputHeight;

    // webcam dimensions
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // desired aspect ratio
    const targetRatio = ratioW / ratioH;

    let cropWidth;
    let cropHeight;
    let cropX;
    let cropY;

    // crop video to match target ratio
    if (videoWidth / videoHeight > targetRatio) {

        // video too wide
        cropHeight = videoHeight;
        cropWidth = cropHeight * targetRatio;

        cropX = (videoWidth - cropWidth) / 2;
        cropY = 0;

    } else {

        // video too tall
        cropWidth = videoWidth;
        cropHeight = cropWidth / targetRatio;

        cropX = 0;
        cropY = (videoHeight - cropHeight) / 2;
    }

    // draw webcam frame
    ctx.filter = effects[selectedEffect]?.filter || "none";
    ctx.drawImage(
        video,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        outputWidth,
        outputHeight
    );
    ctx.filter = "none";

    // apply blend effect
    const effectOption = effects[selectedEffect];
    if (effectOption.blendmode) {
        ctx.globalCompositeOperation = effectOption.blendmode;
        ctx.fillStyle = effectOption.blendcolor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // save final cropped image
    const image = canvas.toDataURL("image/png");

    photos.push(image);

    console.log("Photos:", photos);
}

// FILTER
for (const [key, effectOption] of Object.entries(effects)) {
    const filterOption = document.createElement("div");
    filterOption.classList.add("button-square");

    const sample = document.createElement("img");
    sample.src = "assets/sample.jpg";
    sample.style.width = "100%";
    sample.style.height = "100%";
    sample.style.objectFit = "cover";

    sample.style.position = "absolute";
    sample.style.top = 0;
    sample.style.left = 0;

    filterOption.style.position = "relative";
    filterOption.style.overflow = "hidden";
    filterOption.style.isolation = "isolate";

    filterOption.appendChild(sample);

    if (effectOption.blendmode) {
        const blendmode = document.createElement("div");

        blendmode.style.width = "100%";
        blendmode.style.height = "100%";

        blendmode.style.position = "absolute";
        blendmode.style.top = 0;
        blendmode.style.left = 0;

        blendmode.style.backgroundColor = effectOption.blendcolor;
        blendmode.style.mixBlendMode = effectOption.blendmode;
        filterOption.appendChild(blendmode);
    }
    if (effectOption.filter) {
        sample.style.filter = effectOption.filter;
    }
    filterOption.addEventListener("click", function () {
        selectedEffect = key;
        console.log("Selected Effect: " + selectedEffect);
        // Add visual feedback for selected effect
        document.querySelectorAll('.button-square').forEach(el => el.classList.remove('selected'));
        filterOption.classList.add('selected');

        for (const rule of sheet.cssRules) {
            if (rule.selectorText === ".effect") {
                rule.style.mixBlendMode = "";
                rule.style.backgroundColor = "";
            }
            if (rule.selectorText === ".filter") {
                rule.style.filter = "";
            }
        }

        if (effectOption.blendmode) {
            for (const rule of sheet.cssRules) {
                if (rule.selectorText === ".effect") {
                    rule.style.mixBlendMode = effectOption.blendmode;
                    rule.style.backgroundColor = effectOption.blendcolor;
                }
            }
        }
        if (effectOption.filter) {
            for (const rule of sheet.cssRules) {
                if (rule.selectorText === ".filter") {
                    rule.style.filter = effectOption.filter;
                }
            }
        }

    });
    effectOptions.appendChild(filterOption);
}

// FRAME
function Frame(){

    const captureheight = document.documentElement.scrollHeight * 0.9;
    const capturewidth = layouts[selectedLayout].shotRatio[photos.length].w / layouts[selectedLayout].shotRatio[photos.length].h * captureheight;
    frame.style.width = capturewidth + "px";
    frame.style.height = captureheight + "px";

    const smallerDimension = Math.min(capturewidth, captureheight);
    const borderLength = smallerDimension * 0.3;

    for (const border of borders) {
        border.style.width = borderLength + "px";
        border.style.height = borderLength + "px";
    }
}

