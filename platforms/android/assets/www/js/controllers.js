angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('HomeCtrl', function($scope, $ionicLoading, $cordovaGeolocation){

        /*
         function initialize() {
         var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

         var mapOptions = {
         center: myLatlng,
         zoom: 16,
         mapTypeId: google.maps.MapTypeId.ROADMAP
         };
         var map = new google.maps.Map(document.getElementById("map"),
         mapOptions);

         //Marker + infowindow + angularjs compiled ng-click
         var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
         var compiled = $compile(contentString)($scope);

         var infowindow = new google.maps.InfoWindow({
         content: compiled[0]
         });

         var marker = new google.maps.Marker({
         position: myLatlng,
         map: map,
         title: 'Uluru (Ayers Rock)'
         });

         google.maps.event.addListener(marker, 'click', function() {
         infowindow.open(map,marker);
         });

         $scope.map = map;
         }

         $ionicPlatform.ready(initialize);

         $scope.centerOnMe = function() {
         if(!$scope.map) {
         return;
         }

         $scope.loading = $ionicLoading.show({
         content: 'Getting current location...',
         showBackdrop: false
         });

         navigator.geolocation.getCurrentPosition(function(pos) {
         $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
         $scope.loading.hide();
         }, function(error) {
         alert('Unable to get location: ' + error.message);
         });
         };

         $scope.clickTest = function() {
         alert('Example of infowindow with ng-click')
         };
         */

        $scope.mapCreated = function(map) {
            $scope.map = map;
        };

        $scope.centerOnMe = function () {
            console.log("Centering");
            if (!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            /*    navigator.geolocation.getCurrentPosition(function (pos) {
             console.log('Got pos', pos);
             $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
             $scope.loading.hide();
             }, function (error) {
             alert('Unable to get location: ' + error.message);
             });
             */
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    var lat = position.coords.latitude,
                        long = position.coords.longitude,
                        initialLocation = new google.maps.LatLng(lat, long);

                    $scope.map.setCenter(initialLocation);
                    $ionicLoading.hide();


                });
        }
        /* function initialize($coords) {

         var myLatlng = new google.maps.LatLng($coords.lat,$coords.long);

         console.log("aqui");
         var mapOptions = {
         center: myLatlng,
         zoom: 16,
         mapTypeId: google.maps.MapTypeId.ROADMAP
         };
         var map = new google.maps.Map(document.getElementById("map"),
         mapOptions);

         //Marker + infowindow + angularjs compiled ng-click
         var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
         var compiled = $compile(contentString)($scope);

         var infowindow = new google.maps.InfoWindow({
         content: compiled[0]
         });

         var marker = new google.maps.Marker({
         position: myLatlng,
         map: map,
         title: 'Uluru (Ayers Rock)'
         });

         google.maps.event.addListener(marker, 'click', function() {
         infowindow.open(map,marker);
         });

         $scope.map = map;
         }

         navigator.geolocation.getCurrentPosition(function (pos) {
         console.log('Position=')
         console.log(pos);
         latLong = {'lat': pos.coords.latitude, 'long': pos.coords.longitude};

         $ionicPlatform.ready(initialize(latLong));

         }, function (error) {
         console.log('Got error!');
         console.log(error);
         latLong = null

         });

         //google.maps.event.addDomListener(window, 'load', initialize);


         $scope.centerOnMe = function() {
         if(!$scope.map) {
         return;
         }

         $scope.loading = $ionicLoading.show({
         content: 'Getting current location...',
         showBackdrop: false
         });

         navigator.geolocation.getCurrentPosition(function(pos) {
         $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
         $scope.loading.hide();
         }, function(error) {
         alert('Unable to get location: ' + error.message);
         });
         };

         $scope.clickTest = function() {
         alert('Example of infowindow with ng-click')
         };
         */
    })

    .controller('PlaylistsCtrl', function($scope) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })

    .controller('PlaylistCtrl', function($scope, $stateParams) {
    });