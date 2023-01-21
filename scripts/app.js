"use strict";
"use strict";
(function(){
  function start()
  {
    console.log("App Started!");
    switch (document.title){
      case "Home":
        DisplayHomepage();
        break;
      case "Products":
        DisplayProductsPage();
        break;
      case "Services":
        DisplayServicesPage();
        break;
      case "About":
        DisplayAboutUsPage();
        break;
      case "Contact":
        DisplayContactUsPage();
        break;
    }
  }
  window.addEventListener("load", start)
})();

function DisplayHomepage() {
  let AboutUsButton = document.getElementById("AboutUsBtn");
  AboutUsButton.addEventListener("click", function()
  {
    location.href = "about.html"
  });
}
DisplayHomepage();
function DisplayProductsPage(){

}
function DisplayServicesPage(){

}
function DisplayAboutUsPage(){

}
function DisplayContactUsPage(){

}
