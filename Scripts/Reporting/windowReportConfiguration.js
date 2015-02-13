///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classWindowReportConfiguration, {
    extend: 'Ext.ux.Wizard',
    titlePrefix: config.ttlReportConfiguration,
    includeSubTitle: true,

    storeReportGroup: null,
    storeDataSources: null,
    storeDataSourceAliases: null,
    storeDataFilters: null,
    storeReportParameters: null,
    storeParamNames: null,
    storeReportBlocks: null,

    enableAddRowOnStart: true,

    maximized: true,
    constrain: true,
    height: 600,
    width: 800,

    uiComponents: {
        step1: {
            txtReportName: null,
            comboReportGroup: null,
            radioReportFlat: null,
            radioReportCross: null
        },
        step2: {
            gridDataSources: null
        },
        step3: {
            gridDataSourceAliases: null
        },
        step4: {
            gridDataFilters: null
        },
        step5: {
            gridReportParamters: null
        },
        step6: {
            gridParamNames: null,
            txtFilterExpression: null
        },
        step7: {
            gridReportBlocks: null,
            btnAddRow: null,
            btnAddColumn: null,
            btnDeleteReportFlatBlock: null
        },
        step8: {

            treeRowDivide: null,
            treeColumnDivide: null,

            btnRowDivideAdd: null,
            btnRowDivideDel: null,

            btnColumnDivideAdd: null,
            btnColumnDivideDel: null
        }
    },

    configuration: {
        reportName: null,
        reportGroupId: null,
        reportFormType: null,
        reportConfigurationId: null,
        reportFilterExpression: null
    },

    constructor: function (options) {
        var that = this;

        this.renderTo = application.pnlSpace.getEl().dom;

        this.uiComponents = {};
        this.configuration = {};
        this.items = [];

        Ext.apply(this, options || {});

        this.configReportName_Step1();
        this.configReportSources_Step2();
        this.configReportFilters_Step4();
        this.configReportParameters_Step5();
        this.configReportGlobalFilter_Step6();
        this.configReportFlatAddRowsAndColumns_Step7();
        this.configReportCrossAddRowsAndColumns_Step8();

        this.callParent(arguments);

    },

    configReportName_Step1: function () {
        var that = this;
        this.storeReportGroup = Ext.create('Ext.data.Store', {
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
        this.refreshReportGroupList();

        this.uiComponents.step1 = {};
        this.uiComponents.step1.txtReportName = Ext.create('Ext.form.field.Text', {
            fieldLabel: config.ttlReportName,
            name: 'ReportName',
            hideLabel: false
        });
        this.uiComponents.step1.comboReportGroup = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: config.ttlReportGroup,
            name: 'ReportGroup',
            hideLabel: false,
            store: this.storeReportGroup,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false
        });
        this.uiComponents.step1.radioReportFlat = Ext.create('Ext.form.field.Radio', {
            boxLabel: config.ttlFlatTable,
            name: 'ReportTableForm',
            inputValue: 'flat',
            checked: true
        });
        this.uiComponents.step1.radioReportCross = Ext.create('Ext.form.field.Radio', {
            boxLabel: config.ttlCrossTable,
            name: 'ReportTableForm',
            inputValue: 'cross'
        });

        this.items.push({
            xtype: 'panel',
            layout: 'fit',
            title: config.ttlReportName,
            items: [
                {
                    height: 300,
                    width: 500,
                    xtype: 'panel',
                    items: [
                        this.uiComponents.step1.txtReportName,
                        this.uiComponents.step1.comboReportGroup,
                        this.uiComponents.step1.radioReportFlat,
                        this.uiComponents.step1.radioReportCross
                    ]
                }
            ],
            buttons: [{
                text: config.ttlAddReportGroup,
                scope: this,
                handler: this.btnAddReportGroup
            }],
            beforeSetPanelActive: function () {
                that.refreshReportConfiguration();
            },
            onNextStep: function () {

                that.saveReportConfiguration();

                that.items.items[4].jumpOverIfNext = ((that.uiComponents.step1.radioReportFlat.checked) ? 0 : 1) * 1;
                that.items.items[6].jumpOverIfBack = ((that.uiComponents.step1.radioReportFlat.checked) ? 0 : 1) * 1;

            }
        });
    },
    configReportSources_Step2: function () {
        var that = this;
        this.storeDataSources = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'LinkType', 'DataSourceFieldConnecting', 'DataSourceFieldMain', 'ReportSourceOrder', 'DataInputFormId', 'DataSourceFieldConnectingTitle', 'DataSourceFieldMainTitle'],
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

        this.uiComponents.step2 = {};
        this.uiComponents.step2.gridDataSources = Ext.create('Ext.grid.Panel', {
            store: this.storeDataSources,
            columns: [
                { dataIndex: 'Id', hidden: true },
                { text: config.ttlDataSource, dataIndex: 'Name', flex: 1, maxWidth: 300 },
                { text: config.ttlJoinType, dataIndex: 'LinkType', width: 100 },
                { text: config.ttlDataSourceFieldConnecting, dataIndex: 'DataSourceFieldConnecting', width: 100, hidden: true },
                { text: config.ttlDataSourceFieldMain, dataIndex: 'DataSourceFieldMain', width: 100, hidden: true },
                { text: config.ttlJoinTableField, dataIndex: 'DataSourceFieldConnectingTitle', width: 100 },
                { text: config.ttlSourceField, dataIndex: 'DataSourceFieldMainTitle', width: 100 },
                { text: config.ttlOrder, dataIndex: 'ReportSourceOrder', width: 50 },
                { dataIndex: 'DataInputFormId', width: 50, hidden: true }
            ],
            height: 300,
            width: 500,
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {

                    var selectedId = record.data.Id;

                }
            }
        });

        this.items.push({
            xtype: 'panel',
            layout: 'fit',
            title: config.ttlDataSource,
            items: [
                that.uiComponents.step2.gridDataSources
            ],
            buttons: [
                {
                    text: config.ttlAddDataSource,
                    handler: this.btnAddDataSource,
                    scope: this
                },
                {
                    text: config.ttlDeleteSource,
                    handler: this.btnDeleteSource,
                    scope: this
                }
            ],
            beforeSetPanelActive: function () {
                that.refreshDataSourcesStore();
            }
        });
    },
    configReportAliases_Step3: function () {
        var that = this;
        this.storeDataSourceAliases = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Alias', 'PropertyName'],
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

        this.uiComponents.step3 = {};
        this.uiComponents.step3.gridDataSourceAliases = Ext.create('Ext.grid.Panel', {
            height: 300,
            width: 500,
            store: this.storeDataSourceAliases,
            columns: [
                { text: 'Id', dataIndex: 'Id', hidden: true },
                { text: config.ttlAlias, dataIndex: 'Alias', width: 100 },
                { text: config.ttlPropertyName, dataIndex: 'PropertyName', width: 100 }
            ]
        });
        this.items.push({
            xtype: 'panel',
            layout: 'fit',
            title: config.ttlAliases,
            items: [
                that.uiComponents.step3.gridDataSourceAliases
            ],
            beforeSetPanelActive: function () {
                that.refreshDataSourceAliasesStore();
            }
        });
    },
    configReportFilters_Step4: function () {
        var that = this;
        this.storeDataFilters = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'Parameters'],
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
        this.uiComponents.step4 = {};
        this.uiComponents.step4.gridDataFilters = Ext.create('Ext.grid.Panel', {
            store: this.storeDataFilters,
            columns: [
                { text: 'Id', dataIndex: 'Id', hidden: true },
                { text: config.ttlName, dataIndex: 'Name', flex: 1 },
                { text: config.ttlParameters, dataIndex: 'Parameters', flex: 1 }
            ],
            height: 300,
            width: 500,
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {

                    var selectedId = record.data.Id;

                }
            }
        });

        this.items.push({
            xtype: 'panel',
            title: config.ttlFilters,
            layout: 'fit',
            items: [
                this.uiComponents.step4.gridDataFilters
            ],
            buttons: [{
                text: config.ttlAddDataFilter,
                handler: this.btnAddDataFilter,
                scope: this
            },
            {
                text: config.ttlDeleteDataFilter,
                handler: this.btnDeleteDataFilter,
                scope: this
            }],
            beforeSetPanelActive: function () {
                that.refreshStoreFilters();
            }
        });
    },
    configReportParameters_Step5: function () {
        var that = this;
        this.storeReportParameters = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'Comment', 'Type', 'Order'],
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
        this.uiComponents.step5 = {};
        this.uiComponents.step5.gridReportParamters = Ext.create('Ext.grid.Panel', {
            store: this.storeReportParameters,
            columns: [
                { dataIndex: 'Id', hidden: true },
                { text: config.ttlOrder, dataIndex: 'Order', width: 50 },
                { text: config.ttlType, dataIndex: 'Type', width: 75 },
                { text: config.ttlName, dataIndex: 'Name', minWidth: 150, maxWidth: '300' },
                { text: config.ttlComment, dataIndex: 'Comment', flex: true }
            ],
            height: 300,
            width: 500,
            listeners: {
                itemdblclick: {
                    fn: this.recDblClickParameter,
                    scope: this
                }
            }
        });

        this.items.push({
            xtype: 'panel',
            title: config.ttlReportParameters,
            layout: 'fit',
            items: [
                this.uiComponents.step5.gridReportParamters
            ],
            buttons: [
                {
                    text: config.ttlAddParameter,
                    handler: this.btnAddParameter,
                    scope: this

                },
                {
                    text: config.ttlDeleteParameter,
                    handler: this.btnDeleteParameter,
                    scope: this
                }
            ],
            beforeSetPanelActive: function () {
                that.refreshStoreParameters();
            }
        });


    },
    configReportGlobalFilter_Step6: function () {

        var that = this;
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
        this.uiComponents.step6 = {};

        this.uiComponents.step6.gridParamNames = Ext.create(config.classPanelReportParamList, {
            border: 0,
            width: 200,
            reportBlockId: null,
            reportConfigurationId: this.configuration.reportConfigurationId,
            IncludeFilters: true,
            IncludeAliases: true
        });

        this.uiComponents.step6.txtFilterExpression = Ext.create('Ext.form.field.TextArea', {
            name: 'fieldFilterExpression',
            fieldLabel: config.ttlFilterExpression,
            labelAlign: "top",
            margin: '0 0 0 3',
            allowBlank: false,
            columnWidth: 1,
            value: this.configuration.reportFilterExpression,
            listeners: {
                scope: this,
                blur: this.blurFilterExpression
            }
        });

        var panel = Ext.create('Ext.panel.Panel', {
            height: 300,
            width: 500,
            border: false,
            layout: 'fit',
            title: config.ttlReportParameters,
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        { xtype: 'panel', autoScroll: true, border: false, items: [this.uiComponents.step6.gridParamNames], width: 210 },
                        { xtype: 'panel', border: false, layout: 'fit', items: [this.uiComponents.step6.txtFilterExpression], flex: 1 }
                    ]
                }
            ],
            beforeSetPanelActive: function () {
                that.refreshStoreParamNames();
            }
        });

        this.items.push(panel);
    },
    configReportFlatAddRowsAndColumns_Step7: function () {
        var that = this;

        this.storeReportBlocks = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'ReportBlockType', 'ReportBlockTypeTitle', 'Order'],
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
        this.uiComponents.step7 = {};
        this.uiComponents.step7.gridReportBlocks = Ext.create('Ext.grid.Panel', {
            store: this.storeReportBlocks,
            sortableColumns: false,
            columns: [
                { dataIndex: 'Id', hidden: true },
                { dataIndex: 'ReportBlockType', hidden: true },
                { text: config.ttlOrder, dataIndex: 'Order' },
                { text: config.ttlType, dataIndex: 'ReportBlockTypeTitle' },
                { text: config.ttlName, dataIndex: 'Name', flex: true }
            ],
            height: 300,
            width: 500,
            listeners: {
                itemdblclick: {
                    fn: this.recDlbClickFlatReportBlock,
                    scope: this
                }
            }
        });

        this.uiComponents.step7.btnSetSortingColumn = Ext.create('Ext.button.Button', {
            text: config.ttlSetS,
            handler: this.btnSetSortingColumn,
            scope: this
        });

        this.uiComponents.step7.btnAddRow = Ext.create('Ext.button.Button', {
            text: config.ttlPlusRow,
            handler: this.btnAddReportFlatBlockRow,
            scope: this
        });

        this.uiComponents.step7.btnAddColumn = Ext.create('Ext.button.Button', {
            text: config.ttlPlusColumn,
            disabled: !this.enableAddRowOnStart,
            handler: this.btnAddReportFlatBlockColumn,
            scope: this
        });

        this.uiComponents.step7.btnDeleteReportFlatBlock = Ext.create('Ext.button.Button', {
            text: config.ttlDeleteBlock,
            handler: this.btnDeleteReportFlatBlock,
            scope: this
        });

        this.items.push({
            finishable: true,
            xtype: 'panel',
            title: config.ttlRowsAndColumns,
            layout: 'fit',
            items: [
                this.uiComponents.step7.gridReportBlocks
            ],
            buttons: [
                 this.uiComponents.step7.btnAddRow,
                 this.uiComponents.step7.btnAddColumn,
                 this.uiComponents.step7.btnDeleteReportFlatBlock
            ],
            beforeSetPanelActive: function () {
                that.refreshStoreReportFlatBlocks();
            }
        });
    },
    configReportCrossAddRowsAndColumns_Step8: function () {
        var that = this;

        this.uiComponents.step8 = {};

        var uiLocalConfig = this.uiComponents.step8;

        uiLocalConfig.btnColumnDividerUp = Ext.create('Ext.button.Button', {
            text: '&uarr;',
            maxWidth: 30,
            handler: function () {
                var id = that.uiComponents.step8.treeColumnDivide.getValue();
                HostApi.ReportCrossBlockOrderChange('up', id);
                that.uiComponents.step8.treeColumnDivide.refreshTree(id);
            }
        });
        uiLocalConfig.btnColumnDividerDown = Ext.create('Ext.button.Button', {
            text: '&darr;',
            maxWidth: 30,
            handler: function () {
                var id = that.uiComponents.step8.treeColumnDivide.getValue();
                HostApi.ReportCrossBlockOrderChange('down', id);
                that.uiComponents.step8.treeColumnDivide.refreshTree(id);
            }
        });

        uiLocalConfig.btnAddColumnSimpleDivider = Ext.create('Ext.button.Button', {
            text: config.ttlAddTypical,
            handler: function () {
                var config = {
                    Type: 'ColumnDivide',
                    ParentId: that.uiComponents.step8.treeColumnDivide.getValue(),
                    ReportConfigurationId: that.configuration.reportConfigurationId
                };
                that.btnChooseSimpleDividerClass(config);
            }
        });

        uiLocalConfig.btnColumnDivideAddRoot = Ext.create('Ext.button.Button', {
            text: config.ttlAddRoot,
            handler: function () {
                var wnd = Ext.create("ManAcc.Reporting.WindowCrossReportBlock", {
                    Type: "ColumnDivide",
                    ParentId: null,
                    ReportConfigurationId: that.configuration.reportConfigurationId,
                    onSave: function (val) {
                        that.uiComponents.step8.treeColumnDivide.refreshTree(val);
                    }
                });
                wnd.show();
            }
        });
        uiLocalConfig.btnColumnDivideAdd = Ext.create('Ext.button.Button', {
            text: config.ttlAddChildNode,
            handler: function () {
                var selectedId = that.uiComponents.step8.treeColumnDivide.getValue();
                var wnd = Ext.create("ManAcc.Reporting.WindowCrossReportBlock", {
                    Type: "ColumnDivide",
                    ParentId: selectedId,
                    ReportConfigurationId: that.configuration.reportConfigurationId,
                    onSave: function (val) {
                        that.uiComponents.step8.treeColumnDivide.refreshTree(val);
                    }
                });
                wnd.show();
            }
        });
        uiLocalConfig.btnColumnDivideDel = Ext.create('Ext.button.Button', {
            text: config.ttlDelete,
            //maxWidth: 60,
            handler: function () {
                var id = that.uiComponents.step8.treeColumnDivide.getValue();
                if (that.deleteReportBlock(id))
                    that.uiComponents.step8.treeColumnDivide.refreshTree();
            }
        });
        uiLocalConfig.treeColumnDivide = Ext.create(config.classPanelTreeReportDividers, {
            title: config.ttlTreeColumnDivide,
            autoScroll: true,
            width: 220,
            height: 400,
            value: that.value,
            ReportConfigurationId: that.configuration.reportConfigurationId,
            ReportBlockType: 'ColumnDivide',
            checkbox: false,
            onValueSelected: function () {


                var value = this.getValue();
                var title = this.getTitle();
                var wnd = Ext.create("ManAcc.Reporting.WindowCrossReportBlock", {
                    title: title,
                    idCrossReportBlock: value,
                    onSave: function (val) {
                        that.uiComponents.step8.treeColumnDivide.refreshTree(val);
                    }
                });

                wnd.show();
            },
            buttons: [
                uiLocalConfig.btnAddColumnSimpleDivider,
                uiLocalConfig.btnColumnDivideAddRoot,
                uiLocalConfig.btnColumnDivideAdd,
                uiLocalConfig.btnColumnDivideDel,
                uiLocalConfig.btnColumnDividerDown,
                uiLocalConfig.btnColumnDividerUp
            ]
        });


        uiLocalConfig.btnRowDividerUp = Ext.create('Ext.button.Button', {
            text: '&uarr;',
            maxWidth: 30,
            handler: function () {
                var id = that.uiComponents.step8.treeRowDivide.getValue();
                HostApi.ReportCrossBlockOrderChange('up', id);
                that.uiComponents.step8.treeRowDivide.refreshTree(id);
            }
        });
        uiLocalConfig.btnRowDividerDown = Ext.create('Ext.button.Button', {
            text: '&darr;',
            maxWidth: 30,
            handler: function () {
                var id = that.uiComponents.step8.treeRowDivide.getValue();
                HostApi.ReportCrossBlockOrderChange('down', id);
                that.uiComponents.step8.treeRowDivide.refreshTree(id);
            }
        });

        uiLocalConfig.btnRowDivideAddRoot = Ext.create('Ext.button.Button', {
            text: config.ttlAddRoot,
            //maxWidth: 60,
            handler: function () {


                var wnd = Ext.create("ManAcc.Reporting.WindowCrossReportBlock", {
                    Type: "RowDivide",
                    ParentId: null,
                    ReportConfigurationId: that.configuration.reportConfigurationId,
                    onSave: function (val) {
                        that.uiComponents.step8.treeRowDivide.refreshTree(val);
                    }
                });
                wnd.show();

            }
        });
        uiLocalConfig.btnRowDivideAdd = Ext.create('Ext.button.Button', {
            text: config.ttlAddChildNode,
            //maxWidth: 60,
            handler: function () {
                var selectedId = that.uiComponents.step8.treeRowDivide.getValue();
                var wnd = Ext.create("ManAcc.Reporting.WindowCrossReportBlock", {
                    Type: "RowDivide",
                    ParentId: selectedId,
                    ReportConfigurationId: that.configuration.reportConfigurationId,
                    onSave: function (val) {
                        that.uiComponents.step8.treeRowDivide.refreshTree(val);
                    }
                });
                wnd.show();



            }
        });
        uiLocalConfig.btnRowDivideDel = Ext.create('Ext.button.Button', {
            text: config.ttlDelete,
            //maxWidth: 60,
            handler: function () {
                var id = that.uiComponents.step8.treeRowDivide.getValue();
                if (that.deleteReportBlock(id))
                    that.uiComponents.step8.treeRowDivide.refreshTree();
            }
        });

        uiLocalConfig.btnAddRowSimpleDivider = Ext.create('Ext.button.Button', {
            text: config.ttlAddTypical,
            handler: function () {
                var config = {
                    Type: 'RowDivide',
                    ParentId: that.uiComponents.step8.treeRowDivide.getValue(),
                    ReportConfigurationId: that.configuration.reportConfigurationId
                };
                that.btnChooseSimpleDividerClass(config);
            }
        });


        uiLocalConfig.treeRowDivide = Ext.create(config.classPanelTreeReportDividers, {
            title: config.ttlTreeRowDivide,
            autoScroll: true,
            width: 220,
            height: 400,
            value: that.value,
            ReportConfigurationId: that.configuration.reportConfigurationId,
            ReportBlockType: 'RowDivide',
            checkbox: false,
            onValueSelected: function () {


                var value = this.getValue();
                var title = this.getTitle();
                var wnd = Ext.create("ManAcc.Reporting.WindowCrossReportBlock", {
                    title: title,
                    idCrossReportBlock: value,
                    onSave: function (val) {
                        that.uiComponents.step8.treeColumnDivide.refreshTree(val);
                    }
                });

                wnd.show();
            },
            buttons: [
                uiLocalConfig.btnAddRowSimpleDivider,
                uiLocalConfig.btnRowDivideAddRoot,
                uiLocalConfig.btnRowDivideAdd,
                uiLocalConfig.btnRowDivideDel,
                uiLocalConfig.btnRowDividerUp,
                uiLocalConfig.btnRowDividerDown
            ]
        });

        this.items.push({
            finishable: true,
            xtype: 'panel',
            title: 'Блоки кросс таблицы',
            border: false,
            layout: 'fit',
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        { xtype: 'panel', border: false, layout: 'fit', items: [uiLocalConfig.treeRowDivide], flex: 1 },
                        { xtype: 'panel', border: false, layout: 'fit', items: [uiLocalConfig.treeColumnDivide], flex: 1 }
                    ]
                }
            ]

        });

    },

    refreshDataSourcesStore: function () {

        if (this.configuration.reportConfigurationId == null)
            return;

        var items = HostApi.ReportConfigurationDataSourceGetList(this.configuration.reportConfigurationId);


        this.storeDataSources.loadRawData({ 'items': items });

    },
    refreshDataSourceAliasesStore: function () {

        if (this.configuration.reportConfigurationId == null) return;

        var items = HostApi.ReportConfigurationAliasesGetList(this.configuration.reportConfigurationId);

        this.storeDataSourceAliases.loadRawData({ 'items': items });

    },
    refreshReportConfiguration: function () {

        if (this.configuration.reportConfigurationId == null)
            return;

        this.configuration = HostApi.ReportConfigurationGet(this.configuration.reportConfigurationId);


        this.uiComponents.step1.comboReportGroup.setValue(
            this.configuration.reportGroupId,
            true
        );

        this.uiComponents.step1.txtReportName.setValue(this.configuration.reportName);

        if (this.configuration.reportFormType == 'flat') {
            this.uiComponents.step1.radioReportFlat.setValue(true);
            this.uiComponents.step1.radioReportCross.setValue(false);
        } else {
            this.uiComponents.step1.radioReportFlat.setValue(false);
            this.uiComponents.step1.radioReportCross.setValue(true);
        }

        this.uiComponents.step6.txtFilterExpression.setValue(
            this.configuration.reportFilterExpression
        );

    },
    refreshStoreFilters: function () {

        if (this.configuration.reportConfigurationId == null) return;
        var items = HostApi.ReportFilterGetList(this.configuration.reportConfigurationId);
        this.storeDataFilters.loadRawData({ 'items': items });

    },
    refreshStoreParameters: function () {

        if (this.configuration.reportConfigurationId == null) return;
        var resp = HostApi.ReportParameterCalculatingGetList(this.configuration.reportConfigurationId, null, false, false, null);
        this.storeReportParameters.loadRawData({ 'items': resp });

    },
    refreshStoreReportFlatBlocks: function () {

        if (this.configuration.reportConfigurationId == null) return;

        var lst = HostApi.ReportFlatBlockGetList(this.configuration.reportConfigurationId);

        lst = $(lst).translate("ReportBlockTypeTitle")


        if (this.uiComponents.step7.btnAddColumn != null) {
            this.uiComponents.step7.btnAddColumn.enable();
            for (var i = 0; i < lst.length; i++) {
                if (lst[i].ReportBlockType == false) this.uiComponents.step7.btnAddColumn.disable();
            }
        } else {
            this.enableAddRowOnStart = true;
            for (var i = 0; i < lst.length; i++) {
                if (lst[i].ReportBlockType == false) this.enableAddRowOnStart = false;
            }

        }

        this.storeReportBlocks.loadRawData({ 'items': lst });
    },
    refreshStoreParamNames: function () {

        if (this.configuration.reportConfigurationId == null) return;
        var data = {
            ReportConfigurationId: this.configuration.reportConfigurationId,
            IncludeFIlters: true,
            IncludeAliases: true
        };
        var items = HostApi.ReportParameterCalculatingGetListByObj(data);


        this.storeParamNames.loadRawData({ 'items': items });
    },
    refreshReportGroupList: function () {
        var items = HostApi.ReportGroupGetList();
        this.storeReportGroup.loadRawData({ 'items': items });
    },

    sendNewReportGroupName: function (ReportGroupName) {

        HostApi.ReportGroupCreate(ReportGroupName);
        this.refreshReportGroupList();

    },
    saveReportConfiguration: function () {

        var repForm = (this.uiComponents.step1.radioReportFlat.checked) ? "flat" : "cross";
        var data = {
            ReportConfigurationId: this.configuration.reportConfigurationId,
            ReportGroupId: this.uiComponents.step1.comboReportGroup.getValue(),
            ReportName: this.uiComponents.step1.txtReportName.getValue(),
            ReportForm: repForm
        };
        this.configuration.reportConfigurationId = HostApi.ReportConfigurationSaveByObj(data);

    },
    deleteReportBlock: function (id) {

        HostApi.ReportBlockDelete(id);

        return true;

    },
    deleteDataSource: function (id) {
        HostApi.ReportConfigurationDataSourceDelete(id);
        this.refreshDataSourcesStore();
    },

    btnAddDataSource: function () {
        var that = this;
        var s = Ext.create(config.classDialogSelectDataSource, {
            ReportConfigurationId: that.configuration.reportConfigurationId,
            firstDataSource: (that.storeDataSources.getCount() == 0),
            onSelect: function (joinType, fieldMain, fieldConnecting, dataInputFormId, order) {
                var data = {
                    LinkType: joinType,
                    FieldMain: fieldMain,
                    FieldConnecting: fieldConnecting,
                    DataInputFormId: dataInputFormId,
                    Order: order,
                    ReportConfigurationId: that.configuration.reportConfigurationId
                };
                HostApi.ReportConfigurationDataSourceAddByObj(data);

                that.refreshDataSourcesStore();
            }
        });
        s.show();
    },
    btnDeleteSource: function () {
        var id = this.uiComponents.step2.gridDataSources.getSelectionModel().getSelection()[0].get("Id");
        this.deleteDataSource(id);
    },
    btnAddReportGroup: function () {

        var promptFunc = function (btn, text) {
            if (btn == "ok")
                this.sendNewReportGroupName(text);
        };

        Ext.MessageBox.prompt(config.ttlAddReportGroup, config.ttlReportGroup + ':', promptFunc, this, false);

    },
    recDblClickParameter: function (grid, record, item, index, e, eOpts) {
        var that = this;
        var response = HostApi.ReportParameterGet(record.data.Id);
        $.extend(response, { reportConfigurationId: that.configuration.reportConfigurationId });

        var s = Ext.create(config.classDialogReportParameter, {
            configuration: response,
            onSave: function (configuration) {

                HostApi.ReportParameterSaveByObj(configuration);
                that.refreshStoreParameters();
                grid.getSelectionModel().select(index);
            }
        });
        s.show();

    },
    btnAddDataFilter: function () {
        var that = this;
        var s = Ext.create(config.classDialogAddFilter, {
            onSave: function (configuration) {
                var send = {
                    ReportConfigurationId: that.configuration.reportConfigurationId
                };
                jQuery.extend(send, configuration);
                HostApi.ReportFilterSaveByObj(send);

                that.refreshStoreFilters();
            }
        });
        s.show();
    },
    btnDeleteDataFilter: function () {
        var that = this;
        var id = that.uiComponents.step4.gridDataFilters.getSelectionModel().getSelection()[0].get("Id");
        HostApi.ReportFilterDelete(id);
        that.refreshStoreFilters();

    },
    btnAddParameter: function () {
        var that = this;
        var s = Ext.create(config.classDialogReportParameter, {
            configuration: {
                reportConfigurationId: that.configuration.reportConfigurationId
            },
            onSave: function (configuration) {


                HostApi.ReportParameterSaveByObj(configuration);
                that.refreshStoreParameters();
            }
        });
        s.show();
    },
    btnDeleteParameter: function () {
        var that = this;
        var id = that.uiComponents.step5.gridReportParamters.getSelectionModel().getSelection()[0].get("Id");
        HostApi.ReportParameterDelete(id);
        that.refreshStoreParameters();
    },
    blurFilterExpression: function (ths, The, eOpts) {
        var data = {
            ReportConfigurationId: this.configuration.reportConfigurationId,
            FilterExpression: ths.getValue()
        };
        HostApi.ReportFilterExpressionSaveByObj(data);


    },

    recDlbClickFlatReportBlock: function (grid, record, item, index, e, eOpts) {

        var that = this;

        var selectedId = record.data.Id;

        var response = HostApi.ReportFlatBlockGet(selectedId);



        response.Id = selectedId;

        if (record.data.ReportBlockType) {

            var s = Ext.create(config.classDialogFlatReportColumn, {
                configuration: response,
                ReportConfigurationId: that.configuration.reportConfigurationId,
                onSave: function (configuration) {
                    var send = {
                        ReportConfigurationId: that.configuration.reportConfigurationId,
                        IsColumn: true,
                        ReportBlockId: selectedId
                    };
                    jQuery.extend(send, configuration);
                    HostApi.ReportFlatBlockColumnSaveByObj(send);
                    that.refreshStoreReportFlatBlocks();
                }
            });
            s.show();

        } else {

            var s = Ext.create(config.classDialogFlatReportRow, {
                configuration: response,
                ReportConfigurationId: that.configuration.reportConfigurationId,
                onSave: function (configuration) {
                    that.refreshStoreReportFlatBlocks();
                }
            });
            s.show();

        }

    },
    btnAddReportFlatBlockRow: function () {
        var that = this;
        var s = Ext.create(config.classDialogFlatReportRow, {
            ReportConfigurationId: that.configuration.reportConfigurationId,
            onSave: function (configuration) {
                var send = {
                    ReportConfigurationId: that.configuration.reportConfigurationId,
                    IsColumn: false
                };
                jQuery.extend(send, configuration);
                var send = { json: $.toJSON(send) };
                HostApi.ReportFlatBlockRowSaveByObj(send);
                that.refreshStoreReportFlatBlocks();
            }
        });
        s.show();
    },
    btnAddReportFlatBlockColumn: function () {
        var that = this;
        var s = Ext.create(config.classDialogFlatReportColumn, {
            ReportConfigurationId: that.configuration.reportConfigurationId,

            onSave: function (configuration) {
                var send = {
                    ReportConfigurationId: that.configuration.reportConfigurationId,
                    IsColumn: true
                };
                jQuery.extend(send, configuration);
                HostApi.ReportFlatBlockColumnSaveByObj(send);


                that.refreshStoreReportFlatBlocks();
            }
        });
        s.show();
    },
    btnDeleteReportFlatBlock: function () {
        var that = this;
        var id = that.uiComponents.step7.gridReportBlocks.getSelectionModel().getSelection()[0].get("Id");
        HostApi.ReportBlockDelete(id);
        that.refreshStoreReportFlatBlocks();

    },

    btnChooseSimpleDividerClass: function (partBlockConfig) {
        var that = this;
        var wndSelectClass = Ext.create(config.classDialogSelectClassForSimpleAddReportDelimiter, {
            onSelect: function (className) {
                var wndSimpleDilimiterAdd = Ext.create(className, {
                    configuration: partBlockConfig,
                    onSuccess: function (val) {
                        if (partBlockConfig.Type == 'RowDivide')
                            that.uiComponents.step8.treeRowDivide.refreshTree(val);
                        else if (partBlockConfig.Type == 'ColumnDivide')
                            that.uiComponents.step8.treeColumnDivide.refreshTree(val);
                        else throw "Unknown Divider Type"
                    }
                });
                wndSelectClass.close();
                wndSimpleDilimiterAdd.show();
            }
        });


        wndSelectClass.show();

    }
});