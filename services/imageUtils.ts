
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
