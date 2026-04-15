// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="
// Your code here!
//fetching weather alerts from external API
async function fetchWeatherAlerts(state) {
    try {
        const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);  
        }
        const data = await response.json(); 
        displayAlerts(data)
        hideError();
    } catch (error) {
        console.error("Error fetching weather alerts:", error);
        showError(error.message);
    }
}
//Displaying alerts on the page
function displayAlerts(data){
    const alertsContainer = document.getElementById('alerts-display');
    alertsContainer.innerHTML = "";
    const alerts = data.features;
    //Summary Message
    const summary = document.createElement("h2");
    summary.textContent = `Weather Alerts: ${alerts.length}`;
    alertsContainer.appendChild(summary);
    //List of alert headlines
    const list = document.createElement("ul");
    alerts.forEach(alert => {
        const alertItem = document.createElement("li")
        alertItem.textContent = alert.properties.headline;
        list.appendChild(alertItem);
    });
    alertsContainer.appendChild(list);
}
//clickEvent
document.getElementById('fetch-alerts').addEventListener("click", ()=>{
    const input = document.getElementById("state-input")
    const state = input.value.trim().toUpperCase();

    document.getElementById('alerts-display').innerHTML = "";

    if(!state){
        showError("Please enter a valid state abbreviation.");
        return;
    }
   fetchWeatherAlerts(state);

    // Clear and reset the UI
    input.value = "";
    
}); 
//Error Handling
function showError(message){
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}
//Hide error message when next successful request is made
function hideError(){
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");

}
