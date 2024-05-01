const form = document.getElementById("form");
const text = document.getElementById("text");
const btn = document.getElementById("btn");
const img = document.getElementById("qr-code");

async function generateQR() {
  event.preventDefault();

  btn.setAttribute("disabled", true);
  btn.innerHTML = "Generating...";

  const url = text.value.trim();

  try {
    const response = await fetch("https://faas.thu4n.dev/function/qrcode-go", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: url,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob); // Create temporary URL from blob

      img.src = url;
      img.classList.remove("hidden");
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error generating QR:", error);
  } finally {
    btn.removeAttribute("disabled");
    btn.innerHTML = "Generate";
    window.URL.revokeObjectURL(url); // Revoke temporary URL when no longer needed
  }
}

btn.classList.remove("hidden");
