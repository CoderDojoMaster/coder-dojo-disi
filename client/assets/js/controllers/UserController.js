/**
 * Created by mion00 on 21/03/16.
 */

module.exports = function ($http) {
    var ctrl = this;
    ctrl.onSignIn = function (googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
        $http.post("/api/login", {googleToken: id_token})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log("error");
                console.log(response);
            })
    };

    ctrl.logout = function () {
        console.log(gapi.auth2.getAuthInstance().signOut().then(function () {
            console.log("logout");
        }));
    };

    ctrl.modal = function () {
        $("#login").openModal();
        gapi.signin2.render('g-signin2', {
            'scope': 'profile email',
            'onsuccess': ctrl.onSignIn
        });
    }
};
