///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogReportParameter, {
    extend: 'Ext.window.Window',
    title: config.ttlReportParameter,
    modal: true,
    items: null,
    buttons: null,

    onSave: null,

    btnSetValue: null,

    uiComponents: {
        //имя параметра текст
        txtParameterName: null,
        //тип параметра комбобокс
        comboParameterType: null,
        //тип справочника комбобокс
        comboDictionaryType: null,
        //способ вычисления параметра комбобокс
        comboParameterCalculationType: null,
        //значение
        txtValueTitle: null,
        //выражение для фильтра используя фильтр-параметры, параметры, поля
        txtFilterExpression: null,
        //агрегатное выражение комбобокс
        comboAggregateFunction: null,
        //выражение под агрегатным выражением
        txtExpression: null,
        //порядок рассчета
        txtCalculationOrder: null
    },

    configuration: {
        Id: null,
        FilterExpression: null,
        ArithmeticExpression: null,
        AggregateFunction: null,
        Name: null,
        ReportParameterType: null,
        CalculationType: null,
        CalculationOrder: null,
        reportConfigurationId: null,
        DictionaryId: null,
        Value: null,
        ValueTitle: null

    },

    storeParameterTypes: null,
    storeParameterCalculationType: null,
    //storeParamNames: null,
    storeAggregateFunctions: null,
    storeParameterDictionaryType: null,

    parameterNameReadOnly: false,

    constructor: function (options) {

        var that = this;

        Ext.apply(this, options || {});

        if (this.configuration == null) throw "configuration can not be undefined";

        this.uiComponents.txtValueTitle = Ext.create('Ext.form.field.Text', {
            name: 'ValueTitle',
            fieldLabel: config.ttlValue,
            allowBlank: false,
            value: this.configuration.ValueTitle
        });

        this.uiComponents.txtParameterName = Ext.create('Ext.form.field.Text', {
            name: 'Name',
            fieldLabel: config.ttlParameterName,
            allowBlank: false,
            value: this.configuration.Name,
            readOnly: this.parameterNameReadOnly
        });

        this.storeParameterTypes = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: {
                'items': [
                    { Id: 'date', Name: config.ttlDate },
                    { Id: 'boolean', Name: config.ttlBoolean },
                    { Id: 'dict', Name: config.ttlDict },
                    { Id: 'number', Name: config.ttlNumber },
                    { Id: 'str', Name: config.ttlString },
                    { Id: 'recordclass', Name: config.ttlClass }
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

        this.storeParameterCalculationType = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: {
                'items': [
                    { Id: 'aggregate', Name: config.ttlAggregate },
                    { Id: 'expression', Name: config.ttlExpression },
                    { Id: 'const', Name: config.ttlConst }
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

        this.storeParameterDictionaryType = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'DictionaryId'],
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

        this.uiComponents.comboParameterCalculationType = Ext.create('Ext.form.field.ComboBox', {
            name: 'CalculationType',
            fieldLabel: config.ttlParameterCalculationType,
            hideLabel: false,
            store: this.storeParameterCalculationType,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            value: this.configuration.CalculationType,
            listeners: {
                select: function (combo, records, eOpts) {
                    that.setVisibility();
                }
            }
        });

        this.uiComponents.comboParameterType = Ext.create('Ext.form.field.ComboBox', {
            name: 'ReportParameterType',
            fieldLabel: config.ttlParameterType,
            hideLabel: false,
            store: this.storeParameterTypes,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            value: this.configuration.ReportParameterType,
            listeners: {
                select: function (combo, records, eOpts) {
                    that.setVisibility();
                }
            }
        });

        this.refreshStoreDictionaryType();

        this.uiComponents.comboDictionaryType = Ext.create('Ext.form.field.ComboBox', {
            name: 'DictionaryId',
            fieldLabel: config.ttlDict,
            hideLabel: false,
            store: this.storeParameterDictionaryType,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            value: this.configuration.DictionaryId,
            listeners: {
                select: function (combo, records, eOpts) {
                    if (that.uiComponents.comboParameterCalculationType.getValue() == 'const') {


                    }
                }
            }
        });

        this.uiComponents.txtFilterExpression = Ext.create('Ext.form.field.Text', {
            name: 'FilterExpression',
            fieldLabel: config.ttlFilterExpression,
            allowBlank: false,
            value: this.configuration.FilterExpression
        });

        this.storeAggregateFunctions = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: {
                'items': [
                    { Id: 'max', Name: 'MAX' },
                    { Id: 'min', Name: 'MIN' },
                    { Id: 'count', Name: 'COUNT' },
                    { Id: 'avg', Name: 'AVG' },
                    { Id: 'sum', Name: 'SUM' }
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

        this.uiComponents.comboAggregateFunction = Ext.create('Ext.form.field.ComboBox', {
            name: 'AggregateFunction',
            fieldLabel: config.ttlAggregateFunction,
            hideLabel: false,
            store: this.storeAggregateFunctions,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            value: this.configuration.AggregateFunction
        });

        this.uiComponents.txtExpression = Ext.create('Ext.form.field.Text', {
            name: 'ArithmeticExpression',
            fieldLabel: config.ttlExpression,
            allowBlank: false,
            value: this.configuration.ArithmeticExpression
        });

        this.uiComponents.txtCalculationOrder = Ext.create('Ext.form.field.Text', {
            name: 'CalculationOrder',
            fieldLabel: config.ttlCalculationOrder,
            allowBlank: false,
            value: this.configuration.CalculationOrder
        });

        this.storeParamNames = Ext.create('Ext.data.Store', {
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

        var gridParamNames = Ext.create('Ext.grid.Panel', {
            border: 0,
            store: this.storeParamNames,
            columns: [
                    { text: 'Id', dataIndex: 'Id', hidden: true },
                    { text: config.ttlParameterName, dataIndex: 'Name', flex: true }
                ],
            height: 300,
            width: 150,
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {
                    var selectedId = record.data.Id;
                }
            }
        });

        var gridParamNames = Ext.create(config.classPanelReportParamList, {
            border: 0,
            height: 300,
            width: 150,
            reportBlockId: this.configuration.reportBlockId,
            reportConfigurationId: this.configuration.reportConfigurationId,
            IncludeFilters: true,
            IncludeAliases: true,
            isHiddenBtnAddParam: true
        });

        this.btnSetValue = Ext.create('Ext.button.Button', {

            text: '...',
            handler: function () {

                if (that.uiComponents.comboParameterCalculationType.getValue() != 'const') return;

                var code = that.uiComponents.comboParameterType.getValue();
                if (code == 'dict') {
                    code = that.uiComponents.comboDictionaryType.getValue();
                }

                var choose = Ext.create(config.classFormPropertyValue, {
                    value: that.configuration.Value,
                    type: code,
                    checkbox: true,
                    methodOnSave: function (value, title) {
                        that.configuration.ValueTitle = title;
                        that.configuration.Value = value;
                        that.uiComponents.txtValueTitle.setValue(title);
                    }
                });

            }
        });

        this.items = [{
            xtype: 'panel',
            height: 300,
            width: 500,
            layout: 'column',
            items: [
                gridParamNames,
                {
                    xtype: 'panel',
                    border: 0,
                    height: 300,
                    width: 300,
                    items: [
                        this.uiComponents.txtParameterName,
                        this.uiComponents.comboParameterType,
                        this.uiComponents.comboParameterCalculationType,
                        this.uiComponents.comboDictionaryType,
                        {
                            xtype: 'panel',
                            layout: 'column',
                            border: false,
                            items: [
                                this.uiComponents.txtValueTitle,
                                this.btnSetValue
                            ]
                        },
                        this.uiComponents.txtFilterExpression,
                        this.uiComponents.comboAggregateFunction,
                        this.uiComponents.txtExpression,

                        this.uiComponents.txtCalculationOrder
                    ]
                }
            ]
        }];

        this.buttons = [{
            xtype: 'button',
            text: config.ttlOk,
            handler: function () {
                var vals = that.getValues();
                $.extend(that.configuration, vals);
                that.onSave(that.configuration);
                that.close();
            }
        }];

        this.callParent(arguments);

        that.setVisibility();
    },

    getValues: function () {
        var value = new Object();
        for (var key in this.uiComponents) {
            var cmp = this.uiComponents[key];
            if ((typeof cmp.name != 'undefined')
                && (cmp.name != null)
                && (cmp.name != "")) {
                value[cmp.name] = cmp.getValue();
            }
        };
        return value;
    },

    refreshStoreParamNames: function () {

        if (this.configuration.reportConfigurationId == null) return;
        var data = { ReportConfigurationId: this.configuration.reportConfigurationId, IncludeFIlters: true, IncludeAliases: true };
        var items = HostApi.ReportParameterCalculatingGetListByObj(data);
        this.storeParamNames.loadRawData({ 'items': items });
    },

    refreshStoreDictionaryType: function () {

        

        this.storeParameterDictionaryType.loadRawData({ 'items': HostApi.DictionaryGetList() });
    },

    setVisibility: function () {

        var that = this;

        that.uiComponents.txtValueTitle.setVisible(false);
        that.btnSetValue.setVisible(false);
        that.uiComponents.comboAggregateFunction.setVisible(false);
        that.uiComponents.txtExpression.setVisible(false);
        that.uiComponents.txtCalculationOrder.setVisible(false);
        that.uiComponents.txtFilterExpression.setVisible(false);
        that.uiComponents.comboDictionaryType.setVisible(false);

        var type = that.uiComponents.comboParameterCalculationType.getValue();

        if (type == 'const') {
            that.uiComponents.txtValueTitle.setVisible(true);
            that.btnSetValue.setVisible(true);
            var parameterType = that.uiComponents.comboParameterType.getValue();
            if (parameterType == 'dict')
                that.uiComponents.comboDictionaryType.setVisible(true);
        } else if (type == 'expression') {
            that.uiComponents.txtExpression.setVisible(true);
            that.uiComponents.txtCalculationOrder.setVisible(true);
        } else if (type == 'aggregate') {
            that.uiComponents.comboAggregateFunction.setVisible(true);
            that.uiComponents.txtExpression.setVisible(true);
            that.uiComponents.txtCalculationOrder.setVisible(true);
            that.uiComponents.txtFilterExpression.setVisible(true);

        }
    }
});