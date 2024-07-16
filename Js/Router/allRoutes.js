import Route from "./route.js";

export const allRoutes = [
  new Route("/", "Accueil", "./pages/home.html", []),
  new Route("/signin", "Connexion", "./pages/auth/signin.html", ["disconnected"], "/Js/auth/signin.js"),
  new Route("/signup", "Inscription", "./pages/auth/signup.html", ["disconnected"], "/Js/auth/signup.js"),
  new Route("/account", "Mon compte", "/pages/auth/account.html",["visitor", "admin", "Js/account.js"]),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Arcadia";
