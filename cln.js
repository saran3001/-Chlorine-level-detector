const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const result = document.getElementById('result');

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        alert('Error accessing camera: ' + err);
    }
}

function rgbToHue(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, d = max - min;

    if (d === 0) h = 0;
    else if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    return h;
}

function detectChlorineLevel(imageData) {
    const data = imageData.data;
    let hueSum = 0;
    let count = 0;

    // Average hue from center area of canvas (where strip is expected)
    const width = imageData.width;
    const height = imageData.height;

    // Define center area box
    const startX = Math.floor(width * 0.4);
    const endX = Math.floor(width * 0.6);
    const startY = Math.floor(height * 0.4);
    const endY = Math.floor(height * 0.6);

    for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];

            // Only consider non-transparent pixels
            if (a > 128) {
                const hue = rgbToHue(r, g, b);
                hueSum += hue;
                count++;
            }
        }
    }

    if (count === 0) return null;

    const avgHue = hueSum / count;

    // Map average hue to chlorine level categories (example ranges, adjust as needed)
    // Lower hue (~40-60 yellowish) - medium chlorine
    // Higher hue (~10-30 reddish) - low chlorine
    // Hue toward greenish (~70-130) - high chlorine
    if (avgHue >= 10 && avgHue <= 30) return 'Low Chlorine Level';
    else if (avgHue > 30 && avgHue <= 70) return 'Medium Chlorine Level';
    else if (avgHue > 70 && avgHue <= 130) return 'High Chlorine Level';
    else return 'Chlorine level unknown - try better lighting or reposition strip';
}

captureBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const chlorineLevel = detectChlorineLevel(imageData);

    if (chlorineLevel) {
        result.textContent = `Detected: ${chlorineLevel}`;
    } else {
        result.textContent = 'Unable to detect chlorine level. Please try again.';
    }
});

startCamera();
