async function generateImage() {
    const prompt = document.getElementById("prompt").value;
    const dimensions = document.getElementById("dimensions").value;
    const apiUrl = `https://death-image.ashlynn.workers.dev/?prompt=${encodeURIComponent(prompt)}&dimensions=${dimensions}`;

    document.getElementById("loading").style.display = "block";
    document.getElementById("output").innerHTML = "";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        document.getElementById("loading").style.display = "none";

        if (data.images) {
            document.getElementById("output").innerHTML = data.images.map(img => `
                <div class="image-container">
                    <img src="${img}" alt="Generated Image">
                    <a href="${img}" download class="download-btn">⬇️ Download</a>
                </div>
            `).join("");
        } else {
            document.getElementById("output").innerHTML = "<p>❌ No images found. Try again.</p>";
        }
    } catch (error) {
        document.getElementById("loading").style.display = "none";
        document.getElementById("output").innerHTML = "<p>❌ Error generating images.</p>";
    }
}
