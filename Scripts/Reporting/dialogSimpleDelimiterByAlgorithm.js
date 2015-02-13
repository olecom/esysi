///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogSimpleDelimiterByAlgorithm, {
    extend: 'Ext.window.Window',
    title: 'По алгоритму',
    modal: true,

    onSelect: null,
    items: null,
    buttons: null,

    storeAlgorithm: null,

    txtBlockName: null,
    comboAlgorithm: null,

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

        this.txtBlockName = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Имя блока',
            name: 'fieldValue',
            allowBlank: false
        });

        this.storeAlgorithm = Ext.create('Ext.data.Store', {
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

        this.storeAlgorithm.loadRawData({ 'items': HostApi.ReportBlockAlgorithmGetList() });

        this.comboAlgorithm = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Алгоритм',
            hideLabel: false,
            store: this.storeAlgorithm,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id'
        });


        this.items = [
            this.txtBlockName,
            this.comboAlgorithm
        ];
        this.callParent(arguments);
    },

    createSimpleDelimiter: function () {
        var that = this;

        that.configuration.Title = that.txtBlockName.getValue();
        that.configuration.DivideType = 'algorithm';
        that.configuration.AlgorithmCalculationId = that.comboAlgorithm.getValue();

        HostApi.ReportCrossBlockSetByObj(that.configuration);

        this.close();
        this.onSuccess(response.Data);
        
    }
});