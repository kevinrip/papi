const changeUI = (data) => {
    let experience = data.owns_subaru_outback;

    let headerSelector = '#personalizationHeader';
    let subtitleSelector = '#personalizationSubtitle';
    let buttonSelector = '#personalizationButton';

    let header = document.querySelector(headerSelector);
    let subtitle = document.querySelector(subtitleSelector);
    let button = document.querySelector(buttonSelector);

    subtitle.innerHTML = ` On Your Car Insurance In <span style="color: rgb(236, 102, 8);">${data.city}</span>`;


    switch (experience) {
        case true:
            header.innerHTML = `Get a Free Quote on your <span style="color: rgb(236, 102, 8);">Subaru</span>`;
            break;
        default:
            header.innerHTML = `Get a Free Quote Now`;
            console.log("Invalid option selected");
    }
}



const fetchUserData = (userId) => {
    let url = `https://proxy.cors.sh/https://personalization.us-west-2.hightouch.com/v1/collections/mycustomers/records/id/${userId}`;



    return fetch(url, {
        method: "GET",
        headers: { "Authorization": "Bearer 6f8a775e-a7b3-42dc-8f4d-aeb9306050e0", 'x-cors-api-key': 'temp_14effb80b28eaad674777abbf7f37182' },
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(`Error fetching data: ${error}`);
        });

    // let url = `http://127.0.0.1:5000/get_records/${userId}`;



    // return fetch(url, {
    //     method: "GET"
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         return data;
    //     })
    //     .catch(error => {
    //         console.error(`Error fetching data: ${error}`);
    //     });

}





const displayResponse = () => {

    // Create div element
    let floatingDiv = document.createElement("div");
    floatingDiv.style.position = "fixed";
    floatingDiv.style.top = "50%";
    floatingDiv.style.left = "90%";
    floatingDiv.style.transform = "translate(-50%, -50%)";
    floatingDiv.style.backgroundColor = "white";
    floatingDiv.style.padding = "10px";
    floatingDiv.style.border = "1px solid black";
    floatingDiv.style.cursor = "move";
    floatingDiv.id = "response";
    floatingDiv.style.fontFamily = "monospace";
    floatingDiv.style.fontSize = "14px";
    floatingDiv.style.zIndex = "99999";

    // Add text content to div
    floatingDiv.innerHTML = "API Response";

    // Make div movable
    floatingDiv.addEventListener("mousedown", function (event) {
        let shiftX = event.clientX - floatingDiv.getBoundingClientRect().left;
        let shiftY = event.clientY - floatingDiv.getBoundingClientRect().top;
        document.addEventListener("mousemove", moveAt);
        document.addEventListener("mouseup", stopMove);
        floatingDiv.style.position = "absolute";
        floatingDiv.style.zIndex = 1000;
        document.body.append(floatingDiv);
        moveAt(event);

        function moveAt(event) {
            floatingDiv.style.left = event.clientX - shiftX + "px";
            floatingDiv.style.top = event.clientY - shiftY + "px";
        }

        function stopMove() {
            document.removeEventListener("mousemove", moveAt);
            document.removeEventListener("mouseup", stopMove);
        }
    });

    floatingDiv.ondragstart = function () {
        return false;
    };

    // Append div to body
    document.body.appendChild(floatingDiv);

}

const displayBanner = () => {
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
    banner.style.zIndex = "99999999";

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
                changeUI(data);
                // document.querySelector('#response').innerHTML = JSON.stringify(data, null, "\t");

                document.querySelector('#response').innerHTML = formatJSON(data);

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
}

const formatJSON = (obj) => {
    let html = "<pre style='color: green;'>{<br>";
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            html += "&nbsp;&nbsp;<span style='color: blue;'>" + key + "</span>: ";
            if (typeof value === "string") {
                html += "<span style='color: red;'>" + value + "</span>,<br>";
            } else if (typeof value === "boolean") {
                html += "<span style='color: red;'>" + value.toString() + "</span>,<br>";
            } else if (typeof value === "number") {
                html += "<span style='color: red;'>" + value + "</span>,<br>";
            } else if (Array.isArray(value)) {
                html += "<span style='color: red;'>[<br>";
                for (const item of value) {
                    html += formatJSON(item) + ",<br>";
                }
                html += "&nbsp;&nbsp;]</span>,<br>";
            } else if (typeof value === "object") {
                html += formatJSON(value) + ",<br>";
            }
        }
    }
    html += "}</pre>";
    return html;
}


displayBanner();
displayResponse();