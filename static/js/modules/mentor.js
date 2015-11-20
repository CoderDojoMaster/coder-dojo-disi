(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi ai mentor */
    angular.module('mentorModule', ['ngResource'])

    .factory('Mentor', ['$resource', function ($resource) {

        return $resource('/api/mentors/:mid', {}, {
            query: {method:'GET', isArray:true}
        });
    }])

    .controller('aboutController', ['Mentor', function (Mentor) {

        var ctrl = this;
        this.mentors = [];
        this.loading = true;
        this.page = 1;

        this.loadMentors = function (page) {
            var max_results = 6;
            Mentor.get({"max_results":max_results,"page":page},function (data) {
                //success
                    ctrl.mentors = ctrl.mentors.concat(data._items);
                    if (max_results*page < data._meta.total) {
                        ctrl.loadMentors(++ctrl.page);
                    }

                ctrl.loading = false;
            }, function (error) {
                //error
                ctrl.loading = false;
                ctrl.error = true;
                if (error.status == 404) {
                    Materialize.toast("Content not found", 3000, 'red white-text');
                } else if (error.satus == 500) {
                    Materialize.toast("Server error", 3000, 'red white-text');
                }
            }, function () {
                //loading
            }
        );
    };

    this.loadMentors(ctrl.page);


    clear_navigation();

    $('#about-link').addClass("page-active");
}]);

})();
