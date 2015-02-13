Ext.define(config.classFormUser, {
    constructor: function (options) {

        Ext.apply(this, options || {});

        var that = this;

        this.getMenuItems = function () {

            var partMenu = [
                    {
                        id: 'btnQuitUser',
                        handler: function () {

                            $.cookie('sid', "");
                            $.cookie('usr', "");
                            location.reload();
                        }
                    },
                    {
                        id: 'btnRuLang',
                        handler: function () {
                            window.location = 'http://' + config.domain + '/?lang=ru';
                        }
                    },
                    {
                        id: 'btnEnLang',
                        handler: function () {
                            window.location = 'http://' + config.domain + '/?lang=en';
                        }
                    },
                    {
                        id: 'btnHelp',
                        handler: function () {
                            window.open('http://esysi.com/ru/instruktsii', 'Помощь Управленческий учет', '');
                            
                        }
                    }
                ];

            return partMenu;
        };
    }
});

application.moduleClasses.push(config.classFormUser);