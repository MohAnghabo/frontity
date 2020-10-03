window.fbAsyncInit = function () {
  FB.init({
    appId: "255557602451898", // FB App ID
    cookie: true,
    xfbml: true,
    version: "v8.0"
  });

  FB.getLoginStatus(function (response) {
    if (response.status === "connected") {
      //display user data
      getFbUserData();
    }
  });
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

// Facebook login with JavaScript SDK
function fbLogin() {
  FB.login(
    function (response) {
      if (response.authResponse) {
        // Get and display the user profile data
        getFbUserData();
      } else {
        // document.getElementById("status").innerHTML =
        //   "User cancelled login or did not fully authorize.";
        console.log("User cancelled login or did not fully authorize.");
      }
    },
    { scope: "email" }
  );
}

function getFbUserData() {
  FB.api(
    "/me",
    {
      locale: "en_US",
      fields: "id,first_name,last_name,email,link,locale,picture"
    },
    function (response) {
      let formData = new FormData();
      formData.append("fbemail", response.email);
      formData.append("fbname", response.first_name + " " + response.last_name);
      formData.append("fbid", response.id);

      console.log(formData);

      //   var xhr = new XMLHttpRequest();
      //   xhr.open("POST", "http://localhost:3000", true);
      //   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      //   xhr.send(formData);
    }
  );
}
