const button = document.querySelector("button");
const buttonText = document.querySelector(".button-text");

button.addEventListener("click", async () => {
  buttonText.textContent = "Running...";
  button.disabled = true;
  console.log("clicked");

  try {
    await fetch("/run", { method: "POST" });
  } catch (error) {
    throw new Error("something went wrong");
  }
  confetti({ particleCount: 200, spread: 70 });

  buttonText.textContent = "Yes! ";
  button.style.backgroundColor = "green";
});
