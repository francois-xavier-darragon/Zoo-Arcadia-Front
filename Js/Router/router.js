import Route from "./route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// Creating a route for the 404 page (page not found)
const route404 = new Route("404", "Page introuvable", "/pages/404.html");

// Function to retrieve the route corresponding to a given URL
const getRouteByUrl = (url) => {
  let currentRoute = null;
  // Browse all routes to find the connection
  allRoutes.forEach((element) => {
    if (element.url == url) {
      currentRoute = element;
    }
  });
  // If no match is found, return route 404
  if (currentRoute != null) {
    return currentRoute;
  } else {
    return route404;
  }
};

// Function to load page content
const LoadContentPage = async () => {
  const path = window.location.pathname;
  // Récupération de l'URL actuelle
  const actualRoute = getRouteByUrl(path);
  //Retrieving the current URL
  const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
  // Adding HTML content to element with id "main-page"
  document.getElementById("main-page").innerHTML = html;

  // Adding JavaScript content
  if (actualRoute.pathJS != "") {
    // Adding the script tag to the body of the document
    let scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", actualRoute.pathJS);

    // Changing the page title
    document.querySelector("body").appendChild(scriptTag);
  }

  // Changement du titre de la page
  document.title = actualRoute.title + " - " + websiteName;
};

// Function to handle routing events (click on links)
const routeEvent = (event) => {
  event = event || window.event;
  event.preventDefault();
  // Updating URL in Browser History
  window.history.pushState({}, "", event.target.href);
  // Loading new page content
  LoadContentPage();
};

// Handling browser history rollback event
window.onpopstate = LoadContentPage;
// Assigning the routeEvent function to the window's route property
window.route = routeEvent;
// Loading page content on initial load
LoadContentPage();