///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classPanelReportBlockAlgorithm, {
    extend: 'Ext.window.Window',
    title: config.ttlPredefinedAlgorithms,
    frame: false,
    border: false,
    maximizable: true,
    maximized: true,
    constrain: true,
    height: 600,
    width: 800,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    configuration: {
        ReportBlockAlgorithmId: null,
        ReportBlockAlgorithmName: null
    },
    parameters: [],
    uiComponents: {
        txtReportBlockAlgorithmName: null

    },
    treeReportBlock: null,

    initComponent: function (options) {
        Ext.apply(this, options || {});

        var that = this;

        this.renderTo = application.pnlSpace.getEl().dom;

        var tm = new Ext.util.TextMetrics();
        var w = tm.getWidth(config.ttlName + ":");

        this.uiComponents.txtReportBlockAlgorithmName = Ext.create('Ext.form.field.Text', {
            name: 'Name',
            fieldLabel: config.ttlName,
            labelWidth: w,
            allowBlank: false,
            value: this.configuration.ReportBlockAlgorithmName || ''
        });

        var btnRowDivideAddRoot = Ext.create('Ext.button.Button', {
            text: config.ttlAddRoot,
            handler: function () {

                var wnd = Ext.create("ManAcc.Reporting.WindowCrossReportBlock", {
                    Type: "Divide",
                    ParentId: null,
                    AlgorithmOwnerId: that.configuration.ReportBlockAlgorithmId,
                    onSave: function (val) {
                        that.treeReportBlock.refreshTree(val);
                    }
                });
                wnd.show();
            }
        });
        var btnRowDivideAdd = Ext.create('Ext.button.Button', {
            text: config.ttlAddChildNode,
            handler: function () {
                var selectedId = that.treeReportBlock.getValue();
                var wnd = Ext.create("ManAcc.Reporting.WindowCrossReportBlock", {

                    Type: "Divide",
                    ParentId: selectedId,
                    AlgorithmOwnerId: that.configuration.ReportBlockAlgorithmId,

                    onSave: function (val) {
                        that.treeReportBlock.refreshTree(val);
                    }
                });
                wnd.show();
            }
        });
        var btnRowDivideDel = Ext.create('Ext.button.Button', {
            text: config.ttlDelete,
            handler: function () {
                var id = that.treeReportBlock.getValue();
                if (that.deleteReportBlock(id))
                    that.treeReportBlock.refreshTree();
            }
        });
        this.treeReportBlock = Ext.create(config.classPanelTreeReportDividers, {
            title: 'Отчетные блоки',
            autoScroll: true,
            flex: 1,
            ReportBlockAlgorithmId: that.configuration.ReportBlockAlgorithmId,
            ReportBlockType: 'Divide',
            checkbox: false,
            onValueSelected: function () {
                var value = this.getValue();
                var title = this.getTitle();
                var wnd = Ext.create("ManAcc.Reporting.WindowCrossReportBlock", {
                    idCrossReportBlock: value,

                    AlgorithmOwnerId: that.configuration.ReportBlockAlgorithmId,
                    onSave: function (val) {
                        that.treeReportBlock.refreshTree(val);
                    }
                });
                wnd.show();
            },
            buttons: [
                btnRowDivideAddRoot,
                btnRowDivideAdd,
                btnRowDivideDel
            ]
        });

        this.storeReportBlockAlgorithmParameters = Ext.create('Ext.data.Store', {
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

        this.gridReportBlockAlgorithmParameters = Ext.create('Ext.grid.Panel', {
            store: this.storeReportBlockAlgorithmParameters,
            columns: [
				{ text: 'Id', dataIndex: 'Id', hidden: true },
				{ text: config.ttlParameterName, dataIndex: 'Name', flex: 1 }
			],
            flex: 1,
            margin: '0 5 0 0',
            border: false,
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {
                    var id = that.gridReportBlockAlgorithmParameters.getSelectionModel().getSelection()[0].get("Id");
                    var response = HostApi.ReportParameterGet(id);


                    $.extend(response, { AlgorithmOwnerId: that.configuration.ReportBlockAlgorithmId });

                    var s = Ext.create(config.classDialogReportParameter, {
                        configuration: response,
                        onSave: function (configuration) {
                            HostApi.ReportParameterSaveByObj(configuration);
                            that.refreshStoreParameters();
                        }
                    });
                    s.show();
                }
            }
        });

        this.buttons = [{
            xtype: 'button',
            text: 'Ok',
            handler: function () {
                that.btnOk_Click();
            }
        }];

        this.items = [
            {
                width: 150,
                xtype: 'panel',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                items: [
                    this.gridReportBlockAlgorithmParameters,
                    {
                        xtype: 'panel',
                        layout: 'column',
                        border: false,
                        bodyStyle: 'background:transparent;',
                        items: [{
                            xtype: 'button',
                            text: '+',
                            handler: function () {


                                var s = Ext.create(config.classDialogReportParameter, {
                                    configuration: {
                                        AlgorithmCalculationId: that.configuration.ReportBlockAlgorithmId
                                    },
                                    onSave: function (configuration) {

                                        HostApi.ReportParameterSaveByObj(configuration);

                                        that.refreshStoreParameters();
                                    }
                                });
                                s.show();

                            }
                        }, {
                            xtype: 'button',
                            text: '-',
                            handler: function () {


                                var id = that.gridReportBlockAlgorithmParameters.getSelectionModel().getSelection()[0].get("Id");
                                HostApi.ReportParameterDelete(id);
                                that.refreshStoreParameters();

                            }
                        }, {
                            xtype: 'button',
                            text: '...',
                            handler: function () {

                                var id = that.gridReportBlockAlgorithmParameters.getSelectionModel().getSelection()[0].get("Id");
                                var response = HostApi.ReportParameterGet(id);

                                $.extend(response, { ReportBlockAlgorithmId: that.configuration.ReportBlockAlgorithmId });

                                var s = Ext.create(config.classDialogReportParameter, {
                                    configuration: response,
                                    onSave: function (configuration) {
                                        HostApi.ReportParameterSaveByObj(configuration);
                                        that.refreshStoreParameters();
                                    }
                                });
                                s.show();
                            }
                        }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                flex: 1,
                items: [
                    this.uiComponents.txtReportBlockAlgorithmName,
                    this.treeReportBlock
                ]
            }
        ];

        this.callParent();

        this.refreshStoreParameters();

    },
    getValues: function () {

        var value = this.configuration

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
    btnOk_Click: function () {
        var configuration = this.getValues();
        HostApi.ReportBlockAlgorithmSaveByObj(configuration);

        this.close();
    },
    refreshStoreParameters: function () {

        var response = HostApi.ReportBlockAlgorithmParameterGetList(this.configuration.ReportBlockAlgorithmId);
        this.storeReportBlockAlgorithmParameters.loadRawData({ 'items': response });
    },
    deleteReportBlock: function (id) {
        HostApi.ReportBlockDelete(id);
        return true;
    }
});