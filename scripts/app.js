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
  let MainContent = document.getElementsByName("main")[0];
  let Document = document.body;
  let MainParagraph = document.createElement("p")
  MainParagraph.setAttribute("id", "MainParagraph")
  MainParagraph.setAttribute("class","mt-3")
  MainParagraph.textContent = "This is the main paragraph!";
  MainContent.appendChild(MainParagraph);
  window.addEventListener("load", start)
  let FirstString = "This is";
  let SecondString = `${FirstString} the Main Paragraph.`;
  MainParagraph.textContent = SecondString;
  let Article = document.createElement("article");
  let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3"> This is my article paragraph</p>`;
  Article.setAttribute("class", "container")
  Article.innerHTML = ArticleParagraph;
  let DocumentBody;
  DocumentBody.appendChild(Article);
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
