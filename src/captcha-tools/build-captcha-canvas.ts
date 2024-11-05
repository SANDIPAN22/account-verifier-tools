import { Canvas, createCanvas } from "canvas";

export default (captchaText:string): Canvas=>{
    const width = 200;
    const height = 100;
 
  
    // Create a canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
  
    // Background color
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, width, height);
  
    // Add noise (random circles)
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 5,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 0.3)`;
      ctx.fill();
    }
  
    // Draw the CAPTCHA text
    ctx.font = "bold 40px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
  
    for (let i = 0; i < captchaText.length; i++) {
      // Set random rotation for each character
      ctx.save();
      const x = 30 + i * 30;
      const y = height / 2;
      const angle = (Math.random() - 0.5) * 0.3; // Random angle for slight rotation
  
      ctx.translate(x, y);
      ctx.rotate(angle);
  
      // Set random color for each character
      ctx.fillStyle = `rgb(${Math.floor(Math.random() * 150)}, ${Math.floor(
        Math.random() * 150
      )}, ${Math.floor(Math.random() * 150)})`;
      ctx.fillText(captchaText[i], 0, 0);
  
      ctx.restore();
    }
  
    // Add more noise with random lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 0.5)`;
      ctx.lineWidth = Math.random() * 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }
  
    return canvas;
};