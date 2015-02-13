///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />
var application = {

    moduleClasses: [],

    modules: [],

    init: function () {

        var that = this;

        document.title = config.ttlSiteName;

        var auth = Ext.create(config.classFormAuth,
                    {
                        onSuccessAuth: function () {
                            if (config.needReloadAfterAuth == true) location.reload();
                            that.attacheModules();
                            that.createToolbar();
                            that.createViewport();
                        }
                    });

        auth.checkUser();

    },

    pnlToolbar: null,
    pnlSpace: null,

    createToolbar: function () {

        var items = ['<strong>' + config.ttlSiteName + '</strong>'];

        response = HostApi.MenuItemGetList();

        for (var i = 0; i < this.modules.length; i++) {

            var menu_part = this.modules[i].getMenuItems();
            //filter
            var j = 0;
            while (j < menu_part.items.length) {
                var del = true;

                var criteria = function (obj) {
                    return ((obj.MenuName == menu_part.id)
                        && (obj.ButtonName == menu_part.items[j].id));
                };

                var index = $(response).ArrayIndexOf(criteria);

                if ((index >= 0) //если найден в разрешенных
                 || (menu_part.items[j] == '-'))        //или если это разделитель
                {
                    j++;
                } else {
                    menu_part.items.splice(j, 1);
                }

            }
            if (menu_part.items.length == 0) continue;

            if (menu_part.items[0] == "-") menu_part.items.splice(0, 1);

            if (menu_part.items.length == 0) continue;

            var len = menu_part.items.length;
            if (menu_part.items[len - 1] == "-") menu_part.items.splice(len - 1, 1);

            if (menu_part.items.length == 0) continue;

            //create
            var menu = Ext.create('Ext.menu.Menu', {
                id: menu_part.id,
                style: { overflow: 'visible' },
                items: menu_part.items
            });

            var partMenu = {
                text: menu_part.title,
                iconCls: 'bmenu',
                menu: menu
            };

            items = items.concat(partMenu);
        };

        this.pnlToolbar = Ext.create('Ext.toolbar.Toolbar', {
            id: 'mainToolbar',
            region: 'north',
            width: '100%',
            items: items
        });

        return this.pnlToolbar;

    },

    createViewport: function () {

        this.pnlSpace = Ext.create('Ext.panel.Panel', {
            collapsible: false,
            region: 'center'

        });

        var iframe = new Ext.Component({
            autoEl: {
                tag: 'iframe',
                style: 'height: 100%; width: 100%; border: none',
                src: '/Content/startpage/doc.html'
            }
        });

        this.pnlSpace.add(iframe);

        var viewport = Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [this.pnlToolbar, this.pnlSpace]
        });
    },

    attacheModules: function () {
        for (var i = 0; i < this.moduleClasses.length; i++) {
            this.modules.push(Ext.create(this.moduleClasses[i], {}));
        }
    }
}