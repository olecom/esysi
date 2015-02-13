///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classFormDictionaryMenu, {

    windowDictionaryEdit: null,

    idMenu: 'menuDictionaries',
    btnPrefix: "btnDict_",

    constructor: function (options) {

        Ext.apply(this, options || {});

        var that = this;

        this.getMenuItems = function () {

            var partMenu = [
                {
                    id: 'btnAddDictionary',
                    endsWithId: false,
                    handler: function () { that.btnAddDictionary_Click(); }
                },
                {
                    id: 'btnDelDictionary',
                    endsWithId: false,
                    handler: function () { that.btnDelDictionary_Click(); }
                },
                {
                    id: 'btnPropertyTypes',
                    endsWithId: false,
                    handler: function () { that.btnPropertyTypes_Click(); }
                },
                {
                    id: 'btnEditRecordClasses',
                    endsWithId: false,
                    handler: function () { that.btnEditRecordClasses_Click(); }
                },
                {
                    id: 'btnDict_',
                    endsWithId: true,
                    handler: function (id, title) {
                        var dictForm = Ext.create("ManAcc.Dictionaries.WindowDictionaryEdit",
                        {
                            idDictionary: id,
                            dictionaryName: title
                        });
                    }
                }
            ];

            return partMenu;
        };

        $(application).on("AddToolbarMenuButton", function (event, id, name) {
            that.addToolbarMenuButton(id, name);
        });

        $(application).on("DeleteToolberMenuButton", function (event, id) {
            that.deleteToolberMenuButton(id);
        });
    },
    btnAddDictionary_Click: function () {
        var that = this;
        Ext.MessageBox.prompt(config.ttlCreateDictionary, config.ttlEnterDictionaryName,
            function (btn, text) {
                if (btn == "ok") {
                    var response = HostApi.DictionaryCreate(text);
                    that.addToolbarMenuButton(response.id, response.name); 
                }
            }
        );
    },
    btnDelDictionary_Click: function () {
        var windowDelDict = Ext.create("ManAcc.Dictionaries.WindowDictionaryDelete", {});
        windowDelDict.show();
    },
    btnPropertyTypes_Click: function () {
        var that = this;
        var formDictionaryPropertyType = Ext.create("ManAcc.Dictionaries.WindowPropertyType", {});
        formDictionaryPropertyType.show();
    },
    btnEditRecordClasses_Click: function () {
        Ext.create(config.classFormClassEdit);
    },
    getDictMenuItems: function () {

        var that = this;
        var mi = this.getDictionaryList();
        var res = [];
        if (mi != null) {
            for (i = 0; i < mi.length; i++) {

                var id = mi[i].Id;
                var dictName = mi[i].Name;
                (function (val, dictName) {

                    res.push({
                        id: that.btnPrefix + mi[i].Id,
                        text: dictName,
                        handler: function () {
                            var dictForm = Ext.create("ManAcc.Dictionaries.WindowDictionaryEdit",
                                            {
                                                idDictionary: val,
                                                dictionaryName: dictName
                                            });
                        }
                    });
                })(id, dictName);
            }
        }
        return res;

    },
    getDictionaryList: function () {
 
        return HostApi.DictionaryGetList();
    },
    addToolbarMenuButton: function (dataInputId, dataInputName) {
        var that = this;
        var btnMain = Ext.getCmp(this.idMenu);
        var button = {
            id: that.btnPrefix + dataInputId,
            text: dataInputName,
            handler: function () {
                var dictForm = Ext.create("ManAcc.Dictionaries.WindowDictionaryEdit",
                                {
                                    idDictionary: dataInputId
                                });
            }
        };
        btnMain.menu.add(button);
    },
    deleteToolberMenuButton: function (dataInputId) {
        var btnMain = Ext.getCmp(this.idMenu);
        var id = this.btnPrefix + dataInputId;
        var button = Ext.getCmp(id);
        btnMain.menu.remove(button);
    }

});

application.moduleClasses.push(config.classFormDictionaryMenu);