// ========================================
// CUSTOMIZE YOUR LOVE GAME HERE ❤️
// ========================================

const gameData = {

    question:
        "Wanna go out with me? ❤️",

    successMessage:
        "You said YES! You just made me the happiest person ever. 🥹💕",

    finalTitle:
        "One Last Thing...",

    finalMessage:
        "I hope you know how special you are to me. I love making memories with you. ❤️",

    musicURL:
        "",


    // ====================================
    // YOUR MEMORIES
    // ====================================

    memories: [

        {
            title: "Our First Memory 💕",

            message:
                "This is one of my favorite memories with you. I hope we make many more.",

            image:
                "https://images.unsplash.com/photo-1518199266791-5375a83190b7"
        },

        {
            title: "That Special Day 💗",

            message:
                "I still remember this moment. It makes me smile every time.",

            image:
                "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2"
        },

        {
            title: "Our Random Moments 💖",

            message:
                "Sometimes the random moments become the memories we remember forever.",

            image:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9"
        },

        {
            title: "A Little Reminder 💓",

            message:
                "You mean more to me than you probably realize.",

            image:
                "https://images.unsplash.com/photo-1494774157365-9e04c6720e00"
        },

        {
            title: "Another Memory 💘",

            message:
                "Here's another little piece of our story.",

            image:
                "https://images.unsplash.com/photo-1509909756405-be0199881695"
        },

        {
            title: "The Last Memory 💝",

            message:
                "And this is not really the end. It's just another chapter.",

            image:
                "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2"
        }

    ]

};


// ========================================
// ELEMENTS
// ========================================

const screens = document.querySelectorAll(".screen");

const startButton =
    document.getElementById("startButton");

const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const continueButton =
    document.getElementById("continueButton");

const finalButton =
    document.getElementById("finalButton");

const restartButton =
    document.getElementById("restartButton");

const explodeButton =
    document.getElementById("explodeButton");

const heartGrid =
    document.getElementById("heartGrid");

const memoryModal =
    document.getElementById("memoryModal");

const closeMemory =
    document.getElementById("closeMemory");

const memoryImage =
    document.getElementById("memoryImage");

const memoryTitle =
    document.getElementById("memoryTitle");

const memoryText =
    document.getElementById("memoryText");

const progressText =
    document.getElementById("progressText");

const noMessage =
    document.getElementById("noMessage");

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");


// ========================================
// VARIABLES
// ========================================

let noClicks = 0;

let discoveredMemories = 0;

let musicPlaying = false;


// ========================================
// SCREEN FUNCTION
// ========================================

function showScreen(id) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    document
        .getElementById(id)
        .classList.add("active");
}


// ========================================
// START
// ========================================

startButton.addEventListener("click", () => {

    showScreen("questionScreen");

    setupMusic();

});


// ========================================
// NO BUTTON
// ========================================

noButton.addEventListener("click", () => {

    noClicks++;

    const messages = [

        "Are you sure? 🥺",

        "Think again! 😭",

        "Wrong answer! 😂",

        "Nice try! ❤️",

        "The YES button looks better... 👀",

        "I'll make YES bigger then. 😌"

    ];

    noMessage.textContent =
        messages[
            Math.min(
                noClicks - 1,
                messages.length - 1
            )
        ];


    // Make YES bigger

    const scale =
        1 + (noClicks * 0.25);

    yesButton.style.transform =
        `scale(${scale})`;


    // Make NO smaller

    const noScale =
        Math.max(
            0.5,
            1 - (noClicks * 0.08)
        );

    noButton.style.transform =
        `scale(${noScale})`;


    // After many clicks,
    // move NO around

    if (noClicks >= 3) {

        noButton.style.position =
            "absolute";

        const x =
            Math.random() * 200 - 100;

        const y =
            Math.random() * 100 - 50;

        noButton.style.transform =
            `translate(${x}px, ${y}px)
             scale(${noScale})`;
    }

});


// ========================================
// YES
// ========================================

yesButton.addEventListener("click", () => {

    showScreen("yesScreen");

    createHeartExplosion(
        document.getElementById("heartContainer"),
        60
    );

});


// ========================================
// CONTINUE TO MEMORIES
// ========================================

continueButton.addEventListener("click", () => {

    showScreen("memoryScreen");

    createMemoryHearts();

});


// ========================================
// CREATE MEMORY HEARTS
// ========================================

function createMemoryHearts() {

    heartGrid.innerHTML = "";

    discoveredMemories = 0;

    updateProgress();


    gameData.memories.forEach(
        (memory, index) => {

            const heart =
                document.createElement("button");

            heart.className =
                "memory-heart";

            heart.textContent =
                "❤️";

            heart.dataset.index =
                index;

            heart.addEventListener(
                "click",
                () => {

                    openMemory(
                        index,
                        heart
                    );

                }
            );

            heartGrid.appendChild(heart);

        }
    );

}


// ========================================
// OPEN MEMORY
// ========================================

function openMemory(index, heart) {

    const memory =
        gameData.memories[index];


    memoryTitle.textContent =
        memory.title;

    memoryText.textContent =
        memory.message;

    memoryImage.src =
        memory.image;


    memoryModal.classList.add("show");


    if (!heart.classList.contains("unlocked")) {

        heart.classList.add("unlocked");

        discoveredMemories++;

        updateProgress();

    }

}


// ========================================
// CLOSE MEMORY
// ========================================

closeMemory.addEventListener("click", () => {

    memoryModal.classList.remove("show");

});


memoryModal.addEventListener(
    "click",
    (event) => {

        if (event.target === memoryModal) {

            memoryModal.classList.remove("show");

        }

    }
);


// ========================================
// PROGRESS
// ========================================

function updateProgress() {

    progressText.textContent =
        `${discoveredMemories} / ${gameData.memories.length}
        memories discovered`;


    if (
        discoveredMemories ===
        gameData.memories.length
    ) {

        finalButton.classList.remove(
            "hidden"
        );

    }

}


// ========================================
// FINAL SCREEN
// ========================================

finalButton.addEventListener("click", () => {

    showScreen("finalScreen");

});


// ========================================
// FINAL EXPLOSION
// ========================================

explodeButton.addEventListener("click", () => {

    explodeButton.style.display =
        "none";

    createFinalExplosion();

});


// ========================================
// HEART EXPLOSION
// ========================================

function createHeartExplosion(
    container,
    amount
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const heart =
            document.createElement("div");

        heart.className =
            "explosion-heart";

        heart.textContent =
            ["❤️", "💗", "💖", "💕", "💓"][
                Math.floor(
                    Math.random() * 5
                )
            ];


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 500;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


        heart.style.setProperty(
            "--x",
            `${x}px`
        );

        heart.style.setProperty(
            "--y",
            `${y}px`
        );

        heart.style.setProperty(
            "--rotate",
            `${Math.random() * 720 - 360}deg`
        );


        container.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 1600);

    }

}


// ========================================
// FINAL EXPLOSION
// ========================================

function createFinalExplosion() {

    createHeartExplosion(
        document.getElementById("finalHearts"),
        150
    );


    const finalHeart =
        document.getElementById("finalHeart");

    finalHeart.style.transform =
        "scale(4)";

    finalHeart.style.transition =
        "transform .5s ease";


    setTimeout(() => {

        finalHeart.textContent =
            "💥";

    }, 500);


    setTimeout(() => {

        document.getElementById(
            "finalTitle"
        ).textContent =
            "I Love You ❤️";

        document.getElementById(
            "finalMessage"
        ).textContent =
            gameData.finalMessage;

    }, 700);

}


// ========================================
// MUSIC
// ========================================

function setupMusic() {

    if (!gameData.musicURL) {

        return;

    }

    music.src =
        gameData.musicURL;

    music.volume =
        0.5;

    music.play()
        .then(() => {

            musicPlaying = true;

        })
        .catch(() => {

            console.log(
                "Music requires user interaction."
            );

        });

}


// ========================================
// MUSIC BUTTON
// ========================================

musicButton.addEventListener("click", () => {

    if (!music.src) {

        const url =
            prompt(
                "Paste your music URL:"
            );

        if (!url) return;

        music.src = url;

    }


    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicButton.textContent =
            "🔇";

    } else {

        music.play();

        musicPlaying = true;

        musicButton.textContent =
            "🎵";

    }

});


// ========================================
// RESTART
// ========================================

restartButton.addEventListener(
    "click",
    () => {

        location.reload();

    }
);
