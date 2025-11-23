
// ============================================================================
// ImgBB Service
// ============================================================================

// The API Key provided by the user
export const IMGBB_API_KEY = "aa8e99b54da40777250f522e688d8b14";

export async function uploadImageToImgBB(imageDataUrl: string): Promise<string> {
    // Simple validation to ensure key is present
    if (!IMGBB_API_KEY || IMGBB_API_KEY.length < 10) {
        throw new Error("ImgBB API Key is missing or invalid. Please check services/imgbb.ts");
    }

    try {
        // Convert the Data URL (Base64) to a Blob.
        // This is more robust than string manipulation and handles large files better.
        const res = await fetch(imageDataUrl);
        const blob = await res.blob();

        const formData = new FormData();
        formData.append("key", IMGBB_API_KEY);
        // We append the blob as a file. Filename 'photo.png' helps the API identify it.
        formData.append("image", blob, "photo.png");

        const response = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            return data.data.url;
        } else {
            console.error("ImgBB API Error:", data);
            throw new Error(data.error?.message || "Failed to upload image. Please try again.");
        }
    } catch (error) {
        console.error("ImgBB Network/Service Error:", error);
        throw error;
    }
}
