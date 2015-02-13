///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogFlatReportRow, {
    extend: 'Ext.window.Window',
    title: config.ttlAddRow,
    modal: true,
    items: null,
    buttons: null,

    onSave: null,
    height: 400,
    width: 500,

    ReportConfigurationId: null,
    //выражения для ячеек
    gridCellExpression: null,

    uiComponents: {
        //выбор добавить вверх или вниз
        comboPosiotionToAddRow: null,
        //заголовк столбца
        txtRowHeader: null,
        //порядок блок
        txtRowOrder: null,
        //алиас строки
        txtAlias: null
    },

    configuration: {
        Alias: null,
        Expression: null,
        Id: null,
        Name: null,
        Order: null,
        ReportBlockType: null
    },

    cellParametersObj: null,
    storePosiotionToAddRow: null,
    storeColumnsCellsExpression: null,

    constructor: function (options) {

        var that = this;

        Ext.apply(this, options || {});


        this.cellParametersObj = new Object();

        this.storeColumnsCellsExpression = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Alias', 'Expression', 'ColumnName'],
            data: { 'items': [] },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });
        this.gridCellExpression = Ext.create('Ext.grid.Panel', {
            title: config.ttlColumnExpression,
            store: this.storeColumnsCellsExpression,
            columns: [
				{ dataIndex: 'Id', hidden: true },
                { text: config.ttlColumnName, dataIndex: 'ColumnName', width: 100 },
				{ text: config.ttlColumnAlias, dataIndex: 'Alias', width: 100 },
				{ text: config.ttlExpression, dataIndex: 'Expression', flex: 1 }
			],
            height: 150,
            width: 500,
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {



                    var par = HostApi.ReportParameterGet(record.data.Id);
                    if (par == null) par = { Name: record.data.Alias };
                    $.extend(par, { reportConfigurationId: that.ReportConfigurationId });


                    var s = Ext.create(config.classDialogReportParameter, {
                        configuration: par,
                        onSave: function (configuration) {
                            record.set("Expression", configuration.ArithmeticExpression);
                            if (record.data.Id == 0) {
                                that.cellParametersObj[record.data.Alias] = configuration;
                            } else {
                                HostApi.ReportParameterSaveByObj(configuration);
                            }
                        }
                    });
                    s.show();
                }
            }
        });

        this.refreshStoreColumnsCellsExpression();

        this.storePosiotionToAddRow = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: { 'items': [
                { Id: "before", Name: config.ttlBeforeReport },
                { Id: "after", Name: config.ttlAfterReport }
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


        this.uiComponents.comboPosiotionToAddRow =
            Ext.create('Ext.form.field.ComboBox', {
                name: 'PosiotionToAddRow',
                fieldLabel: config.ttlPosiotionToAddRow,
                hideLabel: false,
                store: this.storePosiotionToAddRow,
                queryMode: 'local',
                displayField: 'Name',
                valueField: 'Id',
                editable: false,
                value: this.configuration.ReportBlockType
            });

        this.uiComponents.txtRowHeader =
		    Ext.create('Ext.form.field.Text', {
		        name: 'HeaderText',
		        fieldLabel: config.ttlHeaderText,
		        allowBlank: false,
		        value: this.configuration.Name
		    });

        this.uiComponents.txtAlias =
		    Ext.create('Ext.form.field.Text', {
		        name: 'Alias',
		        fieldLabel: config.ttlAlias,
		        allowBlank: false,
		        value: this.configuration.Alias
		    });

        this.uiComponents.txtRowOrder =
        	Ext.create('Ext.form.field.Text', {
        	    name: 'Order',
        	    fieldLabel: config.ttlOrder,
        	    allowBlank: false,
        	    value: this.configuration.Order
        	});


        this.items = [
            this.uiComponents.txtRowHeader,
            this.gridCellExpression,
            this.uiComponents.comboPosiotionToAddRow,
            this.uiComponents.txtAlias,
            this.uiComponents.txtRowOrder
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
        value.CellExpressionsObj = this.cellParametersObj;
        return value;
    },

    refreshStoreColumnsCellsExpression: function () {

        
        var data = { ReportConfigurationId: this.ReportConfigurationId, reportBlockFlatRowId: this.configuration.Id };
        var items = HostApi.CellsExpressionForFlatRowBlockGetListByObj(data); 
        this.storeColumnsCellsExpression.loadRawData({ 'items': items });


    }
});