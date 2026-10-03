// =========================
// HOME PAGE
// =========================

function showLost() {

    window.location.href = "lost.html";

}


function showFound() {

    window.location.href = "found.html";

}


function goToLostCheck() {

    window.location.href = "lost-match-check.html";

}


function goToFoundCheck() {

    window.location.href = "found-match-check.html";

}


function goHome() {

    window.location.href = "index.html";

}


// =========================
// LOST ITEM
// =========================

function submitLost() {

    var item =
        document.getElementById("lostItem").value.trim();

    var place =
        document.getElementById("lostPlace").value.trim();

    var date =
        document.getElementById("lostDate").value;

    var time =
        document.getElementById("lostTime").value;

    var description =
        document.getElementById("lostDescription").value.trim();

    var contact =
        document.getElementById("lostContact").value.trim();

    var photoInput =
        document.getElementById("lostPhoto");


    if (
        item === "" ||
        place === "" ||
        contact === ""
    ) {

        alert("Please fill in the required details.");

        return;

    }


    if (photoInput.files.length > 0) {

        var reader = new FileReader();


        reader.onload = function (event) {

            saveLostItem(
                item,
                place,
                date,
                time,
                description,
                contact,
                event.target.result
            );

        };


        reader.readAsDataURL(photoInput.files[0]);

    }

    else {

        saveLostItem(
            item,
            place,
            date,
            time,
            description,
            contact,
            ""
        );

    }

}


function saveLostItem(
    item,
    place,
    date,
    time,
    description,
    contact,
    photo
) {

    var lostItems =
        JSON.parse(localStorage.getItem("lostItems")) || [];


    var lostItem = {

        id: Date.now(),

        item: item,

        place: place,

        date: date,

        time: time,

        description: description,

        contact: contact,

        photo: photo

    };


    lostItems.push(lostItem);


    localStorage.setItem(
        "lostItems",
        JSON.stringify(lostItems)
    );


    findMatchForLostItem(lostItem);

}


// =========================
// CHECK MATCH FOR LOST ITEM
// =========================

function findMatchForLostItem(lostItem) {

    var foundItems =
        JSON.parse(localStorage.getItem("foundItems")) || [];


    var match = foundItems.find(function (foundItem) {

        return (
            foundItem.item.toLowerCase() ===
            lostItem.item.toLowerCase()
        );

    });


    if (match) {

        localStorage.setItem(
            "currentLostItem",
            JSON.stringify(lostItem)
        );


        localStorage.setItem(
            "currentFoundItem",
            JSON.stringify(match)
        );


        window.location.href =
            "lost-match.html";

    }

    else {

        alert(
            "Your lost item has been reported. No match found yet."
        );


        window.location.href =
            "index.html";

    }

}


// =========================
// FOUND ITEM
// =========================

function submitFound() {

    var item =
        document.getElementById("foundItem").value.trim();

    var place =
        document.getElementById("foundPlace").value.trim();

    var date =
        document.getElementById("foundDate").value;

    var time =
        document.getElementById("foundTime").value;

    var description =
        document.getElementById("foundDescription").value.trim();

    var pickupPlace =
        document.getElementById("pickupPlace").value.trim();

    var pickupDate =
        document.getElementById("pickupDate").value.trim();

    var pickupStartTime =
        document.getElementById("pickupStartTime").value;

    var pickupEndTime =
        document.getElementById("pickupEndTime").value;

    var contact =
        document.getElementById("foundContact").value.trim();

    var photoInput =
        document.getElementById("foundPhoto");


    if (
        item === "" ||
        place === "" ||
        pickupPlace === "" ||
        contact === ""
    ) {

        alert("Please fill in the required details.");

        return;

    }


    if (
        pickupStartTime === "" ||
        pickupEndTime === ""
    ) {

        alert("Please select both pickup times.");

        return;

    }


    var pickupTime =
        pickupStartTime +
        " - " +
        pickupEndTime;


    if (photoInput.files.length > 0) {

        var reader = new FileReader();


        reader.onload = function (event) {

            saveFoundItem(
                item,
                place,
                date,
                time,
                description,
                pickupPlace,
                pickupDate,
                pickupTime,
                contact,
                event.target.result
            );

        };


        reader.readAsDataURL(photoInput.files[0]);

    }

    else {

        saveFoundItem(
            item,
            place,
            date,
            time,
            description,
            pickupPlace,
            pickupDate,
            pickupTime,
            contact,
            ""
        );

    }

}


function saveFoundItem(
    item,
    place,
    date,
    time,
    description,
    pickupPlace,
    pickupDate,
    pickupTime,
    contact,
    photo
) {

    var foundItems =
        JSON.parse(localStorage.getItem("foundItems")) || [];


    var foundItem = {

        id: Date.now(),

        item: item,

        place: place,

        date: date,

        time: time,

        description: description,

        pickupPlace: pickupPlace,

        pickupDate: pickupDate,

        pickupTime: pickupTime,

        contact: contact,

        photo: photo

    };


    foundItems.push(foundItem);


    localStorage.setItem(
        "foundItems",
        JSON.stringify(foundItems)
    );


    findMatchForFoundItem(foundItem);

}


// =========================
// CHECK MATCH FOR FOUND ITEM
// =========================

function findMatchForFoundItem(foundItem) {

    var lostItems =
        JSON.parse(localStorage.getItem("lostItems")) || [];


    var match = lostItems.find(function (lostItem) {

        return (
            lostItem.item.toLowerCase() ===
            foundItem.item.toLowerCase()
        );

    });


    if (match) {

        localStorage.setItem(
            "currentLostItem",
            JSON.stringify(match)
        );


        localStorage.setItem(
            "currentFoundItem",
            JSON.stringify(foundItem)
        );


        window.location.href =
            "found-match.html";

    }

    else {

        alert(
            "Your found item has been reported. No match found yet."
        );


        window.location.href =
            "index.html";

    }

}


// =========================
// LOST MATCH CHECK PAGE
// =========================

function loadLostReports() {

    var container =
        document.getElementById("lostReports");


    if (!container) {

        return;

    }


    var lostItems =
        JSON.parse(localStorage.getItem("lostItems")) || [];


    if (lostItems.length === 0) {

        container.innerHTML =
            "<p>You have not reported any lost items yet.</p>";

        return;

    }


    container.innerHTML = "";


    lostItems.forEach(function (lostItem) {

        var foundItems =
            JSON.parse(localStorage.getItem("foundItems")) || [];


        var match = foundItems.find(function (foundItem) {

            return (
                foundItem.item.toLowerCase() ===
                lostItem.item.toLowerCase()
            );

        });


        var reportBox =
            document.createElement("div");


        reportBox.className =
            "report-box";


        if (match) {

            reportBox.innerHTML = `

                <h2>🎉 ${lostItem.item}</h2>

                <p>
                    Status: <strong>🎉 Match Found!</strong>
                </p>

                <button>
                    View Match
                </button>

            `;


            var viewButton =
                reportBox.querySelector("button");


            viewButton.onclick = function () {

                localStorage.setItem(
                    "currentLostItem",
                    JSON.stringify(lostItem)
                );


                localStorage.setItem(
                    "currentFoundItem",
                    JSON.stringify(match)
                );


                window.location.href =
                    "lost-match.html";

            };

        }

        else {

            reportBox.innerHTML = `

                <h2>🔎 ${lostItem.item}</h2>

                <p>
                    Status: <strong>No match yet</strong>
                </p>

                <button>
                    Check for Match
                </button>

            `;


            var checkButton =
                reportBox.querySelector("button");


            checkButton.onclick = function () {

                checkSingleLostItem(lostItem);

            };

        }


        container.appendChild(reportBox);

    });

}


// =========================
// CHECK ONE LOST ITEM
// =========================

function checkSingleLostItem(lostItem) {

    var foundItems =
        JSON.parse(localStorage.getItem("foundItems")) || [];


    var match = foundItems.find(function (foundItem) {

        return (
            foundItem.item.toLowerCase() ===
            lostItem.item.toLowerCase()
        );

    });


    if (match) {

        localStorage.setItem(
            "currentLostItem",
            JSON.stringify(lostItem)
        );


        localStorage.setItem(
            "currentFoundItem",
            JSON.stringify(match)
        );


        window.location.href =
            "lost-match.html";

    }

    else {

        alert(
            "No match found for " +
            lostItem.item +
            " yet."
        );

    }

}


// =========================
// FOUND MATCH CHECK PAGE
// =========================

function loadFoundReports() {

    var container =
        document.getElementById("foundReports");


    if (!container) {

        return;

    }


    var foundItems =
        JSON.parse(localStorage.getItem("foundItems")) || [];


    if (foundItems.length === 0) {

        container.innerHTML =
            "<p>You have not reported any found items yet.</p>";

        return;

    }


    container.innerHTML = "";


    foundItems.forEach(function (foundItem) {

        var lostItems =
            JSON.parse(localStorage.getItem("lostItems")) || [];


        var match = lostItems.find(function (lostItem) {

            return (
                lostItem.item.toLowerCase() ===
                foundItem.item.toLowerCase()
            );

        });


        var reportBox =
            document.createElement("div");


        reportBox.className =
            "report-box";


        if (match) {

            reportBox.innerHTML = `

                <h2>🎉 ${foundItem.item}</h2>

                <p>
                    Status: <strong>🎉 Match Found!</strong>
                </p>

                <button>
                    View Match
                </button>

            `;


            var viewButton =
                reportBox.querySelector("button");


            viewButton.onclick = function () {

                localStorage.setItem(
                    "currentLostItem",
                    JSON.stringify(match)
                );


                localStorage.setItem(
                    "currentFoundItem",
                    JSON.stringify(foundItem)
                );


                window.location.href =
                    "found-match.html";

            };

        }

        else {

            reportBox.innerHTML = `

                <h2>🔎 ${foundItem.item}</h2>

                <p>
                    Status: <strong>No match yet</strong>
                </p>

                <button>
                    Check for Match
                </button>

            `;


            var checkButton =
                reportBox.querySelector("button");


            checkButton.onclick = function () {

                checkSingleFoundItem(foundItem);

            };

        }


        container.appendChild(reportBox);

    });

}


// =========================
// CHECK ONE FOUND ITEM
// =========================

function checkSingleFoundItem(foundItem) {

    var lostItems =
        JSON.parse(localStorage.getItem("lostItems")) || [];


    var match = lostItems.find(function (lostItem) {

        return (
            lostItem.item.toLowerCase() ===
            foundItem.item.toLowerCase()
        );

    });


    if (match) {

        localStorage.setItem(
            "currentLostItem",
            JSON.stringify(match)
        );


        localStorage.setItem(
            "currentFoundItem",
            JSON.stringify(foundItem)
        );


        window.location.href =
            "found-match.html";

    }

    else {

        alert(
            "No match found for " +
            foundItem.item +
            " yet."
        );

    }

}


// =========================
// LOST PERSON'S MATCH PAGE
// =========================

function loadLostMatchPage() {

    var lostItem =
        JSON.parse(
            localStorage.getItem("currentLostItem")
        );


    var foundItem =
        JSON.parse(
            localStorage.getItem("currentFoundItem")
        );


    if (!lostItem || !foundItem) {

        return;

    }


    // =========================
    // ITEM NAME
    // =========================

    document.getElementById(
        "lostMatchedItem"
    ).textContent =
        foundItem.item;


    // =========================
    // DESCRIPTION
    // =========================

    document.getElementById(
        "lostMatchedDescription"
    ).textContent =
        foundItem.description ||
        "No description provided.";


    // =========================
    // FOUND ITEM PICTURE
    // =========================

    var photo =
        document.getElementById(
            "lostMatchedPhoto"
        );


    var photoMessage =
        document.getElementById(
            "lostMatchedPhotoMessage"
        );


    if (foundItem.photo) {

        photo.src =
            foundItem.photo;

        photo.style.display =
            "block";

        photoMessage.textContent =
            "";

    }

    else {

        photo.style.display =
            "none";

        photoMessage.textContent =
            "No picture was provided by the person who found it.";

    }


    // =========================
    // WHEN IT WAS FOUND
    // =========================

    document.getElementById(
        "lostFoundDate"
    ).textContent =
        "📅 Date Found: " +
        (foundItem.date || "Not provided");


    document.getElementById(
        "lostFoundTime"
    ).textContent =
        "🕐 Time Found: " +
        (foundItem.time || "Not provided");


    // =========================
    // PICKUP LOCATION
    // =========================

    document.getElementById(
        "lostPickupPlace"
    ).textContent =
        "📍 Pickup Location: " +
        foundItem.pickupPlace;


    // =========================
    // PICKUP DATE
    // =========================

    document.getElementById(
        "lostPickupDate"
    ).textContent =
        "📅 Pickup Date: " +
        (foundItem.pickupDate || "Any Date");


    // =========================
    // PICKUP TIME
    // =========================

    document.getElementById(
        "lostPickupTime"
    ).textContent =
        "🕐 Pickup Timing: " +
        foundItem.pickupTime;


    // =========================
    // FINDER CONTACT
    // =========================

    document.getElementById(
        "lostFoundContact"
    ).textContent =
        foundItem.contact;

}


// =========================
// FOUND PERSON'S MATCH PAGE
// =========================

function loadFoundMatchPage() {

    var lostItem =
        JSON.parse(
            localStorage.getItem("currentLostItem")
        );


    var foundItem =
        JSON.parse(
            localStorage.getItem("currentFoundItem")
        );


    if (!lostItem || !foundItem) {

        return;

    }


    // =========================
    // ITEM NAME
    // =========================

    document.getElementById(
        "foundMatchedItem"
    ).textContent =
        lostItem.item;


    // =========================
    // DESCRIPTION
    // =========================

    document.getElementById(
        "foundMatchedDescription"
    ).textContent =
        lostItem.description ||
        "No description provided.";


    // =========================
    // LOST ITEM PICTURE
    // =========================

    var photo =
        document.getElementById(
            "foundMatchedPhoto"
        );


    var photoMessage =
        document.getElementById(
            "foundMatchedPhotoMessage"
        );


    if (lostItem.photo) {

        photo.src =
            lostItem.photo;

        photo.style.display =
            "block";

        photoMessage.textContent =
            "";

    }

    else {

        photo.style.display =
            "none";

        photoMessage.textContent =
            "No picture was provided by the person who lost it.";

    }


    // =========================
    // WHEN IT WAS LOST
    // =========================

    document.getElementById(
        "foundLostDate"
    ).textContent =
        "📅 Date Lost: " +
        (lostItem.date || "Not provided");


    document.getElementById(
        "foundLostTime"
    ).textContent =
        "🕐 Time Lost: " +
        (lostItem.time || "Not provided");


    // =========================
    // LOST PERSON CONTACT
    // =========================

    document.getElementById(
        "foundLostContact"
    ).textContent =
        lostItem.contact;

}


// =========================
// PAGE LOADING
// =========================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        loadLostReports();

        loadFoundReports();

        loadLostMatchPage();

        loadFoundMatchPage();

    }
);