///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />
var application = {

    moduleClasses: [],

    modules: [],

    pnlToolbar: null,
    pnlSpace: null,

    init: function () {

        var that = this;

        document.title = config.ttlSiteName;

        var auth = Ext.create(config.classFormAuth,
                    {
                        onSuccessAuth: function () {
                            if (config.needReloadAfterAuth == true) {
                                window.location.assign('http://' + config.domain + '/');
                            }
                            else {
                                that.attacheModules();
                                that.createToolbar();
                                that.createViewport();
                            }
                        }
                    });

        auth.checkUser();

    },

    createToolbar: function () {

        var items = ['<strong>' + config.ttlSiteName + '</strong>'];

        usermenu = HostApi.MenuItemGetList();

        for (var i = 0; i < usermenu.length; i++) { // цикл по меню пользователя
            var usermenu_part = usermenu[i];

            if (usermenu_part.id == '->') {
                items = items.concat('->');
            }
            else {
                var AllMenu = this.treerecursion(usermenu_part, 0);
                items = items.concat(AllMenu);
            }
        }

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
    },

    treerecursion: function (objmenu, tree) {
        // objmenu - рекурсивное пользовательское меню, tree - рекурсивное дерево меню
        // вынес бы ((objmenu.translate) && (config[objmenu.text])) ? config[objmenu.text] : objmenu.text в отдельную ф-ию		
        var tempTree;
        if (objmenu.menu.length == 0) {
            var flag = 0;
            for (var k = 0; k < this.modules.length; k++) { // цикл по меню модулей
                var fullmenu_part = this.modules[k].getMenuItems();
                for (var j = 0; j < fullmenu_part.length; j++) { // цикл по меню модулей					
                    var part = fullmenu_part[j];

                    if (objmenu.id == part.id) {
                        tempTree = {
                            text: ((objmenu.translate) && (config[objmenu.text])) ? config[objmenu.text] : objmenu.text,
                            handler: part.handler,
                            id: objmenu.id
                        };
                        flag = 1;
                    }
                    else if (objmenu.id.indexOf(part.id) == 0 && part.endsWithId == true) {
                        var suffixId = objmenu.id.substring(part.id.length);
                        var title = (objmenu.translate) && (config[objmenu.text]) ? config[objmenu.text] : objmenu.text;
                        var part_handler = part.handler;
                        tempTree = {
                            text: ((objmenu.translate) && (config[objmenu.text])) ? config[objmenu.text] : objmenu.text,
                            handler: function () {
                                var title = (objmenu.translate) ? config[objmenu.text] : objmenu.text;
                                part_handler(suffixId, title);
                            },
                            id: objmenu.id
                        };
                        flag = 1;
                    }
                    // Если ничего не найдет - значит странный у пользователя пункт меню, которого нет в модулях
                }
                //if (flag) break;
            }
            if (flag == 0) {
                tempTree = {
                    text: ((objmenu.translate) && (config[objmenu.text])) ? config[objmenu.text] : objmenu.text,
                    id: objmenu.id
                };
            };

        } else {
            tempTree = {
                text: ((objmenu.translate) && (config[objmenu.text])) ? config[objmenu.text] : objmenu.text,
                iconCls: 'bmenu',
                menu: [],
                id: objmenu.id
            };
        };
        for (var k = 0; k < objmenu.menu.length; k++) {
            tempTree = this.treerecursion(objmenu.menu[k], tempTree);
        };
        (tree) ? tree.menu.push(tempTree) : tree = tempTree;
        return (tree);
    }
}