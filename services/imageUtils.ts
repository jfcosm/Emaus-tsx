
/**
 * Simulates "AI" processing to clean up signatures and stamps.
 * It removes white backgrounds and enhances the ink color.
 */
export const processImageForDocument = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject('Could not get canvas context');
                    return;
                }

                // Set canvas size to image size
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw original image
                ctx.drawImage(img, 0, 0);

                // Get pixel data
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Threshold for "white"
                const threshold = 200; 

                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    
                    // Simple luminosity check
                    const avg = (r + g + b) / 3;

                    // If pixel is light (background), make it transparent
                    if (avg > threshold) {
                        data[i + 3] = 0; // Alpha 0
                    } else {
                        // Enhance "ink": Make it darker and slightly blueish for signatures
                        // or keep original color but increase opacity assurance
                        // Let's just make it darker to ensure visibility
                        data[i] = r * 0.5;
                        data[i+1] = g * 0.5;
                        data[i+2] = b * 0.5;
                        data[i+3] = 255; // Full alpha for ink
                    }
                }

                // Put modified data back
                ctx.putImageData(imageData, 0, 0);

                // Return as Base64 PNG
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};

/**
 * Generates a handwritten-style signature from text.
 */
export const generateSignatureFromText = (text: string): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    canvas.width = 400;
    canvas.height = 150;

    // Clear background (Transparent)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Style
    ctx.font = "italic 60px 'Great Vibes', 'Dancing Script', cursive";
    ctx.fillStyle = "#000000"; // Black ink
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw Text with slight tilt
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-0.05); // Slight tilt
    ctx.fillText(text, 0, 0);
    ctx.restore();

    // Add an underline stroke for effect
    ctx.beginPath();
    ctx.moveTo(50, 110);
    ctx.bezierCurveTo(150, 120, 250, 100, 350, 115);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.stroke();

    return canvas.toDataURL('image/png');
};

/**
 * Generates a circular parish seal/stamp from text.
 */
export const generateSealFromText = (parishName: string): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const size = 300;
    const center = size / 2;
    const radius = 130;
    
    canvas.width = size;
    canvas.height = size;

    // Ink Color (Typical Purple/Blue stamp ink)
    const inkColor = "#4b5563"; // Dark Slate Gray for professional look, or #2563eb for blue

    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "rgba(0,0,0,0)";

    // 1. Outer Circle
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 5;
    ctx.stroke();

    // 2. Inner Circle
    ctx.beginPath();
    ctx.arc(center, center, radius - 10, 0, 2 * Math.PI);
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 3. Innermost Circle (Center area)
    ctx.beginPath();
    ctx.arc(center, center, radius - 45, 0, 2 * Math.PI);
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    // 4. Curved Text (Parish Name on Top)
    ctx.save();
    ctx.font = "bold 24px 'Inter', sans-serif";
    ctx.fillStyle = inkColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const text = parishName.toUpperCase();
    const angleStep = 0.3; // Angle spread between chars
    const startAngle = -Math.PI / 2 - (text.length - 1) * angleStep / 2;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        ctx.save();
        // Calculate position
        const angle = startAngle + i * angleStep;
        
        // Translate to center, rotate, then translate out to radius
        ctx.translate(center, center);
        ctx.rotate(angle);
        ctx.translate(0, -(radius - 25)); // Move text inside the double rings
        
        ctx.fillText(char, 0, 0);
        ctx.restore();
    }
    ctx.restore();

    // 5. Curved Text (Bottom - "PARROQUIA" or City)
    ctx.save();
    ctx.font = "bold 20px 'Inter', sans-serif";
    ctx.fillStyle = inkColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    const bottomText = "★  OFICINA PARROQUIAL  ★";
    const bottomAngleStep = 0.25;
    const bottomStartAngle = Math.PI / 2 - (bottomText.length - 1) * bottomAngleStep / 2;

    for (let i = 0; i < bottomText.length; i++) {
        const char = bottomText[i];
        ctx.save();
        const angle = bottomStartAngle + i * bottomAngleStep;
        ctx.translate(center, center);
        ctx.rotate(angle);
        ctx.translate(0, radius - 25);
        ctx.rotate(Math.PI); // Flip text to be readable
        ctx.fillText(char, 0, 0);
        ctx.restore();
    }
    ctx.restore();

    // 6. Center Cross
    ctx.save();
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 4;
    ctx.translate(center, center);
    
    // Draw Cross
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.lineTo(0, 30);
    ctx.moveTo(-20, -10);
    ctx.lineTo(20, -10);
    ctx.stroke();
    
    ctx.restore();

    return canvas.toDataURL('image/png');
};
