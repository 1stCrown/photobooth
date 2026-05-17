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
        /*
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
        */
        TakePicture();
        /*
        await new Promise(resolve => setTimeout(resolve, 500));
        flash.classList.add("removed");
        await new Promise(resolve => setTimeout(resolve, 500));
        timerText.classList.add('hidden');
        */
    }

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

    // draw cropped image
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

    // save final cropped image
    const image = canvas.toDataURL("image/png");

    photos.push(image);

    console.log("Photos:", photos);
}


