///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classFormDataInputMenu, {
    idDataInputForm: null,
    idMenuDataInput: 'menuDataInput',
    btnPrefix: "btnDataInput_",
    constructor: function (options) {

        Ext.apply(this, options || {});

        var that = this;

        this.getMenuItems = function () {

            var partMenu = [
                    {
                        id: 'btnAddDataInput',
                        endsWithId: false,
                        handler: function () { that.btnAddDataInput_Click(); }
                    },
                    {
                        id: 'btnDelDataInput',
                        endsWithId: false,
                        handler: function () { that.btnDelDataInput_Click(); }
                    },
                    {
                        id: 'btnOpenDataInput',
                        endsWithId: false,
                        handler: function () { that.btnOpenDataInput_Click(); }
                    },
                    {
                        id: 'btnDataInput_',
                        endsWithId: true,
                        handler: function (id, title) {
                            var formTableRecords = Ext.create(config.classFormDataInputView,
                            {
                                idDataInput: id,
                                titleWindow: title
                            });
                            formTableRecords.show();
                        }
                    }
                ];

            return partMenu;
        };
    },
    isOpenMode: function () {
        return (this.idDataInputForm != null);
    },
    btnAddDataInput_Click: function () {

        var that = this;

        Ext.create(config.classDialogDataInputConfiguration, {
            onDataInputCreated: function (id, name) {
                that.addToolbarMenuButton(id, name);
            }
        }).show();

    },
    btnDelDataInput_Click: function () {
        var that = this;
        var WindowDataInputFormDelete = Ext.create("ManAcc.DataInput.WindowDataInputFormDelete", {
            deleteToolberManuButton: function (id) {
                that.deleteToolberManuButton(id);
            }
        });
        WindowDataInputFormDelete.show();
    },
    btnOpenDataInput_Click: function () {
        var DataInputFormSettings = Ext.create("ManAcc.DataInput.WindowDataInputFormConfigurationOpen", {});
        DataInputFormSettings.show();
    },
    getDataInputMenuItems: function () {

        var that = this;
        var mi = HostApi.DataInputFormGetList();
        var res = [];
        if (mi != null) {
            for (i = 0; i < mi.length; i++) {

                var id = mi[i].Id;
                var titleWindow = mi[i].Name;
                (function (val, titleWindowParam) {
                    res.push(
                        {
                            id: that.btnPrefix + mi[i].Id,
                            text: mi[i].Name,
                            handler: function () {

                                var formTableRecords = Ext.create(config.classFormDataInputView,
                                {
                                    idDataInput: val,
                                    titleWindow: titleWindowParam
                                });
                                formTableRecords.show();
                            }
                        });
                })(id, titleWindow);
            }
        }
        return res;

    },
    addToolbarMenuButton: function (dataInputId, dataInputName) {
        var that = this;
        var btnMain = Ext.getCmp(this.idMenuDataInput);
        var button = {
            id: that.btnPrefix + dataInputId,
            text: dataInputName,
            handler: function () {
                var formTableRecords = Ext.create(config.classFormDataInputView,
                {
                    idDataInput: dataInputId
                });
                formTableRecords.show();
            }
        };
        btnMain.menu.add(button);
    },
    deleteToolberManuButton: function (dataInputId) {
        var btnMain = Ext.getCmp(this.idMenuDataInput);
        var id = this.btnPrefix + dataInputId;
        var button = Ext.getCmp(id);
        btnMain.menu.remove(button);
    }
});

application.moduleClasses.push(config.classFormDataInputMenu);