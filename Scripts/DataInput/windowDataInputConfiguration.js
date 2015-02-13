///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogDataInputConfiguration, {
    extend: 'Ext.ux.Wizard',
    titlePrefix: config.ttlReportConfiguration,
    includeSubTitle: true,

    onDataInputCreated: null,

    storeFormClasses: null,
    storeRequiredFields: null,
    storeRestrictionRules: null,

    uiComponents: {
        step1: {
            inputDataFormName: null,
            gridFormClasses: null
        },
        step2: {
            gridRequiredFields: null,
            btnRowStepUp: null,
            btnRowStepDown: null
        }
    },

    configuration: {
        idDataInputForm: null,
        Name: null
    },

    isOpenMode: function () {
        return (this.configuration.idDataInputForm != null);
    },

    constructor: function (options) {

        var that = this;

        this.items = [];
        Ext.apply(this, options || {});

        this.configDataInputForm_Classes_Step1();
        this.configDataInputForm_RequiredFields_Step2();
        this.callParent(arguments);
    },
    configDataInputForm_Classes_Step1: function () {
        var that = this;
        var storeClasses = this.createStoreClasses();
        this.uiComponents.step1.inputDataFormName = Ext.create('Ext.form.field.Text', {
            fieldLabel: config.ttlDataFormName,
            name: 'DataFormName',
            allowBlank: false,
            value: that.configuration.Name
        });
        this.uiComponents.step1.gridFormClasses = Ext.create('Ext.grid.Panel', {
            width: 300,
            height: 450,
            store: storeClasses,
            columns: [
                { text: 'Id', dataIndex: 'Id', hidden: true },
                {
                    text: 'isContained',
                    dataIndex: 'isContained',
                    width: 70,
                    xtype: 'checkcolumn',
                    listeners: {
                        checkchange: function (column, recordIndex, checked) {
                            if (that.isOpenMode()) {
                                HostApi.DataInputFormSetClass(that.configuration.idDataInputForm, storeClasses.data.getAt(recordIndex).data.Id, checked);

                            }
                        }
                    }
                },
                { text: config.ttlClass, dataIndex: 'ClassName', flex: 1, width: 150 }
            ]
        });


        this.items.push({
            height: 300,
            width: 500,
            xtype: 'panel',
            title: config.ttlReportName,
            items: [
                this.uiComponents.step1.inputDataFormName,
                this.uiComponents.step1.gridFormClasses
            ],
            buttons: [],
            onNextStep: function () {

                if (!that.isOpenMode()) {
                    var resp = that.saveDataInputForm();
                    if (that.onDataInputCreated != null) {
                        that.onDataInputCreated(resp.id, resp.name);
                        that.configuration.idDataInputForm = resp.id;
                        that.uiComponents.step1.gridFormClasses.disable();
                        that.uiComponents.step1.inputDataFormName.disable();

                    }
                    that.refreshStoreFields(resp.id);
                }
                else {
                    that.refreshStoreFields();
                }
            }
        });
    },
    configDataInputForm_RequiredFields_Step2: function () {

        var that = this;
        var store = this.createStoreFields();

        this.uiComponents.step2.gridRequiredFields = Ext.create('Ext.grid.Panel', {
            width: 300,
            height: 450,
            store: store,
            columns: [
                { text: 'Id', dataIndex: 'Id', hidden: true },
                { text: 'Order', dataIndex: 'Order', hidden: true },
                {
                    text: 'isRequired',
                    dataIndex: 'isRequired',
                    width: 70,
                    xtype: 'checkcolumn',
                    listeners: {
                        checkchange: function (column, recordIndex, checked) {

                        }
                    }
                },
                { text: config.ttlClass, dataIndex: 'FieldName', flex: 1, width: 150 }
            ]
        });


        this.uiComponents.step2.btnRowStepUp = Ext.create('Ext.button.Button', {
            text: "Поднять строку",
            handler: function () {
                var id = that.uiComponents.step2.gridRequiredFields.getSelectionModel().getSelection()[0].get("Id");
                var order = that.uiComponents.step2.gridRequiredFields.getSelectionModel().getSelection()[0].get("Order");
                order++;
                that.storeRequiredFields.data.each(function (item, index, totalItems) {
                    if (item.data.Id == id) {
                        item.data.Order = order;
                    }
                });

                that.storeRequiredFields.data.each(function (item, index, totalItems) {
                    if ((item.data.Id != id) && (item.data.Order == order)) {
                        item.data.Order--;
                    }
                });

                that.storeRequiredFields.sort([{
                    property: 'Order',
                    direction: 'DESC'
                }]);

            }
        });

        this.uiComponents.step2.btnRowStepDown = Ext.create('Ext.button.Button', {
            text: "Опустить строку",
            handler: function () {
                var id = that.uiComponents.step2.gridRequiredFields.getSelectionModel().getSelection()[0].get("Id");
                var order = that.uiComponents.step2.gridRequiredFields.getSelectionModel().getSelection()[0].get("Order");
                order--;
                if (order == -1) order = 0;

                that.storeRequiredFields.data.each(function (item, index, totalItems) {
                    if (item.data.Id == id) {
                        item.data.Order = order;
                    }
                });

                that.storeRequiredFields.data.each(function (item, index, totalItems) {
                    if ((item.data.Id != id) && (item.data.Order == order)) {
                        item.data.Order++;
                    }
                });


                that.storeRequiredFields.sort([{
                    property: 'Order',
                    direction: 'DESC'
                }]);
            }
        });


        this.items.push({
            height: 300,
            width: 500,
            xtype: 'panel',
            finishable: true,
            title: config.ttlReportName,
            items: [
                this.uiComponents.step2.gridRequiredFields
            ],
            buttons: [
                this.uiComponents.step2.btnRowStepUp,
                this.uiComponents.step2.btnRowStepDown
            ],
            onFinish: function () {

                var store = that.storeRequiredFields;
                var ids = "";
                var orderfilling = "";
                for (var i = 0; i < store.data.items.length; i++) {
                    orderfilling += store.data.items[i].data.Id + ';';
                    if (store.data.items[i].data.isRequired)
                        ids += store.data.items[i].data.Id + ';';

                }
                HostApi.RequiredFieldsOfDataInputFormSet(that.configuration.idDataInputForm, ids, orderfilling);

            }
        });

    },
    saveDataInputForm: function () {
        var that = this;
        var arIds = new Array();
        var store = this.uiComponents.step1.gridFormClasses.getStore();
        for (var i = 0; i < store.data.items.length; i++) {
            if (store.data.items[i].data.isContained)
                arIds.push(store.data.items[i].data.Id);
        }

        var name = this.uiComponents.step1.inputDataFormName.getValue();
        var dif = HostApi.DataInputFormCreate(name, $.toJSON(arIds));
       

        return dif;
    },

    createStoreClasses: function () {
        this.storeFormClasses = Ext.create('Ext.data.Store', {
            fields: ['Id', 'isContained', 'ClassName'],
            autoLoad: true,
            data: { 'items': [] },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });
        var items = HostApi.ClassOfDataInputFormGetList2(this.configuration.idDataInputForm);

        this.storeFormClasses.loadRawData({ 'items': items });
        return this.storeFormClasses;
    },
    createStoreFields: function () {
        this.storeRequiredFields = Ext.create('Ext.data.Store', {
            fields: ['Id', 'isRequired', 'FieldName', 'Order'],
            autoLoad: true,
            data: { 'items': [] },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        return this.storeRequiredFields;
    },
    refreshStoreFields: function () {
        var items = HostApi.RequiredFieldsOfDataInputFormGetList(this.configuration.idDataInputForm);

        this.storeRequiredFields.loadRawData({ 'items': items });

        this.storeRequiredFields.sort([{
            property: 'Order',
            direction: 'DESC'
        }]);
    }
});