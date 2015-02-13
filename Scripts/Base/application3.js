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

        response = HostApi.MenuItemGetList2();
		usermenu = response;
		
		for (var i = 0; i < usermenu.length; i++) { // цикл по меню пользователя
			var usermenu_part = usermenu[i];			
			
			for (var j = 0; j < this.modules.length; j++) { // цикл по меню модулей
				var fullmenu_part = this.modules[j].getMenuItems();
				
				if (usermenu_part.id == fullmenu_part.id) {
	// original - меню modules для сравнения, objmenu - рекурсивное пользовательское меню, tree - рекурсивное дерево меню 
					function treerecursion(original, objmenu, tree) {
						var tempTree;
						if (objmenu.menu.length == 0) {
							for(var t = 0; t < original.items.length; t++) {
								if(objmenu.id == original.items[t].id) {
									tempTree = {text: (objmenu.translate)?config[objmenu.text]:objmenu.text, handler: original.items[t].handler};
								};
							};
							// Если ничего не найдет - значит странный у пользователя пункт меню, которого нет в модулях
						}
						else {
							tempTree = {text: (objmenu.translate)?config[objmenu.text]:objmenu.text,	iconCls: 'bmenu', menu: []};
						};
						for (var k = 0; k < objmenu.menu.length; k++) {
							tempTree = treerecursion(original, objmenu.menu[k], tempTree);
						};
						(tree) ? tree.menu.push(tempTree) : tree = tempTree;
						return (tree);
					}

					var AllMenu = treerecursion(fullmenu_part,usermenu_part, 0);
					
					items = items.concat(AllMenu);
					break;
				}
				else if (usermenu_part.id == '->') {
					items = items.concat('->');
					break;
				}
				else if (usermenu_part.id == 'btnHelp') {
					items = items.concat({text: 'Помощь'});
					break;
				}
				else if (usermenu_part.id == 'btnQuit') {
					items = items.concat({text: 'Выход'});
					break;
				}
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
    }
}