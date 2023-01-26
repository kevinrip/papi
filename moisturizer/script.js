// Create banner div element
let banner = document.createElement("div");
banner.id = "banner";
banner.style.position = "fixed";
banner.style.bottom = "0";
banner.style.left = "0";
banner.style.right = "0";
banner.style.width = "100%";
banner.style.backgroundColor = "#f0f0f0";
banner.style.padding = "10px";

// Create text field element
let bannerText = document.createElement("input");
bannerText.type = "text";
bannerText.id = "bannerText";
bannerText.style.cssFloat = "left";

// Create button element
let bannerButton = document.createElement("button");
bannerButton.id = "bannerButton";
bannerButton.innerHTML = "Switch User";
bannerButton.style.cssFloat = "lefts";

// Add event listener to button
bannerButton.addEventListener("click", function () {
    fetchUserData(bannerText.value)
        .then(data => {
            console.log(data);
            changeUI(data.data.first_name)
        });
});

bannerText.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        // 13 is the key code for the "Enter" key
        bannerButton.click();
    }
});

// Append elements to banner div
banner.appendChild(bannerText);
banner.appendChild(bannerButton);

// Append banner to body
document.body.appendChild(banner);



const fetchUserData = (userId) => {
    let url = `https://reqres.in/api/users/${userId}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(`Error fetching data: ${error}`);
        });
}


const changeUI = (experience) => {
    let header = document.querySelector('#personalizationHeader');
    let subtitle = document.querySelector('#personalizationSubtitle');
    let button = document.querySelector('#personalizationButton');

    switch (experience) {
        case "George":
            header.innerHTML = "Unlock your <br> potential";
            subtitle.innerHTML = "Energy should be easy. Free shipping on your next order!";
            button.innerHTML = "Unlock Free Shipping";
            console.log("Option 1 selected");
            break;
        case "Janet":
            header.innerHTML = "We've missed you!";
            subtitle.innerHTML = "We hope you enjoyed your first purchase. Here's 30% off your next order.";
            button.innerHTML = "Enjoy 30% off";
            console.log("Option 2 selected");
            break;
        case "Emma":
            header.innerHTML = "Flash Sale: <br> Body Wash";
            subtitle.innerHTML = "We're offering a BOGO deal on our body wash products!";
            button.innerHTML = "Browse Body Wash";
            console.log("Option 3 selected");
            break;
        default:
            console.log("Invalid option selected");
    }
}