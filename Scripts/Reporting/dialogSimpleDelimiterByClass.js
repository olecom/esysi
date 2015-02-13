///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />
///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\HostApi.js" />

Ext.define(config.classDialogSimpleDelimiterByClass, {
    extend: 'Ext.window.Window',
    title: 'По классу',
    modal: true,

    onSelect: null,
    items: null,
    buttons: null,

    storeClasses: null,
    storeSumAliases: null,

    txtBlockName: null,
    pnlChosenValues: null,
    comboSumAlias: null,

    configuration: {
        Type: null,
        ParentId: null,
        ReportConfigurationId: null,
        Title: null
    },

    constructor: function (options) {
        var that = this;

        Ext.apply(this, options || {});

        this.buttons = [{
            xtype: 'button',
            text: 'Ok',
            handler: function () {
                that.createSimpleDelimiter();
            }
        }];

        this.storeClasses = Ext.create('Ext.data.Store', {
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


        this.txtBlockName = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Имя блока',
            allowBlank: false,
            editable: false
        });

        this.reloadstoreClasses();



        this.pnlChosenValues = Ext.create(config.classFormChooseRecordClass, {
            name: 'fieldValue',
            title: config.ttlValue,
            allowBlank: false,
            value: null
        });

        this.storeSumAliases = Ext.create('Ext.data.Store', {
            fields: ['Alias', 'Name'],
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
        this.reloadStoreSumAliases();
        this.comboSumAlias = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Поле для суммы',
            hideLabel: false,
            store: this.storeSumAliases,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Alias'
        });


        this.items = [
            this.txtBlockName,
            this.pnlChosenValues,
            this.comboSumAlias
        ];
        this.callParent(arguments);
    },
    reloadstoreClasses: function () {
        var items = HostApi.Dictionaries_DictionaryGetList();
        this.storeClasses.loadRawData({ 'items': items });
    },
    reloadStoreSumAliases: function () {
 
        var items = HostApi.ReportConfigurationAliasesGetList(this.configuration.ReportConfigurationId, 'number');
        this.storeSumAliases.loadRawData({ 'items': items });

    },
    createSimpleDelimiter: function () {
       
        var id = HostApi.ReportCrossBlockSetByClass(
            this.configuration.ReportConfigurationId,
            null,
            this.configuration.ParentId,
            this.configuration.Type,
            this.txtBlockName.getValue(),
            this.pnlChosenValues.getValue(),
            this.comboSumAlias.getValue());

        this.close();

        this.onSuccess(id);
    }

});