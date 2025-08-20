# Chlorine Level Detector Web Application

A lightweight web application that allows users to check chlorine levels and water purity by capturing and analyzing images of chlorine test strips using their device camera. This project uses real-time image processing to estimate chlorine concentration based on the color changes on the test strip.

## Features
- Access device camera directly from the browser with WebRTC
- Capture image of chlorine test strip
- Basic color detection to estimate chlorine level
- User-friendly and responsive interface
- Works on desktop and mobile devices

## How to Use
1. Open `index.html` in a modern web browser (Chrome, Firefox, Edge).
2. Allow camera access when prompted.
3. Dip a chlorine test strip into the water sample.
4. Hold the test strip in front of the camera and click "Capture & Detect".
5. View the chlorine level result displayed on the screen.

## Technologies Used
- HTML5, CSS3, JavaScript (Vanilla)
- WebRTC API for camera integration

## Future Improvements
- Enhance color detection accuracy with machine learning
- Support multiple water quality parameters (pH, hardness, etc.)
- Add user result logging and history features

