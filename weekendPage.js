
function fetchHotels() {
    fetch("https://expediaclone-default-rtdb.firebaseio.com/hotels.json")
        .then(response => response.json())
        .then(data => {
            if (!data) {
                console.error("No data found");
                return;
            }

            const hotels = Object.values(data).filter(hotel => hotel && hotel.image && hotel.image.length > 0)
            .slice(0, 14); 
            if (hotels.length === 0) {
                console.warn("No valid hotel data available.");
                return;
            }

            displayHotels(hotels);
        })
        .catch(error => console.error("Error fetching data:", error));
}

function displayHotels(hotels) {
    const container = document.querySelector(".hotel-container");


    hotels.forEach(hotel => {
        const hotelCard = document.createElement("div");
        hotelCard.classList.add("hotel-card");

        let currentImageIndex = 0;

        hotelCard.innerHTML = `
            <div class="slider">
                <button class="left"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 18l-6-6 6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> </button>
                <div class="image-container">
                    <img src="${hotel.image[currentImageIndex]}" alt="${hotel.name}"/>
                </div>
                <button class="right"><svg width="24" height="24" font-weight="bold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 18l6-6-6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></button>
            </div>
            <div class="hotel-info">
                <h3>${hotel.name || "Unknown Hotel"}</h3>
                <p>${hotel.place || "Unknown Location"}</p>
                <p>Rent: ₹${hotel.rent_price || "N/A"}</p>
                <p>Discount: ${hotel.discount || "No Discount"}</p>
                <p>Rating: ⭐ ${hotel.rating || "Not Rated"}</p>
            </div>
        `;

        const imgElement = hotelCard.querySelector(".image-container img");
        const leftBtn = hotelCard.querySelector(".left");
        const rightBtn = hotelCard.querySelector(".right");

        leftBtn.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex - 1 + hotel.image.length) % hotel.image.length;
            imgElement.src = hotel.image[currentImageIndex];
        });

        rightBtn.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex + 1) % hotel.image.length;
            imgElement.src = hotel.image[currentImageIndex];
        });

        container.appendChild(hotelCard);
    });
}

fetchHotels();

