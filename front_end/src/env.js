
/**
 * Get the url of the backend, differentiating for production and dev
 * REACT_APP_USE_PRODUCTION_API can be set to true to always use the heroku backend
 * @returns {string} the url, without a slash
 */
export function getURL() {
    if (process.env.NODE_ENV === "production" || process.env.REACT_APP_USE_PRODUCTION_API === "true") {
        return "https://deepcutsapp-apps.herokuapp.com";
    }
    else {
        return "http://localhost:3001"
    }
}