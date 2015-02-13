///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogSimpleDelimiterByDate, {
    extend: 'Ext.window.Window',
    title: 'По датам',
    modal: true,

    items: null,
    buttons: null,

    storeFilters: null,
    storeDelta: null,
    storeAliases: null,
    storeSumAliases: null,

    txtBlockName: null,
    comboFilterFrom: null,
    comboFilterTo: null,
    comboDelimitBy: null,
    comboAlias: null,
    comboSumAlias: null,

    configuration: {
        Type: null,
        ParentId: null,
        ReportConfigurationId: null,
        Title: null,
        DivideDateDelta: null,
        DivideDateMin: null,
        DivideDateMax: null,
        AutoFilterExpression: null,
        AutoFilterAlias: null
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


        this.storeDelta = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: { 'items': [
                { Id: 'day', Name: 'День' },
                { Id: 'week', Name: 'Неделя' },
                { Id: 'decade', Name: 'Декада' },
                { Id: 'month', Name: 'Месяц' },
                { Id: 'quartal', Name: 'Квартал' },
                { Id: 'year', Name: 'Год' }
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

        this.storeFilters = Ext.create('Ext.data.Store', {
            fields: ['Parameters', 'Name'],
            data: { 'items': [] },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        this.reloadStoreFilters();

        this.storeAliases = Ext.create('Ext.data.Store', {
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

        this.reloadStoreAliases();

        this.comboAlias = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Поле разделения',
            hideLabel: false,
            store: this.storeAliases,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Alias'
        });

        this.comboDelimitBy = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Разделение',
            hideLabel: false,
            store: this.storeDelta,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id'
        });


        this.comboFilterFrom = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Фильтр с',
            hideLabel: false,
            store: this.storeFilters,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Parameters'
        });

        this.comboFilterTo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Фильтр по',
            hideLabel: false,
            store: this.storeFilters,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Parameters'
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
            this.comboDelimitBy,
            this.comboFilterFrom,
            this.comboFilterTo,
            this.comboAlias,
            this.comboSumAlias
        ];

        this.callParent(arguments);
    },
    reloadStoreAliases: function () {
        var data = {
            PropertyTypeCode: 'date',
            ReportConfigurationId: this.configuration.ReportConfigurationId
        };
        var items = HostApi.ReportConfigurationAliasesGetListByObj(data);
        this.storeAliases.loadRawData({ 'items': items });
    },
    reloadStoreSumAliases: function () {
        var data = {
            PropertyTypeCode: 'number',
            ReportConfigurationId: this.configuration.ReportConfigurationId
        };
        var items = HostApi.ReportConfigurationAliasesGetListByObj(data);
        this.storeSumAliases.loadRawData({ 'items': items });

    },
    reloadStoreFilters: function () {
        var data = {
            FilterType: 'date',
            ReportConfigurationId: this.configuration.ReportConfigurationId
        };
        var items = HostApi.ReportFilterGetListByObj(data);

        this.storeFilters.loadRawData({ 'items': items });

    },
    createSimpleDelimiter: function () {
        var that = this;

        that.configuration.Title = that.txtBlockName.getValue();
        that.configuration.DivideType = 'date';

        that.configuration.DivideDateDelta = that.comboDelimitBy.getValue();
        that.configuration.DivideDateMin = that.comboFilterFrom.getValue();
        that.configuration.DivideDateMax = that.comboFilterTo.getValue();
        that.configuration.AutoFilterExpression = true;
        that.configuration.AutoFilterAlias = that.comboAlias.getValue();
        that.configuration.SumAlias = that.comboSumAlias.getValue();
         
        var id = HostApi.ReportCrossBlockSetByDateByObj(that.configuration);
        this.close();
        this.onSuccess(response.Data);

    }
});