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

        timerDropdown.classList.remove("hidden");
        timerOptions.classList.add("hidden");
    })
}

timerDropdown.addEventListener("click", function () {
    timerOptions.classList.remove("hidden");
    timerDropdown.classList.add("hidden");
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
        flash.classList.remove("hidden");
        flash.style.animation = "flashFade 600ms ease-out";
        */
        TakePicture();
        /*
        await new Promise(resolve => setTimeout(resolve, 500));
        flash.classList.add("hidden");
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

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/png");

    photos.push(image);

    console.log("Photos:", photos);
}


