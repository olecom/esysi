///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogFlatReportColumn, {
    extend: 'Ext.window.Window',
    title: config.ttlReportColumn,
    modal: true,
    layout: 'column',

    items: null,
    buttons: null,
    height: 310,
    width: 500,
    onSave: null,
    idReportParameter: null,
    storeAliases: null,

    //табличка доступныхз алиасов
    gridAliases: null,
    //панель
    panelColumnConfigFields: null,

    storeSorting: null,

    uiComponents: {
        //выражение
        txtExpression: null,
        //заголовк столбца
        txtColumnHeader: null,
        //порядок блок
        txtColumnOrder: null,
        //Выражение для позднего расчета
        txtPostCountExpression: null,

        cmbSorting: null

    },

    ReportConfigurationId: null,

    configuration: {
        Id: null,
        Expression: null,
        Name: null,
        Alias: null,
        Order: null,
        PostCountExpression: null
    },

    constructor: function (options) {

        var that = this;

        Ext.apply(this, options || {});

        this.storeAliases = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: {
                'items': []
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        this.refreshStoreParamNames();

        this.gridAliases = Ext.create('Ext.grid.Panel', {
            border: 0,
            store: this.storeAliases,
            columns: [
                    { text: 'Id', dataIndex: 'Id', hidden: true },
                    { text: config.ttlParameterName, dataIndex: 'Name' }
            ],
            height: 300,
            width: 100,
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {
                    var selectedId = record.data.Id;
                }
            }
        });

        this.uiComponents.txtColumnHeader =
		    Ext.create('Ext.form.field.Text', {
		        name: 'HeaderText',
		        fieldLabel: config.ttlName,
		        allowBlank: false,
		        value: this.configuration.Name
		    });

        this.uiComponents.txtExpression =
		    Ext.create('Ext.form.field.Text', {
		        name: 'Expression',
		        fieldLabel: config.ttlColumnExpression,
		        allowBlank: false,
		        value: this.configuration.Expression
		    });

        this.uiComponents.txtAlias =
        	Ext.create('Ext.form.field.Text', {
        	    name: 'Alias',
        	    fieldLabel: config.ttlAlias,
        	    allowBlank: false,
        	    value: this.configuration.Alias
        	});

        this.uiComponents.txtColumnOrder =
        	Ext.create('Ext.form.field.Text', {
        	    name: 'Order',
        	    fieldLabel: config.ttlOrder,
        	    allowBlank: false,
        	    value: this.configuration.Order
        	});


        this.uiComponents.txtPostCountExpression =
            Ext.create('Ext.form.field.Text', {
                name: 'PostCountExpression',
                fieldLabel: config.ttlPostCountExpression,
                allowBlank: false,
                value: this.configuration.PostCountExpression
            });

        this.storeSorting = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: { 'items': [
                { Id: "asc", Name: config.ttlAscendant },
                { Id: "desc", Name: config.ttlDescendant }
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

        this.uiComponents.cmbSorting =
        	Ext.create('Ext.form.field.ComboBox', {
        	    name: 'Sorting',
        	    fieldLabel: config.ttlSorting,
        	    hideLabel: false,
        	    store: this.storeSorting,
        	    queryMode: 'local',
        	    displayField: 'Name',
        	    valueField: 'Id',
        	    editable: false,
        	    value: this.configuration.Sorting
        	});

        this.panelColumnConfigFields = Ext.create('Ext.panel.Panel', {
            border: 0,
            width: 350,
            height: 400,
            items: [
                this.uiComponents.txtColumnHeader,
                this.uiComponents.txtExpression,
                this.uiComponents.txtAlias,
                this.uiComponents.txtColumnOrder,
                this.uiComponents.txtPostCountExpression,
                this.uiComponents.cmbSorting
            ]
        });





        this.items = [
            this.gridAliases,
            this.panelColumnConfigFields
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
    refreshStoreParamNames: function () {

        var data = { ReportConfigurationId: this.ReportConfigurationId, IncludeFIlters: true, IncludeAliases: true };
        var items = HostApi.ReportParameterCalculatingGetListByObj(data);
        this.storeAliases.loadRawData({ 'items': items });
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