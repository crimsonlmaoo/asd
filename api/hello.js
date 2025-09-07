        async function uploadFile(channelId, file) {
            // Convert file to base64
            const base64File = await fileToBase64(file);

            // URL for ImgBB API
            const apiKey = '3714ed0862ce23613755500faab807fa';  // Replace with your ImgBB API key
            const apiUrl = `https://api.imgbb.com/1/upload?key=${apiKey}&image=${base64File}`;

            try {
                const res = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const responseData = await res.json();
                console.log(responseData);
                
                if (responseData && responseData.data && responseData.data.url_viewer) {
                    return responseData.data.url_viewer;  // Return the viewer URL for the image
                } else {
                    console.error("Upload failed:", responseData);
                    return null;
                }
            } catch (err) {
                console.error("Error during the upload process:", err);
                return null;
            }
        }

        function fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(',')[1]); // Remove the base64 header part
                reader.onerror = reject;
                reader.readAsDataURL(file);  // Read the file as base64
            });
        }

uploadFile();
