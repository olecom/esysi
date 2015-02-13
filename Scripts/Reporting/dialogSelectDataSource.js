///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogSelectDataSource, {

    extend: 'Ext.window.Window',
    modal: true,
    onSelect: null,
    items: null,
    buttons: null,

    ReportConfigurationId: null,
    firstDataSource: null,

    storeDataSources: null,
    storeJoinType: null,
    storeFieldMain: null,
    storeFieldConnecting: null,

    comboBoxDataSources: null,
    comboBoxJoinType: null,
    comboFieldMain: null,
    comboFieldConnecting: null,
    txtOrder: null,

    title: config.ttlDataSource,

    constructor: function (options) {
        var that = this;

        this.items = new Array();
        this.buttons = new Array();

        Ext.apply(this, options || {});

        this.buttons.push({
            text: config.ttlChoose,
            handler: function () {
                that.onSelect(
                /*joinType*/that.comboBoxJoinType.getValue(),
                /*fieldMain*/that.comboFieldMain.getValue(),
                /*fieldConnecting*/that.comboFieldConnecting.getValue(),
                /*dataInputFormId*/that.comboBoxDataSources.getValue(),
                /*order*/that.txtOrder.getValue()
                );
                that.close();
            }
        });

        this.storeDataSources = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
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

        this.storeDataSources.loadRawData({
            'items': HostApi.DataInputFormGetList()
        });

        this.comboBoxDataSources = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: config.ttlInputForm,
            name: 'DataSources',
            hideLabel: false,
            store: this.storeDataSources,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            listeners: {
                select: function (combo, records, eOpt) {

                    var difId = records[0].data.Id;

                    var items = HostApi.DataInputFormColumnGetList(difId);


                    that.storeFieldConnecting.loadRawData({ 'items': items });



                }
            }
        });

        this.storeJoinType = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: { 'items': [
                { Id: 1, Name: "Left Inner Join" },
                { Id: 2, Name: "Right Inner Join" },
                { Id: 3, Name: "Outer Join" },
                { Id: 4, Name: "Cross Join" }
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

        this.comboBoxJoinType = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: config.ttlJoinType,
            hideLabel: false,
            store: this.storeJoinType,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Name',
            editable: false,
            disabled: this.firstDataSource
        });

        this.storeFieldMain = Ext.create('Ext.data.Store', {
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

        if (!this.firstDataSource) this.storeFieldMain.loadRawData({
            'items': HostApi.ReportConfigurationDataSourceGetList(this.ReportConfigurationId)
        });

        this.comboFieldMain = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: config.ttlSourceField,
            hideLabel: false,
            store: this.storeFieldMain,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            disabled: this.firstDataSource
        });

        this.storeFieldConnecting = Ext.create('Ext.data.Store', {
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

        this.comboFieldConnecting = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: config.ttlJoinTableField,
            hideLabel: false,
            store: this.storeFieldConnecting,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            disabled: this.firstDataSource
        });

        this.txtOrder = Ext.create('Ext.form.field.Text', {
            fieldLabel: config.ttlJoinOrder,
            allowBlank: false,
            value: '0'
        })


        this.items.push(
            this.comboBoxDataSources,
            this.comboBoxJoinType,
            this.comboFieldMain,
            this.comboFieldConnecting,
            this.txtOrder
        );

        this.callParent(arguments);
    } 
});