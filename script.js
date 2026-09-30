// ==========================================
// LICZNIK OD 14.06.2025
// ==========================================

const startDate =
    new Date("2025-06-14T00:00:00");


function updateTogetherCounter() {

    const now = new Date();

    let difference =
        now - startDate;

    if (difference < 0) {
        difference = 0;
    }

    const totalSeconds =
        Math.floor(difference / 1000);

    const days =
        Math.floor(totalSeconds / 86400);

    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;


    document.getElementById("days").textContent =
        days;

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


updateTogetherCounter();

setInterval(
    updateTogetherCounter,
    1000
);


// ==========================================
// ALBUM
// ==========================================

const openAlbum =
    document.getElementById("openAlbum");

const albumStart =
    document.getElementById("albumStart");

const albumContent =
    document.getElementById("albumContent");


openAlbum.addEventListener("click", () => {

    albumStart.style.display = "none";

    albumContent.classList.add("show");

    albumContent.scrollIntoView({
        behavior: "smooth"
    });

});


// ==========================================
// ZDJĘCIA
// ==========================================

const photos =
    document.querySelectorAll(".photo-album img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");

const previousPhoto =
    document.getElementById("previousPhoto");

const nextPhoto =
    document.getElementById("nextPhoto");


let currentPhoto = 0;


function showPhoto(index) {

    if (index < 0) {
        index = photos.length - 1;
    }

    if (index >= photos.length) {
        index = 0;
    }

    currentPhoto = index;

    lightboxImage.src =
        photos[currentPhoto].src;

}


photos.forEach((photo, index) => {

    photo.addEventListener("click", () => {

        currentPhoto = index;

        showPhoto(currentPhoto);

        lightbox.classList.add("show");

    });

});


closeLightbox.addEventListener("click", () => {

    lightbox.classList.remove("show");

});


previousPhoto.addEventListener("click", () => {

    showPhoto(currentPhoto - 1);

});


nextPhoto.addEventListener("click", () => {

    showPhoto(currentPhoto + 1);

});


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        lightbox.classList.remove("show");

    }

});


document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "ArrowLeft") {
        showPhoto(currentPhoto - 1);
    }

    if (event.key === "ArrowRight") {
        showPhoto(currentPhoto + 1);
    }

    if (event.key === "Escape") {
        lightbox.classList.remove("show");
    }

});


// ==========================================
// NIESPODZIANKA — PARUFKA
// ==========================================

const passwordInput =
    document.getElementById("passwordInput");

const unlockButton =
    document.getElementById("unlockButton");

const lockIcon =
    document.getElementById("lockIcon");

const wrongPassword =
    document.getElementById("wrongPassword");

const lockBox =
    document.getElementById("lockBox");

const mapSurprise =
    document.getElementById("mapSurprise");


function unlockSurprise() {

    const password =
        passwordInput.value
        .trim()
        .toUpperCase();


    if (password === "PARUFKA") {

        lockIcon.textContent = "🔓";

        wrongPassword.style.display = "none";

        passwordInput.style.display = "none";

        unlockButton.style.display = "none";


        setTimeout(() => {

            lockBox.style.display = "none";

            mapSurprise.classList.add("show");

            createHearts(25);

        }, 700);


    } else {

        wrongPassword.style.display = "block";

        passwordInput.value = "";

        lockIcon.textContent = "😈";


        setTimeout(() => {

            lockIcon.textContent = "🔒";

        }, 1200);

    }

}


unlockButton.addEventListener(
    "click",
    unlockSurprise
);


passwordInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            unlockSurprise();

        }

    }
);


// ==========================================
// MAPA PODRÓŻY — PINESKI
// ==========================================

const mapWrapper =
    document.getElementById("mapWrapper");

const pinsContainer =
    document.getElementById("pinsContainer");

const addPinModal =
    document.getElementById("addPinModal");

const pinNameInput =
    document.getElementById("pinName");

const pinPhotosInput =
    document.getElementById("pinPhotos");

const savePinButton =
    document.getElementById("savePinButton");

const cancelPinButton =
    document.getElementById("cancelPinButton");

const pinGalleryModal =
    document.getElementById("pinGalleryModal");

const pinGalleryTitle =
    document.getElementById("pinGalleryTitle");

const pinGalleryPhotos =
    document.getElementById("pinGalleryPhotos");

const closePinGallery =
    document.getElementById("closePinGallery");

const deletePinButton =
    document.getElementById("deletePinButton");


let pendingCoords = null;

let currentGalleryId = null;


function loadPlaces() {

    try {

        const saved =
            localStorage.getItem("travelPins");

        return saved ? JSON.parse(saved) : [];

    } catch (error) {

        return [];

    }

}


let places = loadPlaces();


function savePlaces() {

    try {

        localStorage.setItem(
            "travelPins",
            JSON.stringify(places)
        );

        return true;

    } catch (error) {

        alert(
            "Nie udało się zapisać miejsca — zdjęcia są chyba za duże. Spróbuj mniejszych plików."
        );

        return false;

    }

}


function renderPins() {

    pinsContainer.innerHTML = "";

    places.forEach((place) => {

        const pin =
            document.createElement("div");

        pin.className = "map-pin";

        pin.textContent = "📍";

        pin.style.left = place.x + "%";

        pin.style.top = place.y + "%";

        pin.title = place.name;

        pin.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                openPinGallery(place.id);

            }
        );

        pinsContainer.appendChild(pin);

    });

}


renderPins();


mapWrapper.addEventListener("click", (event) => {

    const rect =
        mapWrapper.getBoundingClientRect();

    const x =
        ((event.clientX - rect.left) / rect.width) * 100;

    const y =
        ((event.clientY - rect.top) / rect.height) * 100;

    pendingCoords = { x, y };

    pinNameInput.value = "";

    pinPhotosInput.value = "";

    addPinModal.classList.add("show");

});


cancelPinButton.addEventListener("click", () => {

    addPinModal.classList.remove("show");

    pendingCoords = null;

});


savePinButton.addEventListener("click", () => {

    const name =
        pinNameInput.value.trim();

    if (!name) {

        alert("Podaj nazwę miejsca");

        return;

    }

    if (!pendingCoords) {

        return;

    }

    const files =
        Array.from(pinPhotosInput.files);

    const photoPromises =
        files.map((file) => {

            return new Promise((resolve, reject) => {

                const reader =
                    new FileReader();

                reader.onload = () =>
                    resolve(reader.result);

                reader.onerror = reject;

                reader.readAsDataURL(file);

            });

        });


    Promise.all(photoPromises).then((photos) => {

        const newPlace = {

            id: Date.now(),

            name: name,

            x: pendingCoords.x,

            y: pendingCoords.y,

            photos: photos

        };


        places.push(newPlace);


        if (savePlaces()) {

            renderPins();

            addPinModal.classList.remove("show");

            pendingCoords = null;

        }

    });

});


function openPinGallery(id) {

    const place =
        places.find((item) => item.id === id);

    if (!place) {

        return;

    }

    currentGalleryId = id;

    pinGalleryTitle.textContent = place.name;

    pinGalleryPhotos.innerHTML = "";

    place.photos.forEach((src) => {

        const img =
            document.createElement("img");

        img.src = src;

        pinGalleryPhotos.appendChild(img);

    });

    pinGalleryModal.classList.add("show");

}


closePinGallery.addEventListener("click", () => {

    pinGalleryModal.classList.remove("show");

    currentGalleryId = null;

});


deletePinButton.addEventListener("click", () => {

    places = places.filter(
        (item) => item.id !== currentGalleryId
    );

    savePlaces();

    renderPins();

    pinGalleryModal.classList.remove("show");

    currentGalleryId = null;

});


// ==========================================
// ODLICZANIE DO ROCZNICY
// ==========================================

function getNextAnniversary() {

    const now = new Date();

    let year =
        now.getFullYear();


    let anniversary =
        new Date(
            year,
            5,
            14,
            0,
            0,
            0
        );


    if (anniversary <= now) {

        anniversary =
            new Date(
                year + 1,
                5,
                14,
                0,
                0,
                0
            );

    }

    return anniversary;
}


function updateAnniversaryCounter() {

    const now = new Date();

    const anniversary =
        getNextAnniversary();

    const difference =
        anniversary - now;


    const totalSeconds =
        Math.max(
            0,
            Math.floor(difference / 1000)
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );

    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;


    document.getElementById(
        "anniversaryDays"
    ).textContent = days;


    document.getElementById(
        "anniversaryHours"
    ).textContent =
        String(hours).padStart(2, "0");


    document.getElementById(
        "anniversaryMinutes"
    ).textContent =
        String(minutes).padStart(2, "0");


    document.getElementById(
        "anniversarySeconds"
    ).textContent =
        String(seconds).padStart(2, "0");

}


updateAnniversaryCounter();

setInterval(
    updateAnniversaryCounter,
    1000
);


// ==========================================
// PREZENT W DNIU ROCZNICY
// ==========================================

const giftOverlay =
    document.getElementById("giftOverlay");

const gift =
    document.getElementById("gift");

const dateOverlay =
    document.getElementById("dateOverlay");


function checkAnniversary() {

    const now = new Date();

    const month =
        now.getMonth();

    const day =
        now.getDate();


    // 14 czerwca

    if (
        month === 5 &&
        day === 14
    ) {

        giftOverlay.classList.add("show");

    }

}


checkAnniversary();


// ==========================================
// OTWARCIE PREZENTU
// ==========================================

gift.addEventListener("click", () => {

    giftOverlay.classList.remove("show");


    setTimeout(() => {

        dateOverlay.classList.add("show");

        createHearts(30);

    }, 400);

});


// ==========================================
// TAK
// ==========================================

const yesButton =
    document.getElementById("yesButton");

const yesMessage =
    document.getElementById("yesMessage");


yesButton.addEventListener("click", () => {

    yesMessage.style.display = "block";

    yesButton.textContent =
        "🥰❤️";

    createHearts(50);

});


// ==========================================
// UCIEKAJĄCE NIE
// ==========================================

const noButton =
    document.getElementById("noButton");


let noAttempts = 0;


function moveNoButton() {

    noAttempts++;


    const messages = [

        "NIE 😈",

        "Na pewno? 🥺",

        "Pomyśl jeszcze raz 😭",

        "Nie ma takiej opcji 😂",

        "Spróbuj TAK ❤️"

    ];


    noButton.textContent =
        messages[
            Math.min(
                noAttempts,
                messages.length - 1
            )
        ];


    const maxX =
        window.innerWidth -
        noButton.offsetWidth -
        20;


    const maxY =
        window.innerHeight -
        noButton.offsetHeight -
        20;


    const x =
        Math.max(
            10,
            Math.random() * maxX
        );


    const y =
        Math.max(
            10,
            Math.random() * maxY
        );


    noButton.style.position = "fixed";

    noButton.style.left = $`{x}px;`

    noButton.style.top = $`{y}px;`

}


noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


noButton.addEventListener(
    "touchstart",
    (event) => {

        event.preventDefault();

        moveNoButton();

    }
);


// ==========================================
// SERDUSZKA
// ==========================================

function createHearts(amount) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {
    }

        setTimeout(() => {

            const heart =
                document.createElement("div");

            heart.className =
                "floating-heart";

            heart.textContent =
                Math.random() > .5
                    ? "❤️"
                    : "💕";


            heart.style.left =
                Math.random() * 100 + "vw";


            heart.style.fontSize =
                18 +
                Math.random() * 25 +
                "px";


            document.body.appendChild(
                heart
            );


            setTimeout(() => {

                heart.remove();

            }, 2500);

        }, i * 70);
    }
