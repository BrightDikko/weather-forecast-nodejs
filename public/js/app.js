const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const enteredAddress = searchInput.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch("http://localhost:3000/weather?address=" + enteredAddress).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                    return;
                }
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            });
        }
    );
});
