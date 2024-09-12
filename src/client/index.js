import "./js/app.js";
import "./styles/style.scss";
import calculateDaysDiff from './js/calculateDaysDiff';

console.log("heeeeeeeeeeeee");
export { calculateDaysDiff };


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    });
}

