document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("bgAudio");
    audio.volume = 0.3;

    const elem = document.querySelector("select");
    let instance = M.FormSelect.init(elem);
    const startBtn = document.querySelector("#start-btn");

    startBtn.addEventListener("click", () => {
        let difficulty = document.querySelector("#select").value;
        localStorage.setItem("difficulty", difficulty);

        let zen = document.querySelector("#zen").checked;

        if (zen === true) {
            localStorage.setItem("zen", "true");
        } else {
            localStorage.setItem("zen", "false");
        }

        let bg = document.querySelector("#myVideo");
        bg.style.zIndex = 3;

        let ship = document.querySelector(".ship");

        audio = new Audio("../assets/sounds/glitch.mp3");
        audio.play();

        setTimeout(() => {
            ship.animate(
                [
                    {
                        bottom: "5%",
                        easing: "ease-in",
                    },
                    {
                        bottom: "2000%",
                        easing: "ease-in",
                    },
                ],
                {
                    duration: 4000,
                }
            );

            audio = new Audio("../assets/sounds/launch.mp3");
            audio.play();
        }, 1000);

        setTimeout(() => {
            window.location.href = "/type-attack/game.html";
        }, 3000);
    });
});
