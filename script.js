async function googleTranslateElementInit() {
    const res = await fetch("https://libretranslate.org/translate", {
        method: "POST",
        body: JSON.stringify({
            q: "",
            source: "en",
            target: "es",
            format: "text",
            api_key: ""
        }),
        headers: { "Content-Type": "application/json" }
    });
    
    console.log(await res.json())
}

const findMyState = (translateElement) => {
    const status = document.querySelector('.status');

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                const countryCode = data.countryCode.toLowerCase();
                console.log(countryCode)
                // Set language for Google Translate widget
            translateElement.setSelectedLanguage(countryCode);
                status.textContent = countryCode;
            });
    };

    const error = () => {
        status.textContent = "Unable to retrieve your location";
    };
    
    navigator.geolocation.getCurrentPosition(success, error);
};

document.querySelector('.find-state').addEventListener('click', () => findMyState(null));
