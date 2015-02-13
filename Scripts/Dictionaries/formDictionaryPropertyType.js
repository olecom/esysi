///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classFormDictionaryPropertyType, {
    windowDictionaryPropertyType: null,
    constructor: function (options) {

        Ext.apply(this, options || {});

        var that = this;

        Ext.create('Ext.data.Store', {
            storeId: 'storePropertyType',
            fields: ['Id', 'Name', 'Code', 'Alias', 'DefaultValue', 'DefaultValueTitle', 'isDictionary', 'idDictionary'],
            data: { 'items': [] },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        this.loadPropertyTypeList();

        var gridPropertyTypes = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('storePropertyType'),
            columns: [
                { dataIndex: 'Id', hidden: true },
                { text: config.ttlFirstName, dataIndex: 'Name', width: 250 },
                { text: config.ttlType, dataIndex: 'Code', width: 100 },
                { text: config.ttlAlias, dataIndex: 'Alias', width: 150 },
                { text: config.ttlDefaultValue, dataIndex: 'DefaultValueTitle', width: 250 },
                { dataIndex: 'DefaultValue', width: 250, hidden: true }
            ],
            width: 415,
            height: 350,
            flex: 1,
            listeners: {
                select: function (dv, record, item, index, e) {

                    gridPropertyTypes.lastSelectedPropertyTypeId = record.data.Id;
                    if (record.raw.isDictionary) {
                        formPropertyType.getForm().setValues([
                                {
                                    id: "Name",
                                    value: record.data.Name
                                }, {
                                    id: "BaseType",
                                    value: "dict"
                                }, {
                                    id: "Dictionary",
                                    value: record.raw.idDictionary
                                }, {
                                    id: "Alias",
                                    value: record.raw.Alias
                                }, {
                                    id: "DefaultValueTitle",
                                    value: record.raw.DefaultValueTitle
                                }
                            ]);
                        formPropertyType.getForm().findField("Dictionary").enable(true);
                    } else {
                        formPropertyType.getForm().setValues([
                                {
                                    id: "Name",
                                    value: record.data.Name
                                }, {
                                    id: "BaseType",
                                    value: record.data.Code
                                }, {
                                    id: "Dictionary",
                                    value: null
                                }, {
                                    id: "Alias",
                                    value: record.data.Alias
                                }, {
                                    id: "DefaultValueTitle",
                                    value: null
                                }
                            ]);
                        formPropertyType.getForm().findField("Dictionary").disable(true);
                    }
                }
            }
        });

        var storePropertyBaseType = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'isDictionary'],
            data: this.getPropertyBaseTypeList()
        });

        var storeDictList = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: this.getDictList()
        });

        var formPropertyType = Ext.create('Ext.form.Panel', {
            frame: false,
            border: false,
            buttonAlign: 'left',
            bodyStyle: 'background:none',
            margin: '0 0 5 0',
            width: 400,
            height: 190, //170
            defaults: {
                width: 300
            },
            items: [{
                layout: 'form',
                xtype: 'textfield',
                fieldLabel: config.ttlPropertyType,
                name: 'Name',
                allowBlank: false,
                hideLabel: false
            }, {
                layout: 'form',
                xtype: 'combobox',
                store: storePropertyBaseType,
                fieldLabel: config.ttlPropertyBaseType,
                hideLabel: false,
                queryMode: 'local',
                displayField: 'Name',
                valueField: 'Name',
                name: 'BaseType',
                listeners: {

                    select: function (combo, records, eOpts) {
                        if (records[0].get("Name") == "dict") {
                            formPropertyType.getForm().findField("Dictionary").enable(true);
                        } else {
                            formPropertyType.getForm().findField("Dictionary").disable(true);
                        }
                    }
                }
            }, {
                layout: 'form',
                xtype: 'combobox',
                store: storeDictList,
                hideEmptyLabel: false,
                fieldLabel: config.ttlDict,
                hideLabel: false,
                queryMode: 'local',
                displayField: 'Name',
                valueField: 'Id',
                name: 'Dictionary'
            }, {
                layout: 'form',
                xtype: 'textfield',
                fieldLabel: config.ttlAlias,
                name: 'Alias',
                allowBlank: false,
                hideLabel: false
            }, {
                layout: 'form',
                xtype: 'textfield',
                fieldLabel: config.ttlDefaultValue,
                name: 'DefaultValueTitle',
                allowBlank: false,
                hideLabel: false,
                listeners: {
                    afterrender: function (field) {
                        field.getEl().on('dblclick', function (event, el) {
                            var val = gridPropertyTypes.getSelectionModel().getSelection()[0].get("DefaultValue");
                            var isDict = gridPropertyTypes.getSelectionModel().getSelection()[0].get("isDictionary");
                            var type = gridPropertyTypes.getSelectionModel().getSelection()[0].get("idDictionary");
                            var IdPropertyType = gridPropertyTypes.getSelectionModel().getSelection()[0].get("Id");
                            if (isDict) {
                                var choose = Ext.create(config.classFormPropertyValue, {
                                    value: val,
                                    type: type,
                                    checkbox: false,
                                    methodOnSave: function (value, title) {
                                        that.updatePropertyTypeDefaultValue(IdPropertyType, value);

                                        var store = gridPropertyTypes.getStore();
                                        var ind = store.find('Id', IdPropertyType);
                                        var rec = store.getAt(ind)
                                        rec.set("DefaultValue", value);
                                        rec.set("DefaultValueTitle", title);

                                        formPropertyType.getForm().findField("DefaultValueTitle").setValue(title);
                                    }
                                });
                            }
                        });
                    }
                }
            }],
            buttons: [{
                text: config.ttlSaveChanges,
                handler: function () {
                    var propType = formPropertyType.getForm().getValues();
                    propType.Id = gridPropertyTypes.lastSelectedPropertyTypeId;
                    HostApi.PropertyTypeEditByObj(propType);
                    that.loadPropertyTypeList();
                }
            }, {
                text: config.ttlSaveAsNew,
                handler: function () {
                    var user = formPropertyType.getForm().getValues();
                    HostApi.PropertyTypeCreateByObj(user);
                    that.loadPropertyTypeList();

                }
            }, {
                text: config.ttlDelete,
                handler: function () {
                    HostApi.PropertyTypeDelete(gridPropertyTypes.lastSelectedPropertyTypeId);
                    that.loadPropertyTypeList();
                }
            }]
        });

        this.windowDictionaryPropertyType = Ext.create('Ext.window.Window', {
            id: 'windowPropertyTypes',
            title: config.ttlPropertyType,
            bodyPadding: 10,
            maximizable: true,
            maximized: true,
            renderTo: application.pnlSpace.getEl().dom,
            constrain: true,
            resizable: true,
            height: 600,
            width: 800,
            margin: 0,
            padding: 0,
            autoScroll: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                formPropertyType,
                gridPropertyTypes
            ],
            buttons: [{
                text: config.ttlClose,
                handler: function () {
                    that.windowDictionaryPropertyType.close();
                }
            }]
        });
    },
    loadPropertyTypeList: function () {
        Ext.data.StoreManager.lookup('storePropertyType').loadRawData({ 'items': HostApi.PropertyTypeGetList() });
    },
    getPropertyBaseTypeList: function () {
        return HostApi.PropertyTypeBaseGetList();
    },
    getDictList: function () {
        return HostApi.DictionaryGetList();
    },
    updatePropertyTypeDefaultValue: function (IdPropertyType, Value) {
        return HostApi.PropertyTypeDefaultValueSet(IdPropertyType, Value);
    },
    show: function () {
        this.windowDictionaryPropertyType.show();
    }
});
