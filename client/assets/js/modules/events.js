(function () {
    'use strict';

    /* modulo per la comunicazione con il server dei dati relativi agli eventi */
    angular.module('eventsModule', ['ngResource', 'ngSanitize'])

        .factory('Events', ['$resource', function ($resource) {

            return $resource('/api/events/:eid', {}, {
                query: {method: 'GET', isArray: true}
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
                Events.get(function (data) {
                        //success
                        ctrl.events = data._items;
                        ctrl.loading = false;
                        $('.central-line').height(ctrl.events.length * 420);
                    }, function (error) {
                        //error
                        ctrl.loading = false;
                        if (error.status == 404) {
                            Materialize.toast("Content not found", 3000, 'red-text white');
                        } else if (error.satus == 500) {
                            Materialize.toast("Server error", 3000, 'red-text white');
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

            clear_navigation();

            $('#events-link').addClass("page-active");


        }])
        .directive('event', function () {
            return {
                restrict: 'E',
                bindToController: {
                    description: "=",
                    index: "="
                },
                controller: function ($sce) {
                    var controller = this;
                    controller.click = function () {
                        if (!controller.editing) {
                            controller.editing = true;
                            var tiny = tinymce.init({
                                selector: '#editor' + controller.index,
                                plugins: "save",
                                toolbar: "save cancel",
                                save_oncancelcallback: function (editor) {
                                    editor.setContent(controller.description);
                                },
                                save_onsavecallback: function (editor) {
                                    var text = $sce.trustAsHtml(editor.getContent({format: 'html'}));
                                    controller.description = text;
                                }
                            });
                            tiny.then(function (editors) {
                                controller.tinymce = editors[0];
                                controller.tinymce.setContent(controller.description);
                            });
                        } else {
                            tinymce.remove(controller.tinymce);
                            controller.editing = false;
                        }
                    };

                },
                controllerAs: "ctrl"
            }
        });

})();
