///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define("ManAcc.Reporting.PanelCrossReportBlock", {
    extend: 'ManAcc.Common.VCCECPanel',
    itemId: 'PanelCrossReportBlock',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    border: false,
    defaults: {
        autoGenId: true
    },

    items: [],
    buttons: [],
    configuration: {},
    cmpRef: {},

    constructor: function (options) {
        Ext.apply(this, options || {});
        this.createItems();
        this.createVcStates();
        this.callParent(arguments);
    },
    createItems: function () {

        var that = this;

        var storeReportBlockCrossTypes = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: {
                'items': [
                    { Id: 'nodelimiter', Name: 'Нет разделения' },
                    { Id: 'date', Name: 'По датам' },
                    { Id: 'dictExpression', Name: 'По справочнику' },
                    { Id: 'algorithm', Name: 'По алгоритму' },
                    { Id: 'link', Name: 'По ссылке на другой блок' },
                    { Id: 'recordclass', Name: 'По классам' }
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
        /*var storeReportColumns = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'Dictionary_Id'],
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
        var repConfColList = HostApi.ReportConfigurationDataSourcesColumnGetList(this.configuration.ReportConfigurationId, true);
        storeReportColumns.loadRawData({ 'items': repConfColList });*/
        var storeDivideDateDelta = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: {
                'items': [
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
        var storeAlgorithmCalculation = Ext.create('Ext.data.Store', {
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
        var algorithmList = HostApi.ReportBlockAlgorithmGetList();
        storeAlgorithmCalculation.loadRawData({ 'items': algorithmList });

        this.cmpRef.txtOrder = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Порядковый номер',
            allowBlank: true,
            configMember: 'Order'
        });
        this.cmpRef.txtAlias = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Имя-параметр для родителя',
            allowBlank: false,
            configMember: 'Alias'
        });
        this.cmpRef.comboDivideType = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: config.ttlDivideType,
            hideLabel: false,
            store: storeReportBlockCrossTypes,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            configMember: 'DivideType'
        });
        this.cmpRef.fldLinkReportBlock = Ext.create("ManAcc.Reporting.FieldLinkReportBlock", {
            fieldLabel: config.ttlLinkReportBlock,
            configMember: 'LinkReportBlockId',
            configMemberTitle: 'LinkReportBlockTitle',
            divideDirection: this.configuration.Type,
            reportConfigurationId: this.configuration.ReportConfigurationId

        });
        this.cmpRef.comboAlgorithm = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Algorithm',
            hideLabel: false,
            store: storeAlgorithmCalculation,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            configMember: 'AlgorithmCalculationId'
        });
        this.cmpRef.txtDivideValueTitle = Ext.create('Ext.form.field.Text', {
            fieldLabel: config.ttlDivideValueTitle,
            allowBlank: false,
            configMember: 'DivideValueTitle'
        });
        this.cmpRef.comboDivideDateDelta = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: config.ttlDivideDateDelta,
            hideLabel: false,
            store: storeDivideDateDelta,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            configMember: 'DivideDateDelta'
        });
        this.cmpRef.txtDivideDateMin = Ext.create('Ext.form.field.Text', {
            fieldLabel: config.ttlDivideDateMin,
            allowBlank: false,
            configMember: 'DivideDateMin'
        });
        this.cmpRef.txtDivideDateMax = Ext.create('Ext.form.field.Text', {
            fieldLabel: config.ttlDivideDateMax,
            allowBlank: false,
            configMember: 'DivideDateMax'
        });
        this.cmpRef.txtExpression = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Параметр-источник',
            allowBlank: false,
            configMember: 'Expression'
        });
        this.cmpRef.txtTitle = Ext.create('Ext.form.field.Text', {
            fieldLabel: config.ttlTitle,
            allowBlank: false,
            configMember: 'Title'
        });
        this.cmpRef.txtFilterExpression = Ext.create('Ext.form.field.Text', {
            fieldLabel: config.ttlFilterExpression,
            allowBlank: true,
            configMember: 'FilterExpression'
        });
        this.cmpRef.txtPriorityExpression = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'PriorityExpression',
            allowBlank: true,
            configMember: 'PriorityExpression',
            hidden: true
        });
        this.cmpRef.fldCalcParameter = Ext.create("ManAcc.Reporting.FieldCalculationParameter", {
            fieldLabel: config.ttlReportParameter,
            configMember: 'IdReportParameter',
            configMemberTitle: 'ParameterText',
            reportConfigurationId: this.configuration.ReportConfigurationId,
            reportBlockId: this.configuration.Id
        });
        this.cmpRef.fldClassParameter = Ext.create("ManAcc.Reporting.FieldLinkClass", {
            fieldLabel: "Фильтровать по классу",
            configMember: 'FilterClasses',
            configMemberTitle: 'FilterClassesTitle',
            reportConfigurationId: this.configuration.ReportConfigurationId,
            reportBlockId: this.configuration.Id
        });
        this.cmpRef.chkTopInserting = Ext.create('Ext.form.field.Checkbox', {
            fieldLabel: config.ttlInsertBeforeChild,
            configMember: 'TopInserting'
        });
        this.cmpRef.chkVisible = Ext.create('Ext.form.field.Checkbox', {
            fieldLabel: config.ttlVisible,
            configMember: 'Visible'
        });
        this.cmpRef.chkSummExcept = Ext.create('Ext.form.field.Checkbox', {
            fieldLabel: "Не суммировать в родителе",
            configMember: 'SummExcept'
        });
        this.cmpRef.chkDecreaseParent = Ext.create('Ext.form.field.Checkbox', {
            fieldLabel: "Уменьшать родителя",
            configMember: 'DecreaseParent'
        });

        this.cmpRef.txtKoef = Ext.create('Ext.form.field.Text', {
            configMember: 'Koef',
            fieldLabel: "Коэффициент",
            allowBlank: false
        });

        var storeSummOnly = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: { 'items': [
                { Id: "All", Name: "Все" },
                { Id: "Positive", Name: "Только Положительные" },
                { Id: "Negative", Name: "Только Отрицательные" }
            ]},
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });


        this.cmpRef.summOnly = Ext.create('Ext.form.field.ComboBox', {
            configMember: 'SummOnly',
            hideLabel: false,
            store: storeSummOnly,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            value: "All",
            fieldLabel: "Суммировать детей"
        });


        var storeParamNames = Ext.create('Ext.data.Store', {
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
        var ParamNames = HostApi.ReportParameterCalculatingGetList(this.configuration.ReportConfigurationId, null, true, true);
        storeParamNames.loadRawData({ 'items': ParamNames });
        var gridParamNames = Ext.create(config.classPanelReportParamList, {
            border: 0,
            width: 200,
            ReportBlockId: this.configuration.Id,
            reportConfigurationId: this.configuration.ReportConfigurationId,
            IncludeFilters: true,
            IncludeAliases: true
        });

        this.cmpRef.gridBindedFilterList = Ext.create("ManAcc.Reporting.FieldCheckBindedFilters", {
            fieldLabel: 'Преднастроенные фильтры (пересечение по логике "И")',
            configMember: 'BindedFilters'
        });

        this.items = [
            gridParamNames,
            {
                xtype: 'panel',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                bodyStyle: 'background:none',
                border: false,
                flex: 1,
                items: [
                    this.cmpRef.txtTitle,
                    this.cmpRef.txtOrder,
                    this.cmpRef.txtAlias,
                    this.cmpRef.comboDivideType,
                    this.cmpRef.fldLinkReportBlock,
                    this.cmpRef.comboAlgorithm,
                    this.cmpRef.comboDivideDateDelta,
                    this.cmpRef.txtDivideDateMin,
                    this.cmpRef.txtDivideDateMax,
                    this.cmpRef.txtExpression,
                    this.cmpRef.txtFilterExpression,
                    this.cmpRef.fldCalcParameter,
                    this.cmpRef.fldClassParameter,
                    {
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background:none',
                        layout: {
                            type: 'table',
                            columns: 2
                        },
                        defaults: {
                            margin: 10
                        },
                        items: [
                            this.cmpRef.chkTopInserting,
                            this.cmpRef.chkVisible,
                            this.cmpRef.chkSummExcept,
                            this.cmpRef.chkDecreaseParent,
                            this.cmpRef.txtKoef,
                            this.cmpRef.summOnly
                        ]
                    },
                    this.cmpRef.gridBindedFilterList
                ]
            }
        ];
    },
    createVcStates: function () {
        var that = this;
        this.vcStates = {
            nodelimiter: [
                that.cmpRef.fldCalcParameter,
                that.cmpRef.summOnly,
                that.cmpRef.txtKoef,
                that.cmpRef.chkDecreaseParent,
                that.cmpRef.chkSummExcept,
                that.cmpRef.chkTopInserting,
                that.cmpRef.chkVisible,
                that.cmpRef.comboDivideType,

                that.cmpRef.gridBindedFilterList,
                that.cmpRef.txtAlias,
                that.cmpRef.txtFilterExpression,
                that.cmpRef.txtOrder,
                that.cmpRef.txtTitle,
                that.cmpRef.fldClassParameter
            ],
            date: [
                that.cmpRef.fldCalcParameter,
                that.cmpRef.summOnly,
                that.cmpRef.txtKoef,
                that.cmpRef.chkDecreaseParent,
                that.cmpRef.chkSummExcept,
                that.cmpRef.chkTopInserting,
                that.cmpRef.chkVisible,
                that.cmpRef.comboDivideDateDelta,
                that.cmpRef.comboDivideType,

                that.cmpRef.gridBindedFilterList,
                that.cmpRef.txtAlias,
                that.cmpRef.txtDivideDateMax,
                that.cmpRef.txtDivideDateMin,
                that.cmpRef.txtFilterExpression,
                that.cmpRef.txtOrder,
                that.cmpRef.txtTitle,
                that.cmpRef.fldClassParameter
            ],
            dictExpression: [
                that.cmpRef.fldCalcParameter,
                that.cmpRef.summOnly,
                that.cmpRef.txtKoef,
                that.cmpRef.chkDecreaseParent,
                that.cmpRef.chkSummExcept,
                that.cmpRef.chkVisible,
                that.cmpRef.chkTopInserting,
                that.cmpRef.comboDivideType,

                that.cmpRef.gridBindedFilterList,
                that.cmpRef.txtAlias,
                that.cmpRef.txtExpression,
                that.cmpRef.txtFilterExpression,
                that.cmpRef.txtOrder,
                that.cmpRef.txtTitle,
                that.cmpRef.fldClassParameter
            ],
            algorithm: [

                that.cmpRef.txtKoef,
                that.cmpRef.chkDecreaseParent,
                that.cmpRef.chkSummExcept,
                that.cmpRef.chkVisible,
                that.cmpRef.chkTopInserting,
                that.cmpRef.comboAlgorithm,
                that.cmpRef.comboDivideType,

                that.cmpRef.gridBindedFilterList,
                that.cmpRef.txtAlias,
                that.cmpRef.txtFilterExpression,
                that.cmpRef.txtOrder,
                that.cmpRef.txtTitle,
                that.cmpRef.fldClassParameter
            ],
            link: [
                that.cmpRef.fldCalcParameter,
                that.cmpRef.summOnly,
                that.cmpRef.txtKoef,
                that.cmpRef.chkDecreaseParent,
                that.cmpRef.chkSummExcept,
                that.cmpRef.chkTopInserting,
                that.cmpRef.chkVisible,
                that.cmpRef.comboDivideType,
                that.cmpRef.fldLinkReportBlock,
                that.cmpRef.gridBindedFilterList,
                that.cmpRef.txtAlias,
                that.cmpRef.txtFilterExpression,
                that.cmpRef.txtOrder,
                that.cmpRef.txtTitle,
                that.cmpRef.fldClassParameter
            ],
            recordclass: [
                that.cmpRef.fldCalcParameter,
                that.cmpRef.summOnly,
                that.cmpRef.txtKoef,
                that.cmpRef.chkDecreaseParent,
                that.cmpRef.chkSummExcept,
                that.cmpRef.chkVisible,
                that.cmpRef.comboDivideType,
                that.cmpRef.gridBindedFilterList,
                that.cmpRef.txtAlias,
                that.cmpRef.txtExpression,
                that.cmpRef.txtFilterExpression,
                that.cmpRef.txtOrder,
                that.cmpRef.txtTitle
            ]
        };
    },
    configToVcState: function (newConfiguration) {
        return newConfiguration.DivideType || 'nodelimiter';
    },
    getParameterConfiguration: function () {
        return this.cmpRef.fldCalcParameter.getCalculationParameterConfiguration();
    },
    isParameterConfigurationDirty: function () {
        return this.cmpRef.fldCalcParameter.isDirty();
    }
});