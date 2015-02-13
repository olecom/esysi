///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogDataInputRestrictionRule, {

    window: null,
    idRestrictionRule: null,
    idDataInput: null,
    onClose: null,

    storePropertyType: null,

    uiComponents: {
        comboSelectionPropertyType: null,
        txtSelectionValue: null,
        comboRestrictionPropertyType: null,
        txtRestrictionValue: null
    },

    selectionValue: null,
    restrictionValue: null,

    selectionValueTitle: null,
    restrictionValueTitle: null,

    selectionPropertyTypeId: null,
    restrictionPropertyTypeId: null,   

    constructor: function (options) {

        Ext.apply(this, options || {});
        var that = this;

        this.createStorePropertyType();
        this.refreshStorePropertyType();


        this.uiComponents.comboSelectionPropertyType = Ext.create('Ext.form.field.ComboBox', {
            name: "SelectionPropertyType",
            hideLabel: false,
            store: this.storePropertyType,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            fieldLabel: "Свойство",
            value: that.selectionPropertyTypeId
        });


        this.uiComponents.txtSelectionValue = Ext.create('Ext.form.field.Text', {
            name: 'SelectionValueTitle',
            fieldLabel: "Выбранные значения",
            allowBlank: false,
            value: that.selectionValueTitle
        })


        this.uiComponents.comboRestrictionPropertyType = Ext.create('Ext.form.field.ComboBox', {
            name: "RestrictionPropertyType",
            hideLabel: false,
            store: this.storePropertyType,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            fieldLabel: "Свойство",
            value: that.restrictionPropertyTypeId
        });


        this.uiComponents.txtRestrictionValue = Ext.create('Ext.form.field.Text', {
            name: 'RestrictionValueTitle',
            fieldLabel: "Подходящее множество",
            allowBlank: false,
            value: that.restrictionValueTitle
        })


        this.window = Ext.create('Ext.window.Window', {
            title: "Ограничение",
            height: 500,
            width: 530,
            bodyPadding: 0,
            resizable: true,
            margin: 0,
            padding: 0,
            autoScroll: false,
            maximizable: true,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [
                this.uiComponents.comboSelectionPropertyType,
                this.uiComponents.txtSelectionValue,
                this.uiComponents.comboRestrictionPropertyType,
                this.uiComponents.txtRestrictionValue
            ],
            buttons: [{
                text: "Задать ограничение",
                handler: function () {
                    var id = that.uiComponents.comboRestrictionPropertyType.getValue();
                    var dictid = 0;
                    that.storePropertyType.data.each(function (item, index, totalItems) {
                        if (item.data.Id == id) dictid = item.data.DictId;
                    });
                    var choose = Ext.create(config.classFormPropertyValue, {
                        value: that.restrictionValue,
                        type: dictid,
                        checkbox: true,
                        methodOnSave: function (value, title) {
                            that.uiComponents.txtRestrictionValue.setValue(title);
                            that.restrictionValue = value;
                        }
                    });
                }
            }, {
                text: "Задать значение",
                handler: function () {
                    var id = that.uiComponents.comboSelectionPropertyType.getValue();
                    var dictid = 0;
                    that.storePropertyType.data.each(function (item, index, totalItems) {
                        if (item.data.Id == id) dictid = item.data.DictId;
                    });
                    var choose = Ext.create(config.classFormPropertyValue, {
                        value: that.selectionValue,
                        type: dictid,
                        checkbox: true,
                        methodOnSave: function (value, title) {
                            that.uiComponents.txtSelectionValue.setValue(title);
                            that.selectionValue = value;
                        }
                    });

                }
            }, {
                text: config.ttlClose,
                handler: function () {
                 

                    response = jQuery.parseJSON(response);

                    if (response.Success) {
                        that.window.close();
                        that.onClose();
                    }
                }
            }]
        });
    },
    createStorePropertyType: function () {


        this.storePropertyType = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'DictId'],
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


    },
    refreshStorePropertyType: function () {

   

        this.storePropertyType.loadRawData({ 'items': response.Data });

    },
    getValues: function () {
        var value = {
            DataInputForm: this.idDataInput,
            RestrictionRuleId: this.idRestrictionRule,
            RestrictionPropertyTypeId: this.uiComponents.comboRestrictionPropertyType.getValue(),
            SelectionPropertyTypeId: this.uiComponents.comboSelectionPropertyType.getValue(),
            RestrictionValue: this.restrictionValue,
            SelectionValue: this.selectionValue
        };

        return value;
    },
    show: function () {
        this.window.show();
    }

});
