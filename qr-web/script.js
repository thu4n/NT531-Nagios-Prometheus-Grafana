const form = document.getElementById("form");
const text = document.getElementById("text");
const btn = document.getElementById("btn");
const img = document.getElementById("qr-code");

async function generateQR() {
  event.preventDefault();

  btn.setAttribute("disabled", true);
  btn.innerHTML = "Generating...";

  const url = text.value.trim(); // Get the URL directly

  try {
    const response = await fetch("https://faas.thu4n.dev/function/qrcode-go", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain", // Set appropriate content type for URL data
      },
      body: url, // Send the URL directly as the body
    });

    if (response.ok) {
      // Success
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob); // Create temporary URL from blob

      img.src = url;
      img.classList.remove("hidden");
    } else {
      // Error
      console.error("Error:", response.statusText); // Assuming you just log the status text for debugging
      // You can display a user-friendly error message here if desired
    }
  } catch (error) {
    console.error("Error generating QR:", error);
  } finally {
    btn.removeAttribute("disabled");
    btn.innerHTML = "Generate";
    window.URL.revokeObjectURL(url); // Revoke temporary URL when no longer needed (optional)
  }
}

// Minor visual adjustment (assuming you have a hidden class for the button)
btn.classList.remove("hidden");
