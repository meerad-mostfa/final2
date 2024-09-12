document.getElementById("add-trip-button").addEventListener("click", async () => {
  const city = document.getElementById("trip-city").value;
  const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=meeradabdo`;

  console.log(city);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    const tripDateStart = new Date(document.getElementById("trip-date").value);
    const tripDateEnd = new Date(document.getElementById("end-date").value);
    const countryName = data?.geonames[0]?.countryName;
    const location_latitude = data?.geonames[0]?.lat;
    const location_longitude = data?.geonames[0]?.lng;

    console.log('Trip Date Start:', tripDateStart);
    console.log('Trip Date End:', tripDateEnd);
    console.log('Type of Trip Date Start:', typeof tripDateStart);
    console.log('Type of Trip Date End:', typeof tripDateEnd);

    const trip = {
      city,
      country: countryName,
      latitude: location_latitude,
      longitude: location_longitude,
      date: tripDateStart.toISOString(),
      endDate: tripDateEnd.toISOString(),
    };

    const saved = false;
    const id = null;

    await updateUI(trip, saved, id);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
});

async function updateUI(trip, saved, id) {
  console.log(trip);
  const tripCard = document.createElement("div");
  tripCard.className = "trip-card";

  const tripDate = new Date(trip.date);
  const endDate = new Date(trip.endDate);
  const currentDate = new Date();

  console.log('Trip Date (updateUI):', tripDate);
  console.log('End Date (updateUI):', endDate);
  console.log('Current Date (updateUI):', currentDate);

  // Check the types here
  console.log('Type of Trip Date:', typeof tripDate);
  console.log('Type of End Date:', typeof endDate);
  console.log('Type of Current Date:', typeof currentDate);

  try {
    const daysAway = calculateDaysDiff(currentDate, tripDate);
    const triplength = calculateDaysDiff(tripDate, endDate);

    const imageurl = await fetchImageURL(trip.city, trip.country);
    const weather = await fetchWeatherStatus(trip.longitude, trip.latitude);

    tripCard.innerHTML = `
      <img src="${imageurl}" alt="${trip.city}, ${trip.country}" class="trip-image" />
      <div class="trip-details">
        <p><strong>My trip to:</strong> ${trip.city}, ${trip.country}</p>
        <p><strong>Departing:</strong> ${trip.date} <strong>to:</strong> ${trip.endDate}</p>
        <p><strong>Trip length:</strong> ${triplength} days</p>
        <div class="trip-buttons">
          ${saved ? '<button class="remove-trip">Remove Trip</button>' : '<button class="save-trip">Save Trip</button>'}
        </div>
        <p class="trip-info">${trip.city}, ${trip.country} is ${daysAway} days away</p>
        ${daysAway < 7 && daysAway > 0 ? `
          <p class="trip-weather">
            Typical weather in ${weather?.data[daysAway]?.datetime} is:<br />
            max temperature - ${weather?.data[daysAway]?.app_max_temp} min temp - ${weather?.data[daysAway]?.app_min_temp}<br />
            ${weather?.data[daysAway]?.weather?.description}
          </p>` : `<p>Weather appears for 7 days or less</p>`
        }
        <div class="list">
          <div class="list-item" id="add-item">
            <p>Add to-do item<span>+</span></p>
          </div>
          ${trip.list ? trip.list.map((item) => `<div class="list-item"><p>${item}</p></div>`).join('') : ''}
        </div>
      </div>
    `;

    document.getElementById("travel-cont").appendChild(tripCard);

    tripCard.querySelector(".save-trip")?.addEventListener("click", async () => {
      const listItems = Array.from(tripCard.querySelectorAll(".list-item p"))
        .filter((item, index) => index > 0)
        .map((item) => item.textContent);

      const tripData = { ...trip, list: listItems };

      try {
        const response = await fetch("http://localhost:3000/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tripData),
        });

        const data = await response.json();
        console.log("Trip saved:", data);
        id = data.id;

        tripCard.querySelector(".trip-buttons").innerHTML = '<button class="remove-trip">Remove Trip</button>';
        addRemoveTripListener(tripCard, data.id);
      } catch (error) {
        console.error("Error saving trip:", error);
      }
    });

    tripCard.querySelector(".list-item").addEventListener("click", function () {
      let newItemText = prompt("Enter a new to-do item:");
      if (newItemText) {
        let newListItem = document.createElement("div");
        newListItem.className = "list-item";
        let newP = document.createElement("p");
        newP.textContent = newItemText;
        newListItem.appendChild(newP);
        tripCard.querySelector(".list").appendChild(newListItem);

        if (id != null) {
          tripCard.querySelector(".trip-buttons").innerHTML = '<button class="update-list">Update Trip</button>';
          updateTrip(tripCard, trip, id);
        }
      }
    });

    if (saved) {
      addRemoveTripListener(tripCard, trip.id);
    }
  } catch (error) {
    console.error("Error updating UI:", error);
  }
}