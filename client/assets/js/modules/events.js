(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi agli eventi */
    angular.module('eventsModule', ['ngResource'])

    .factory('Events', ['$resource', function ($resource) {

        return $resource('/api/events/:eid', {}, {
            query: {method:'GET', isArray:true}
        });
    }])

    .controller('eventsController', ['Events', function (Events) {

        var ctrl = this;
        this.events = [];
        this.loading = true;
        this.editing = false;
        this.date = new Date();

        this.checkDate = function (d) {
            var date = new Date(d);
            if (date <= ctrl.date) {
                return true;
            }
            return false;
        };

        this.loadEvents = function () {
            Events.get( function (data) {

                for (var i = 0; i < data._items.length; i++) {
                    data._items[i].showDescription = false;
                }

                //success
                ctrl.events = data._items;
                ctrl.loading = false;
                $('.central-line').height(ctrl.events.length * 420);
            }, function (error) {
                //error
                ctrl.loading = false;
                if (error.status == 404) {
                    $mdToast.show({
                        template: '<md-toast><span flex style="color: #F44336;">Contenuto non trovato</span></md-toast>',
                        hideDelay: 3000
                    });
                } else if (error.satus == 500) {
                    $mdToast.show({
                        template: '<md-toast><span flex style="color: #F44336;">Errore del Server</span></md-toast>',
                        hideDelay: 3000
                    });
                }
            }, function () {
                //loading
            }
        );
    };

    this.enableEditing = function () {

        ctrl.editing = true;
        $('.materialize-textarea').trigger('autoresize');
    };

    this.disableEditing = function () {

        ctrl.editing = false;
    };

    this.loadEvents();

    this.toggleDescription = function (index) {
        ctrl.events[index].showDescription = !(ctrl.events[index].showDescription);
    };

    clear_navigation();

    $('#events-link').addClass("page-active");

}]);

})();
