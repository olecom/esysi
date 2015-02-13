///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogSelectClassForSimpleAddReportDelimiter, {

    extend: 'Ext.window.Window',
    title: 'Какой типичный блок добавить?',
    modal: true,

    onSelect: null,
    items: null,
    buttons: null,
    comboFormClass: null,

    constructor: function (options) {
        var that = this;

        Ext.apply(this, options || {});

        
        this.buttons = [{
            xtype: 'button',
            text: 'Ok',
            handler: function () {
                that.onSelect(that.comboFormClass.getValue());
            }
        }];
        
        var storeClass = Ext.create('Ext.data.Store', {
            fields: ['Class', 'Title'],
            data: { 'items': [
                { Class: config.classDialogSimpleDelimiterByDictionary, Title: 'Разделение по справочнику' },
                { Class: config.classDialogSimpleDelimiterByDate, Title: 'Разделение по датам' },
                { Class: config.classDialogSimpleDelimiterByAlgorithm, Title: 'Блок по алгоритму' },
                { Class: config.classDialogSimpleDelimiterEmpty, Title: 'Сумма дочерних' },
                { Class: config.classDialogSimpleDelimiterByClass, Title: 'Разделение по классам' }
            ]},
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });



        this.comboFormClass = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Тип блока',
            hideLabel: false,
            store: storeClass,
            queryMode: 'local',
            displayField: 'Title',
            valueField: 'Class'
        });

        this.items = [this.comboFormClass];

        this.callParent(arguments);

    }
});