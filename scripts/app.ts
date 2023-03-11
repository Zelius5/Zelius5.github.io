"use strict";

(function(){

  /**
   * Instantiates a contact and stores in localStorage
   * @param fullName
   * @param contactNumber
   * @param emailAddress
   * @constructor
   */
  /**
   * This function will validate an input provided based on a given regular expression
   * @param {string} input_field_id
   * @param {RegExp} regular_expression
   * @param {string} error_message
   */
  function start()
  {
    console.log("App Started!");
    LoadHeader();
    LoadContent();
    LoadFooter();

  }
  window.addEventListener("load", start)
  function AddContact(fullName : string, contactNumber : string, emailAddress : string){
    let contact = new core.Contact(fullName, contactNumber, emailAddress);
    if(contact.serialize()) {
      let key = contact.FullName.substring(0, 1) + Date.now();
      localStorage.setItem(key, contact.serialize() as string);
    }
  }
  function AjaxRequest(method : string, url : string, callback : Function){

    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {

      if(xhr.readyState === 4 && xhr.status === 200){

        if(typeof callback === "function") {
          callback(xhr.responseText);

        }
        else{
          console.error("Error: callback is not a valid function");
        }
      }
    });

    xhr.open(method, url);
    xhr.send();
  }
  function validateField(input_field_id : string, regular_expression : RegExp, error_message : string){
    let fullNamePattern = regular_expression;
    let messageArea = $("#messageArea");

    $(input_field_id).on("blur", function(){

      let fullNameText = $(this).val() as string;
      if(!fullNamePattern.test(fullNameText)) {
        // Fail validation
        $(this).trigger("focus").trigger("select");
        messageArea.addClass("alert alert-danger").text(error_message).show();
      }
      else{
        // Pass validation
        messageArea.removeAttr("class").hide();

      }

    });
  }

  function ContactFormValidation(){
    validateField("#fullName",
      /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
      "Please enter a valid first and last name");
    validateField("#contactNumber",
      /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
      "Please enter a valid contact number");
    validateField("#emailAddress",
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
      "Please enter a valid email address");
  }

  function DisplayContactPage() {
    console.log("Contact Us Page Called");
    ContactFormValidation();

    let sendButton = document.getElementById("sendButton");
    let subscribeCheckbox = document.getElementById("subscribeCheckbox");

    sendButton.addEventListener("click", function (event) {

      if (subscribeCheckbox.checked) {
        let fullName = document.forms[0].fullName.value;
        let contactNumber = document.forms[0].contactNumber.value;
        let emailAddress = document.forms[0].emailAddress.value;
        let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
        if (contact.serialize()) {
          let key = contact.FullName.substring(0, 1) + Date.now();
          localStorage.setItem(key, contact.serialize());
        }
      }
    });
  }
  function DisplayContactListPage(){
    console.log("Contact List Page Called");

    if(localStorage.length > 0){
      let contactList = document.getElementById("contactList");
      let data = "";

      let keys = Object.keys(localStorage);

      let index = 1;
      for(const key of keys){
        let contactData = localStorage.getItem(key);
        let contact = new core.Contact();
        contact.deserialize(contactData);
        data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.FullName}</td>
                         <td>${contact.ContactNumber}</td>
                         <td>${contact.EmailAddress}</td>
                         
                         <td class="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                                <i class="fas fa-edit fa-sm"></i> Edit
                            </button>
                         </td>
                         
                         <td class="text-center">
                            <button value="${key}" class="btn btn-danger btn-sm delete">
                                <i class="fas fa-trash-alt fa-sm"></i> Delete
                            </button>
                         </td>
                         
                         </tr>`;
        index++;
      }
      contactList.innerHTML = data;

      $("#addButton").on("click", () => {
        location.href = "/edit#add";
      });


      $("button.delete").on("click", function (){

        if(confirm("Delete contact, are you sure?")){
          localStorage.removeItem($(this).val())
        }
        location.href = "/contact-list";
      });

      $("button.edit").on("click", function (){
        location.href = "/edit#" + $(this).val();
      });

    }

  }
  function DisplayLoginPage(){
    console.log("Loading Login Page");


    let messageArea = $("#messageArea");
    messageArea.hide();

    $("#loginButton").on("click", function (){

      let success = false;
      let newUser = new core.User();

      $.get("./data/user.json", function(data){

        for(const user of data.user){
          if(username.value === user.Username && password.value === user.Password){
            success = true;
            newUser.fromJSON(user);
            break;
          }
        }

        if(success){
          sessionStorage.setItem("user", newUser.serialize());
          messageArea.removeAttr("class").hide();
          location.href = "index.html";
        }
        else{

          $("#username").trigger("focus").trigger("select");
          messageArea.addClass("alert alert-danger").text("Error: Invalid credentials");
        }
      });

      $("#cancelButton").on("click", function() {
        document.forms[0].reset();
        location.href = "index.html";
      })


    });
  }

  function DisplayEditPage() {
    console.log("Edit Page");
    let page = location.hash.substring(1);
    ContactFormValidation();
    switch (page) {
      case "add":
        $("main>h1").text("Add Contact");
        $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"></i> Add`);
        $("#editButton").on("click", (event) => {
          event.preventDefault();
          let fullName = document.forms[0].fullName.value;
          let contactNumber = document.forms[0].contactNumber.value;
          let emailAddress = document.forms[0].emailAddress.value;
          AddContact(fullName.value, contactNumber.value, emailAddress.value);
          location.href = "/contact-list";
        });
        $("#cancelButton").on("click", () => {
          location.href = "/contact-list";
        });
        break;
      default:
      {
        let contact = new Contact();
        contact.deserialize(localStorage.getItem(page));
        $("#fullName").val(contact.FullName);
        $("#contactNumber").val(contact.ContactNumber);
        $("#emailAddress").val(contact.EmailAddress);
        $("#editButton").on("click", (event) => {
          event.preventDefault();
          contact.FullName = $("#fullName").val();
          contact.ContactNumber = $("#contactNumber").val();
          contact.EmailAddress = $("#emailAddress").val();
          localStorage.setItem(page, contact.serialize());
          location.href = "/contact-list";
        });
      }
        break;
    }
  }
  function CheckLogin(){
    if(sessionStorage.getItem("user")){
      $("#login").html(`<a id="logout" class="nav-link" href="#">
            <i class="fas fa-sign-out-alt"></i> Logout</a>`);
    }
    $("#logout").on("click", function(){
      sessionStorage.clear();
      location.href = "/login";
    });
  }

  function DisplayRegisterPage(){
    console.log("Loading Registry Page")
  }

  function Display404Page(){
    console.log("404 Page");
  }

  function ActiveLinkCallback(){
    switch(router.ActiveLink){
      case "home" : return DisplayHomePage;
      case "about" : return DisplayAboutUsPage;
      case "services" : return DisplayServicesPage;
      case "contact" : return DisplayContactPage;
      case "contact-list" : return DisplayContactListPage;
      case "products" : return DisplayProductPage;
      case "register" : return DisplayRegisterPage;
      case "login" : return DisplayLoginPage;
      case "edit" : return DisplayEditPage;
      case "404" : return Display404Page;
      default:
        console.error("Error: callback does not exist" + router.ActiveLink);
        break;
    }
  }

  function CapitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.splice(1);
  }


  function LoadHeader(){

    $.get("/views/components/header.html", function (html_data) {

      $("header").html(html_data);

      document.title = CapitalizeFirstLetter(router.ActiveLink);
      $(`li > a:contains(${document.title})`).addClass("active");
      CheckLogin();
    });
  }
  function LoadContent(){

    let page_name = router.ActiveLink;
    let callback = ActiveLinkCallback();

    $.get(`./views/content/${page_name}.html`, function (html_data){

      $("main").html(html_data);
      callback();

    });


  }

  function LoadFooter(){
    $.get("/views/components/footer.html", function (html_data) {
      $("footer").html(html_data);
    });

  }

  function DisplayHomePage() {
    console.log("Home Page Called");
    let xhr = new XMLHttpRequest();
    $("#AboutUsBtn").on("click", () => {
      location.href = "/about";
    });
    $("main").append(`<p id="MainParagraph" class="mt-3" >This is the main paragraph</p>`);
    $("body").append(`<article class="container">
                    <p id="ArticleParagraph" class="mt-3"> This is my article paragraph</p></article>`);
  }
  function DisplayProductPage() {
    console.log("Products Page Called");
  }
  function DisplayServicesPage() {
    console.log("Services Page Called");
  }
  function DisplayAboutUsPage() {
    console.log("About Us Page Called");
  }

})();



