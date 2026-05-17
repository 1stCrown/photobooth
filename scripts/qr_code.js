function generateQR(text) {

    const qrContainer = document.getElementById("qr-code");

    // IMPORTANT: clear previous QR
    qrContainer.innerHTML = "";

    new QRCode(qrContainer, {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}