const timestampInput = document.getElementById("timestamp");
if (timestampInput) {
    timestampInput.value = new Date().toISOString(); 
}
const npBtn = document.getElementById("np-btn");
const bronzeBtn = document.getElementById("bronze-btn");
const silverBtn = document.getElementById("silver-btn");
const goldBtn = document.getElementById("gold-btn");
const npModal = document.getElementById("np-modal");
const bronzeModal = document.getElementById("bronze-modal");
const silverModal = document.getElementById("silver-modal");
const goldModal = document.getElementById("gold-modal");
const closeButtons = document.querySelectorAll(".close-modal");
npBtn.addEventListener("click", () => {
    npModal.showModal();
});

bronzeBtn.addEventListener("click", () => {
    bronzeModal.showModal();
});

silverBtn.addEventListener("click", () => {
    silverModal.showModal();
});

goldBtn.addEventListener("click", () => {
    goldModal.showModal();
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        npModal.close();
        bronzeModal.close();
        silverModal.close();
        goldModal.close();
    });
});