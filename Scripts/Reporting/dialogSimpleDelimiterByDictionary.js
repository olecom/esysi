///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogSimpleDelimiterByDictionary, {
    extend: 'Ext.window.Window',
    title: 'По справочнику',
    modal: true,

    onSelect: null,
    items: null,
    buttons: null,

    storeDictionaries: null,
    storeFunction: null,
    storeSumAliases: null,

    txtBlockName: null,
    comboDictionary: null,
    txtChosenValues: null,
    comboFunction: null,
    comboSumAlias: null,
    fldFilterClasses: null,

    configuration: {
        Type: null,
        ParentId: null,
        ReportConfigurationId: null,
        Title: null,
        FilterClasses: null
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

        this.storeFunction = Ext.create('Ext.data.Store', {
            fields: ['Method', 'Name'],
            data: { 'items': [
                { Method: 'None', Name: 'Выбранные элементы' },
                { Method: 'GetNearChildIR', Name: 'Дети, включая выбранные элементы' },
                { Method: 'GetNearChildER', Name: 'Дети, исключая выбранные элементы' },
                { Method: 'GetAllChildIR', Name: 'Все наследники, включая выбранные элементы' },
                { Method: 'GetAllChildER', Name: 'Все наследники, исключая выбранные элементы' }
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


        this.txtBlockName = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Имя блока',
            allowBlank: false,
            editable: false
        });

        var dicts = HostApi.DictionaryGetList();

        this.storeDictionaries.loadRawData({ 'items': dicts });

        this.comboDictionary = Ext.create('Ext.form.field.ComboBox', {

            hideLabel: false,
            fieldLabel: 'Справочник',
            store: this.storeDictionaries,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            listeners: {
                select: function (combo, records, eOpts) {

                    code = that.comboDictionary.getValue();


                    var choose = Ext.create(config.classFormPropertyValue, {
                        value: that.configuration.Value,
                        type: code,
                        checkbox: true,
                        methodOnSave: function (value, title) {
                            that.txtChosenValues.setValue(title);
                            that.configuration.Value = value;
                        }
                    });


                }
            }
        });

        this.txtChosenValues = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Выбранные элементы',
            allowBlank: false,
            editable: false
        });

        this.comboFunction = Ext.create('Ext.form.field.ComboBox', {
            allowBlank: false,
            hideLabel: false,
            fieldLabel: 'Преобразование',
            store: this.storeFunction,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Method',
            editable: false
        });

        this.storeSumAliases = Ext.create('Ext.data.Store', {
            fields: ['Alias', 'Name'],
            data: { 'items': [] },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        var sumAliases = HostApi.ReportConfigurationAliasesGetList(this.configuration.ReportConfigurationId, 'number');

        this.storeSumAliases.loadRawData({ 'items': sumAliases });

        this.comboSumAlias = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Поле для суммы',
            hideLabel: false,
            store: this.storeSumAliases,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Alias'
        });

        this.fldFilterClasses = Ext.create("ManAcc.Reporting.FieldLinkClass", {
            fieldLabel: config.ttlReportClass,
            reportConfigurationId: this.configuration.ReportConfigurationId
        });

        this.items = [
            this.txtBlockName,
            this.comboDictionary,
            this.txtChosenValues,
            this.comboFunction,
            this.comboSumAlias,
            this.fldFilterClasses
        ];
        this.callParent(arguments);
    },

    createSimpleDelimiter: function () {
        var that = this;

        that.configuration.Title = that.txtBlockName.getValue();
        that.configuration.DivideType = 'dictExpression';
        that.configuration.Function = that.comboFunction.getValue();
        that.configuration.DictionaryId = that.comboDictionary.getValue();
        that.configuration.SumAlias = that.comboSumAlias.getValue();
        that.configuration.FilterClasses = that.fldFilterClasses.getValue();

        var rbId = HostApi.ReportCrossBlockSetByDictionaryByObj(that.configuration);

        this.onSuccess(rbId);
        this.close();

    }
});