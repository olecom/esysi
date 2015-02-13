///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classPanelBindedFilter, {
    extend: 'Ext.window.Window',
    frame: false,
    border: false,
    maximizable: true,
    maximized: true,
    constrain: true,
    title: config.ttlBindedFilters,
    height: 600,
    width: 800,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    configuration: {
        BindedFilterId: null,
        BindedFilterName: null,
        FilterExpression: null
    },
    parameters: [],
    uiComponents: {
        txtBindedFilterName: null,
        txtFilterExpression: null
    },

    initComponent: function (options) {
        Ext.apply(this, options || {});

        var that = this;

        this.renderTo = application.pnlSpace.getEl().dom;

        var tm = new Ext.util.TextMetrics();
        var w = tm.getWidth(config.ttlName + ":");

        this.uiComponents.txtBindedFilterName = Ext.create('Ext.form.field.Text', {
            name: 'Name',
            fieldLabel: config.ttlName,
            labelWidth: w,
            allowBlank: false,
            value: this.configuration.BindedFilterName || ''
        });

        this.uiComponents.txtFilterExpression = Ext.create('Ext.form.field.TextArea', {
            name: 'Expression',
            fieldLabel: config.ttlFilterExpression,
            labelAlign: "top",
            margin: '0 0 0 3',
            allowBlank: false,
            columnWidth: 1,
            value: this.configuration.FilterExpression || ''
        });

        this.storeBindedFilterParameters = Ext.create('Ext.data.Store', {
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

        this.gridBindedFilterParameters = Ext.create('Ext.grid.Panel', {
            store: this.storeBindedFilterParameters,
            columns: [
				{ text: 'Id', dataIndex: 'Id', hidden: true },
				{ text: config.ttlType, dataIndex: 'Name', flex: 1 }
			],
            flex: 1,
            border: false,
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {
                    var id = that.gridBindedFilterParameters.getSelectionModel().getSelection()[0].get("Id");


                    var parameter = HostApi.ReportParameterGet(id);

                    $.extend(parameter, { BindedFilterId: that.configuration.BindedFilterId });

                    var s = Ext.create(config.classDialogReportParameter, {
                        configuration: parameter,
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
                    this.gridBindedFilterParameters,
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
                                        BindedFilterId: that.configuration.BindedFilterId
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


                                var id = that.gridBindedFilterParameters.getSelectionModel().getSelection()[0].get("Id");
                                HostApi.ReportParameterDelete(id);
                                that.refreshStoreParameters();

                            }
                        }, {
                            xtype: 'button',
                            text: '...',
                            handler: function () {

                                var id = that.gridBindedFilterParameters.getSelectionModel().getSelection()[0].get("Id");
                                var parameter = HostApi.ReportParameterGet(id);

                                $.extend(parameter, { BindedFilterId: that.configuration.BindedFilterId });

                                var s = Ext.create(config.classDialogReportParameter, {
                                    configuration: parameter,
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
                border: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                flex: 1,
                items: [
                    this.uiComponents.txtBindedFilterName,
                    this.uiComponents.txtFilterExpression
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
        HostApi.ReportBindedFilterSaveByObj(configuration);
        this.close();
    },
    refreshStoreParameters: function () {
        var items = HostApi.ReportBindedFilterParameterGetList(this.configuration.BindedFilterId);

        this.storeBindedFilterParameters.loadRawData({ 'items': items });
    }
});