import { toPng } from 'html-to-image';
import toast from 'react-hot-toast';

export const downloadAsImage = async(node, filename = 'impact-card') => {
    if (!node) return toast.error("Element not found for download.");

    try {
        const dataUrl = await toPng(node, {
            quality: 0.95,
            pixelRatio: 2,
            backgroundColor: '#ffffff',
        });

        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Image saved successfully!");

    } catch (error) {
        console.error('oops, something went wrong!', error);
        toast.error("Failed to generate image.");
    }
};