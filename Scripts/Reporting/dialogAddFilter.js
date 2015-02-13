///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogAddFilter, {
    extend: 'Ext.window.Window',
    title: config.ttlReportConfiguration,
    includeSubTitle: true,
    storeReportGroup: null,
    storeDataSources: null,
    modal: true,
    items: null,
    buttons: null,
    onSave: null,

    uiComponents: {
        txtFilterName: null,
        comboFilterType: null,
        txtParameterName: null,
        comboDict: null
    },

    constructor: function (options) {

        var that = this;


        Ext.apply(this, options || {});

        this.uiComponents.txtFilterName = Ext.create('Ext.form.field.Text', {
            name: 'FilterName',
            fieldLabel: config.ttlFilterName,
            allowBlank: false
        });

        this.storeFilterTypes = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: { 'items': [
                { Id: 'date', Name: config.ttlDate },
                { Id: 'boolean', Name: config.ttlBoolean },
                { Id: 'dict', Name: config.ttlDictionariesOnlyChecked },
                { Id: 'number', Name: config.ttlNumber },
                { Id: 'str', Name: config.ttlString }
            ]
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        this.uiComponents.comboFilterType = Ext.create('Ext.form.field.ComboBox', {
            name: 'FilterType',
            fieldLabel: config.ttlFilterType,
            hideLabel: false,
            store: this.storeFilterTypes,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            listeners: {
                select: function (combo, records, eOpts) {
                    if (records[0].data.Id.indexOf('dict') == 0) {
                        that.uiComponents.comboDict.setVisible(true);
                    }
                    else {
                        that.uiComponents.comboDict.setVisible(false);
                    }
                }
            }
        });


        this.uiComponents.txtParameterName = Ext.create('Ext.form.field.Text', {
            name: 'ParameterName',
            fieldLabel: config.ttlParameterName,
            allowBlank: false
        });

        this.storeDictionaries = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
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



        this.storeDictionaries.loadRawData({ 'items': HostApi.DictionaryGetList() });

        this.uiComponents.comboDict = Ext.create('Ext.form.field.ComboBox', {
            name: 'Dictionary',
            fieldLabel: config.ttlDictionaries,
            hideLabel: false,
            store: this.storeDictionaries,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            hidden: true
        });

        this.items = [
            this.uiComponents.txtFilterName,
            this.uiComponents.comboFilterType,
            this.uiComponents.txtParameterName,
            this.uiComponents.comboDict
        ];

        this.buttons = [{
            xtype: 'button',
            text: config.ttlOk,
            handler: function () {
                that.onSave(that.getValues());
                that.close();
            }
        }];

        this.callParent(arguments);
    },

    getValues: function () {
        var value = new Object();
        for (var key in this.uiComponents) {
            var cmp = this.uiComponents[key];
            value[cmp.name] = cmp.getValue();
        };
        return value;
    }
});