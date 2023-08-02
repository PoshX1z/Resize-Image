const uploadBox = document.querySelector(".upload-box"),
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download-btn");
let ogImageRatio;

const loadFile = (e) =>{
    const file = e.target.files[0]; //getting user select file
    if(!file) return; //If user not select file, return empty
    previewImg.src = URL.createObjectURL(file); //putting url to preview image
    previewImg.addEventListener("load", () => { //once img load
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    })
}

widthInput.addEventListener("keyup", () => {
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
})

heightInput.addEventListener("keyup", () => {
    const width = ratioInput.checked ? heightInput.value / ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
})

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    const imgQuality = qualityInput.checked ? 0.7 : 1.0;
    //settng canvas width & height according to input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL("image/png", imgQuality);
    a.download = new Date().getTime(); 
    a.click();
}
fileInput.addEventListener("change", loadFile)
uploadBox.addEventListener("click", () => fileInput.click());
downloadBtn.addEventListener("click", resizeAndDownload);