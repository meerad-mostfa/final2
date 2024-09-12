
l Planner

Introduction Travel Planner is a web application designed to help users plan and manage their trips. It provides information on weather forecasts, images of travel destinations, and calculates the trip duration. This application uses several APIs, including GeoNames for location data, Weatherbit for weather forecasts, and Pixabay for images.

Features Location Data Retrieval: Fetches geographic coordinates and country name based on the destination using the GeoNames API. Weather Forecasting: Provides weather updates for the destination using the Weatherbit API. Image Search: Retrieves images of the destination using the Pixabay API. Trip Duration Calculation: Calculates and displays the total length of the trip in days. Persistent Storage: Stores trip details locally for future reference. Installation

Prerequisites Node.js: Version 16 or higher is required.

**Testing Run tests: npm test


Install dependencies:
npm install


Start the server:
npm start


npm run build-prod 


npm run build-dev

Configuration API Credentials Update the API keys in the configuration files to ensure access to the APIs:

GeoNames API:

Open src/config/geoNamesConfig.js. Enter your GeoNames API key. Weatherbit API:

Open src/config/weatherbitConfig.js. Enter your Weatherbit API key. Pixabay API:

Open src/config/pixabayConfig.js. Enter your Pixabay API key.

Configuration Files Ensure that all configuration files are updated with the correct API keys to avoid issues with accessing the APIs.

Usage Instructions Launch the Application: Open the application in your web browser. Input Destination and Travel Dates: Enter your desired destination and travel dates to receive trip information. View Weather Forecasts and Location Images: See weather forecasts and images of the location, and calculate the duration of your trip.

Dependencies Express: For server-side functionality. Webpack: For module bundling. Babel: For JavaScript transpiling. Sass: For styling.

Acknowledgements GeoNames API Weatherbit API Pixabay API Contributing Contributions are welcome! Please submit a pull request or open an issue to propose changes or improvements.




Usage Instructions
Launch the Application: Open the application in your web browser.
Input Destination and Travel Dates: Enter your desired destination and travel dates to receive trip information.
Access Weather Forecasts and Location Images: View weather forecasts and images of the location, and calculate the duration of your trip.



Acknowledgements
GeoNames API
Weatherbit API
Pixabay API


1. Testing Script:
File: __tests__/calculateDaysDiff.js
import calculateDaysDiff from '../src/client/js/calculateDaysDiff';

describe('calculateDaysDiff', () => {
  it('should return the difference between two dates in days', () => {
    const date1 = new Date('2024-01-01');
    const date2 = new Date('2024-01-15');
    expect(calculateDaysDiff(date1, date2)).toBe(14);
  });
});

Explanation:

This is a test file using Jest, a JavaScript testing framework.
It tests the calculateDaysDiff function to ensure it correctly calculates the number of days between two dates.
The describe block defines the suite of tests for calculateDaysDiff, and the it block describes a single test case.
It creates two dates, date1 and date2, and expects the function calculateDaysDiff to return 14, which is the number of days between these two dates.
2. Main Application Script:
File: src/client/js/app.js

Explanation:

Event Listener for "Add Trip" Button:

Adds an event listener to the button with id add-trip-button.
When clicked, it triggers the handleAddTrip function.
handleAddTrip Function:

Retrieves city, start date, and end date values from the input fields.
Constructs a URL to fetch geographical data using the GeoNames API.
On successful fetch, it extracts relevant data and calls updateUI to update the user interface with the trip details.
fetchImageURL Function:

Fetches a tourist image URL from the Pixabay API based on the city and country.
Returns the URL of the first image found or null.
fetchWeatherStatus Function:

Fetches weather forecast data from the Weatherbit API based on latitude and longitude.
Returns the weather data for a 7-day forecast.
updateUI Function:

Creates and adds a trip card element to the UI.
Fetches the image and weather status using Promise.all to run both functions in parallel.
Updates the card with trip details, weather, and to-do list options.
saveTrip Function:

Saves the trip to the server and updates the UI with a "Remove Trip" button.
addToDoItem Function:

Allows adding a new to-do item to the trip's list.
Updates the UI to reflect changes.
addRemoveTripListener Function:

Adds an event listener to remove a trip from the server and UI.
updateTrip Function:

Updates an existing trip on the server with new data and changes the button to "Remove Trip".
3. Calculate Days Difference Function:
File: src/client/js/calculateDaysDiff.js
export function calculateDaysDiff(date1, date2) {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

Explanation:

This function calculates the difference between two dates in days.
It computes the absolute difference in milliseconds and converts it to days.
4. Styles:
File: src/client/styles/style.scss

Explanation:

Defines various styles for the travel planner application.
Styles include layout and design for elements like the body, trip cards, buttons, and responsive adjustments for smaller screens.
5. HTML Template:
File: src/client/views/index.html

Explanation:

Defines the structure of the main HTML page for the travel planner app.
Includes input fields for city and dates, and a button to add a new trip.
6. Entry Point for Client-Side Code:
File: src/client/index.js
import "./js/app.js";
import "./styles/style.scss";
import { calculateDaysDiff } from "./js/calculateDaysDiff.js";
console.log("heeeeeeeeeeeee");
export { calculateDaysDiff };
Explanation:

Imports the main application script, styles, and calculateDaysDiff function.
Logs a message to the console for debugging purposes.
7. Server Code:
File: src/server/server.js

Explanation:

Sets up an Express server with routes for managing trips.
Includes routes to serve the main HTML file, get all trips, add a new trip, update an existing trip, and delete a trip.
Uses an in-memory data store to manage trips data.
8. Webpack Configuration (Development):
File: webpack.dev.js

Explanation:

Configures Webpack for development mode.
Specifies entry and output points, sets up rules for JavaScript and SCSS, and includes plugins for HTML generation and environment variables.
9. Webpack Configuration (Production):
File: webpack.prod.js

Explanation:

Configures Webpack for production mode.
Similar to the development configuration but omits some features like SCSS handling for simplicity in production.
Overall, this project sets up a travel planner application with a client-side interface for managing trips and a server to handle CRUD operations. Webpack is used to bundle and manage the project's assets.





rm -rf node_modules package-lock.json
