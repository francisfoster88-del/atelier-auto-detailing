// WhatsApp number (UK format, no +, no spaces)
const WHATSAPP_NUMBER = "447508011007";

function waLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function setWAButtons() {
  const msg = `Hi Atelier Auto Detailing 👋

Postcode:
Car model:
Service wanted (Interior Reset / Signature Detail / Maintenance Plan):
Preferred day/time:

Photos:
1) Front exterior
2) Rear exterior
3) Driver area
4) Rear/boot

Thanks`;

  const link = waLink(msg);

  const ids = ["waTop", "waCard", "waBottom"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = link;
  });
}

function handleForm() {
  const form = document.getElementById("quoteForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const postcode = document.getElementById("postcode").value.trim();
    const vehicle = document.getElementById("vehicle").value.trim();
    const service = document.getElementById("service").value;
    const notes = document.getElementById("notes").value.trim();

    const msg =
`Hi Atelier Auto Detailing 👋

Name: ${name}
Phone: ${phone}
Postcode: ${postcode}
Vehicle: ${vehicle}
Service: ${service}
Notes: ${notes || "None"}

I can send photos if needed.`;

    window.open(waLink(msg), "_blank");
  });
}

function setYear(){
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  setWAButtons();
  handleForm();
  setYear();
});
