/**
 * 
 */

var signin = angular.module('signin', []);

// Sign in - Controller
signin.controller("signup", function($scope, signup) {
  $scope.signup = function() {
    var hashedPass1, hashedPass2;
    
    if ($scope.forename === undefined) alert("Der Vorname fehlt!");
    if ($scope.surname === undefined) alert("Der Nachname fehlt!");
    if ($scope.username === undefined) alert("Der Benutzername fehlt!");
        
    if ($scope.password !== undefined) {
      hashedPass1 = CryptoJS.SHA3($scope.password).toString().toUpperCase();
    } else alert("Das Passwort fehlt");
    
    if ($scope.passwordAgain !== undefined) {
      hashedPass2 = CryptoJS.SHA3($scope.passwordAgain).toString().toUpperCase();
    } else alert("Das Wiederholungspasswort fehlt!");
           
    if ($scope.email === undefined) alert("Die E-Mail fehlt!"); 
    if ($scope.emailAgain === undefined) alert("Die Wiederholungs-E-Mail fehlt!");  
   
    
    if ($scope.forename !== undefined && $scope.surname !== undefined       && 
        $scope.username !== undefined && $scope.password !== undefined      &&
        hashedPass1 !== ""            && $scope.passwordAgain !== undefined &&
        hashedPass2 !== ""            && $scope.email !== undefined         &&
        $scope.emailAgain !== undefined) {
      
      if ($scope.email !== $scope.emailAgain) {
        alert("Die E-Mail-Adressen sind nicht identisch!");
      } 
      
      if (hashedPass1 !== hashedPass2) {
        alert("Die Passwörter sind nicht identisch!");
      }  
      
      if (($scope.email === $scope.emailAgain) && (hashedPass1 === hashedPass2)) {
        // Settings for the database
        var data = {
          forename: $scope.forename,
          surname: $scope.surname,
          username: $scope.username,
          email: $scope.email,
          password: hashedPass1
        };
                                  
        signup.save(data);
      }
    }
  };
});

// Log in - Controller
signin.controller("signin", function($scope, login) {
  $scope.signin = function() {
    var hashedPassword;
    
    // Alert message when the username-field is empty
    if ($scope.username === undefined) {
      alert("Der Username wurde noch nicht ausgefüllt!");
    }
    
    // Converts the password to a hashed password
    if ($scope.password !== undefined) {
      
      /* We're using the CryptoJS from https://code.google.com/p/crypto-js/
       * The password will hashed into SHA3 with a length of 512 bits. */
      hashedPassword = CryptoJS.SHA3($scope.password).toString().toUpperCase();
      
      /* The password should have a length of 128 characters, because a 
       * hexadecimal number is 4 bits long. So the reason is 512 / 4 = 128. */
      // alert("The length of the password is " + password.length + " bits.");
    } else alert("Das Passwort wurde noch nicht ausgefüllt!");
        
    /* When the username field and the password field are both filled out,
     * then login to the server */
    if ($scope.username !== undefined && 
       ($scope.password !== undefined || hashedPassword !== "")) {
      
      // alert("Username:\t" + $scope.username + "\nPassword:\t" + $scope.password);
      
      /* // Settings for the database
      var database = {
        method: "POST",
        url: "/checkLogin",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          username: $scope.username,
          password: hashedPassword
        }
      };
                        
      $http(database).success( function(response) { 
        console.log("Success:\t" + response.success);
        
        brainworks.controller('brainworksCtrl', function($scope) {
          $scope.signed_in = true;
        });
      }).error( function(response) {
        alert("Failure:\t" + response.failure);
      }); */
      var data = {
        username: $scope.username,
        password: hashedPassword 
      };
      
      login.getSingle(data);            
    } 
    
    // Otherwise print a error message
    else alert("Irgendetwas läuft hier schief!");
  };
});

// http://localhost:28017/brainworks/user/
// http://localhost:28017/brainworks/user/?filter_forename=Jens
// mongod.exe --dbpath C:\MongoDB --httpinterface --rest