
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
                        // Enhance "ink": Make it darker to ensure visibility
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
 * Variant 0: Black, Classic
 * Variant 1: Blue, Slight Tilt
 * Variant 2: Dark Grey, Thicker
 */
export const generateSignatureFromText = (text: string, variant: number = 0): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    canvas.width = 400;
    canvas.height = 150;

    // Clear background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const styleIndex = variant % 3;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    if (styleIndex === 0) {
        // Classic Black
        ctx.font = "italic 60px 'Great Vibes', 'Dancing Script', cursive";
        ctx.fillStyle = "#000000"; 
        ctx.rotate(-0.05);
        ctx.fillText(text, 0, 0);
        
        // Classic Underline
        ctx.beginPath();
        ctx.moveTo(-150, 40);
        ctx.bezierCurveTo(-50, 50, 50, 30, 150, 45);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.stroke();

    } else if (styleIndex === 1) {
        // Blue Ink (Ballpoint style)
        ctx.font = "italic 55px 'Great Vibes', cursive";
        ctx.fillStyle = "#1e3a8a"; // Dark Blue
        ctx.rotate(-0.08); // More tilt
        ctx.fillText(text, 0, 0);

        // Quick loop underline
        ctx.beginPath();
        ctx.moveTo(-100, 35);
        ctx.lineTo(120, 35);
        ctx.strokeStyle = "#1e3a8a";
        ctx.lineWidth = 1.5;
        ctx.stroke();

    } else {
        // Thicker, Dark Grey
        ctx.font = "italic 65px 'Great Vibes', cursive";
        ctx.fillStyle = "#374151"; 
        ctx.rotate(0); // Straight
        ctx.fillText(text, 0, 0);
        
        // No underline, just text
    }

    ctx.restore();

    return canvas.toDataURL('image/png');
};

/**
 * Generates a parish seal/stamp.
 * Variant 0: Circular Text
 * Variant 1: Horizontal Text (Center)
 * Variant 2: Double Border Cross
 */
export const generateSealFromText = (parishName: string, variant: number = 0): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const size = 300;
    const center = size / 2;
    const radius = 130;
    
    canvas.width = size;
    canvas.height = size;

    const styleIndex = variant % 3;
    const inkColor = styleIndex === 1 ? "#1d4ed8" : "#374151"; // Blue for style 1, Grey for others

    ctx.clearRect(0, 0, size, size);

    if (styleIndex === 0) {
        // --- STYLE 0: CLASSIC CIRCULAR (Improved) ---
        
        // Rings
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(center, center, radius - 8, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(center, center, radius - 45, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Cross
        ctx.save();
        ctx.translate(center, center);
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, -25);
        ctx.lineTo(0, 25);
        ctx.moveTo(-15, -10);
        ctx.lineTo(15, -10);
        ctx.stroke();
        ctx.restore();

        // Text Top (Parish Name)
        ctx.font = "bold 18px 'Inter', sans-serif";
        ctx.fillStyle = inkColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        drawTextAlongArc(ctx, parishName.toUpperCase(), center, center, radius - 25, -Math.PI/2);

        // Text Bottom
        drawTextAlongArc(ctx, "OFICINA PARROQUIAL", center, center, radius - 25, Math.PI/2, true);

    } else if (styleIndex === 1) {
        // --- STYLE 1: HORIZONTAL TEXT (User Request) ---
        
        // Outer box (Rounded Rect look for Stamp) or Circle
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 6;
        ctx.stroke();

        // Inner thin line
        ctx.beginPath();
        ctx.arc(center, center, radius - 10, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Horizontal Lines
        ctx.beginPath();
        ctx.moveTo(center - 100, center - 40);
        ctx.lineTo(center + 100, center - 40);
        ctx.moveTo(center - 100, center + 40);
        ctx.lineTo(center + 100, center + 40);
        ctx.lineWidth = 2;
        ctx.stroke();

        // Center Text (Parish Name split if needed)
        ctx.font = "bold 22px 'Inter', sans-serif";
        ctx.fillStyle = inkColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Simple wrap logic
        const words = parishName.toUpperCase().split(' ');
        let line1 = words.slice(0, Math.ceil(words.length / 2)).join(' ');
        let line2 = words.slice(Math.ceil(words.length / 2)).join(' ');
        
        if (!line2) {
            ctx.fillText(line1, center, center);
        } else {
            ctx.fillText(line1, center, center - 15);
            ctx.fillText(line2, center, center + 15);
        }

        // Top/Bottom Text
        ctx.font = "14px 'Inter', sans-serif";
        ctx.fillText("SECRETARÍA", center, center - 70);
        ctx.fillText("DOCUMENTO OFICIAL", center, center + 70);

    } else {
        // --- STYLE 2: DOUBLE BORDER / MINIMALIST ---
        
        // Thick Double Border
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(center, center, radius - 15, 0, 2 * Math.PI);
        ctx.lineWidth = 4;
        ctx.stroke();

        // Large Cross Background
        ctx.save();
        ctx.translate(center, center);
        ctx.globalAlpha = 0.1; // Faint cross
        ctx.fillStyle = inkColor;
        ctx.font = "150px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("†", 0, 10);
        ctx.globalAlpha = 1.0;
        ctx.restore();

        // Text Arched Top
        ctx.font = "bold 20px serif";
        ctx.fillStyle = inkColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        drawTextAlongArc(ctx, parishName.toUpperCase(), center, center, radius - 35, -Math.PI/2);

        // Center Text
        ctx.font = "italic 16px serif";
        ctx.fillText("Parroquia", center, center + 10);
        ctx.fillText("Católica", center, center + 30);
    }

    return canvas.toDataURL('image/png');
};

// Helper for curved text
function drawTextAlongArc(ctx: CanvasRenderingContext2D, str: string, cx: number, cy: number, radius: number, startAngle: number, flipped: boolean = false) {
    const angleSpread = 0.3; // Approx width per char in radians (adjust based on font size)
    const totalAngle = (str.length - 1) * angleSpread;
    let currentAngle = startAngle - totalAngle / 2;

    if (flipped) {
        // Bottom text needs different math to be readable
        currentAngle = startAngle - totalAngle / 2;
    }

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        ctx.save();
        
        // Position logic
        const angle = flipped ? startAngle + (str.length - 1 - i) * angleSpread - totalAngle / 2 : startAngle + i * angleSpread - totalAngle / 2;
        
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.translate(0, flipped ? -radius : -radius);
        
        if (flipped) {
             ctx.rotate(Math.PI); // Flip text upright for bottom
             ctx.translate(0, -10); // Adjust baseline
        }

        ctx.fillText(char, 0, 0);
        ctx.restore();
    }
}
