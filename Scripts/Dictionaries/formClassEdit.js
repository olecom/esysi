///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classFormClassEdit, {

    storeClasses: null,
    storeClassProperties: null,
    windowClassEdit: null,
    comboPropertyType: null,
    gridClasses: null,
    gridClassProperties: null,
    currentClassId: null,

    constructor: function (options) {

        var that = this;

        Ext.apply(this, options || {});


        this.storeClasses = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: { 'items': [] },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });


        this.gridClasses = Ext.create('Ext.grid.Panel', {
            store: this.storeClasses,
            columns: [
                { text: 'Id', dataIndex: 'Id', hidden: true },
                { text: config.ttlClass, dataIndex: 'Name', flex: 1 }
            ],
            height: 400,
            width: 410,
            listeners: {

                select: function (grid, record, index, eOpts) {
                    that.currentClassId = record.data.Id;
                    that.refreshStoreClassProperties();
                },
                itemdblclick: function (grid, record, item, index, e, eOpts) {
                    Ext.MessageBox.prompt(config.ttlCreateClass, config.ttlClassName,
                        function (btn, text) {
                            if (btn == "ok") {
                                if (that.renameClass(text))
                                    that.refreshStoreClasses();
                            }
                        }
                    );
                    var value = record.data.Value;
                }
            }
        });



        this.storeClassProperties = Ext.create('Ext.data.Store', {
            fields: ['TypeId', 'TypeName'],
            data: { 'items': []
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        this.gridClassProperties = Ext.create('Ext.grid.Panel', {
            store: this.storeClassProperties,
            columns: [
                { text: 'Id', dataIndex: 'TypeId', hidden: true },
                { text: config.ttlPropertyName, dataIndex: 'TypeName', flex: 1 }
            ],
            height: 400,
            width: 410
        });



        that.storeRecordClass = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: [],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        that.comboRecordClass = Ext.create('Ext.form.ComboBox', {
            store: that.storeRecordClass,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id'
        });


        var storePropertyType = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: HostApi.PropertyTypeGetList()
        });


        that.comboPropertyType = Ext.create('Ext.form.ComboBox', {
            store: storePropertyType,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id'
        });

        this.windowClassEdit = Ext.create('Ext.window.Window', {

            title: config.ttlProperties,
            height: 500,
            width: 870,
            bodyPadding: 10,
            resizable: false,
            modal: true,
            margin: 0,
            padding: 0,
            autoScroll: true,
            layout: 'column',
            items: [
                {
                    xtype: 'panel',
                    items: [
                        that.gridClasses,
                        {
                            xtype: 'panel',
                            layout: 'column',
                            items: [
                                {
                                    xtype: 'button',
                                    text: config.ttlAddClass,
                                    handler: function () {
                                        Ext.MessageBox.prompt(config.ttlCreateClass, config.ttlClassName,
                                            function (btn, text) {
                                                if (btn == "ok") {
                                                    if (that.createClass(text))
                                                        that.refreshStoreClasses();

                                                }
                                            }
                                        );
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: config.ttlDelete,
                                    handler: function () {
                                        var id = that.gridClasses.getSelectionModel().getSelection()[0].get("Id");
                                        if (that.deleteClass(id))
                                            that.refreshStoreClasses();
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    margin: '0 0 0 5',
                    items: [
                        that.gridClassProperties,
                        {
                            xtype: 'panel',
                            layout: 'column',
                            items: [
                                that.comboPropertyType,
                                {
                                    xtype: 'button',
                                    text: config.ttlAddProperty,
                                    handler: function () {
                                        var IdTypeProperty = that.comboPropertyType.getValue();
                                        that.propertyTypeAddToClass(IdTypeProperty);
                                        that.refreshStoreClassProperties();

                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: config.ttlDelete,
                                    handler: function () {

                                        var IdTypeProperty = that.gridClassProperties.getSelectionModel().getSelection()[0].get("TypeId");
                                        that.propertyTypeRemoveFromClass(IdTypeProperty);
                                        that.refreshStoreClassProperties();
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        this.windowClassEdit.show();
        this.refreshStoreClasses();
    },
    addProperty: function (IdRecord, IdPropertyType, Value) {
        HostApi.PropertyCreateByObj({ IdRecord: IdRecord, IdPropertyType: IdPropertyType, Value: Value });

        this.refreshPointProperties(IdRecord);
    },
    refreshStoreClasses: function () {

        this.storeClasses.loadRawData({ 'items': HostApi.ClassGetList() });
    },
    refreshStoreClassProperties: function () {


        this.storeClassProperties.loadRawData({ 'items': HostApi.PropertyGetListByClass(this.currentClassId) });
    },
    createClass: function (name) {
        HostApi.ClassCreate(name);
        return true;

    },
    deleteClass: function (id) {
        HostApi.ClassDelete(id);

        return true;

    },
    propertyTypeAddToClass: function (IdPropertyType) {
        HostApi.PropertyTypeAddToClass(this.currentClassId, IdPropertyType);
        return true;
    },
    propertyTypeRemoveFromClass: function (IdPropertyType) {
        HostApi.PropertyTypeRemoveFromClass(this.currentClassId, IdPropertyType);
        return true;
    },
    renameClass: function (ClassName) {
        HostApi.ClassRename(this.currentClassId, ClassName);
        return true;

    }
});

