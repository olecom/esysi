///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classPanelReportParamList, {
    extend: 'Ext.panel.Panel',
    modal: true,
    reportBlockId: null,
    reportConfigurationId: null,
    IncludeFilters: null,
    IncludeAliases: null,
    isHiddenBtnAddParam: false,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    storeParameters: null,
    storeParameterTypes: null,

    gridParameters: null,
    cmdParameterTypes: null,
    btnAddParameter: null,

    initComponent: function (options) {
        Ext.apply(this, options || {});
        var that = this;

        this.btnAddParameter = Ext.create('Ext.button.Button', {
            text: '+',
            handler: function () { that.addGlobalParameter(); },
            hidden: this.isHiddenBtnAddParam
        });



        this.storeParameterTypes = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: {
                'items': [
                    { Id: "all", Name: 'Все' },
                    { Id: "block", Name: 'Блочные параметры' },
                    { Id: "filter", Name: 'Фильтры' },
                    { Id: 'global', Name: 'Глобальные' },
                    { Id: 'alias', Name: 'Алиасы' }
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

        if (this.reportBlockId == null) {
            var id = this.storeParameterTypes.find('Id', 'block');
            this.storeParameterTypes.removeAt(id);
        }

        this.storeParameters = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'Destination'],
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


        this.cmdParameterTypes = Ext.create('Ext.form.field.ComboBox', {
            width: 150,
            value: 'all',
            hideLabel: false,
            store: this.storeParameterTypes,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            listeners: {
                change: function (thisCombo, newValue, oldValue, eOpts) {
                    that.filterParameterList();
                }
            }
        });

        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        this.gridParameters = Ext.create('Ext.grid.Panel', {
            flex: 1,
            store: this.storeParameters,
            border: false,
            columns: [
				{ text: 'Id', dataIndex: 'Id', hidden: true },
				{ text: 'Параметр', dataIndex: 'Name', flex: 1 }
			],
            selModel: {
                selType: 'cellmodel'
            },
            plugins: [cellEditing],
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {

                    var id = that.gridParameters.getSelectionModel().getSelection()[0].get("Id");
                    var paramData = HostApi.ReportParameterGet(id);

                    var s = Ext.create(config.classDialogReportParameter, {
                        configuration: paramData,
                        onSave: function (configuration) {
                            HostApi.ReportParameterSaveByObj(configuration);
                            that.refreshParameterList();
                        }
                    });
                    s.show();

                }
            }
        });

        this.items = [
            {
                xtype: 'panel',
                layout: 'column',
                border: false,
                items: [
                    this.cmdParameterTypes,
                    this.btnAddParameter
                ]
            },
            this.gridParameters
        ];


        this.callParent();

        that.refreshParameterList();
    },
    addGlobalParameter: function () {
        var that = this;
        var s = Ext.create(config.classDialogReportParameter, {
            configuration: {
                reportConfigurationId: that.reportConfigurationId
            },
            onSave: function (configuration) {
                HostApi.ReportParameterSaveByObj(configuration);
                that.refreshParameterList();
                that.filterParameterList();
            }
        });
        s.show();
    },
    refreshParameterList: function () {
        var data= {
                ReportConfigurationId: this.reportConfigurationId,
                IncludeFilters: this.IncludeFilters,
                IncludeAliases: this.IncludeAliases,
                ForReportBlocksId: this.reportBlockId
            };
        var items = HostApi.ReportParameterCalculatingGetListByObj(data);
        this.storeParameters.loadRawData({ 'items': items });
    },
    filterParameterList: function () {
        this.storeParameters.clearFilter(false);
        if (this.cmdParameterTypes.getValue() != 'all') {
            var dest = this.cmdParameterTypes.getValue();
            this.storeParameters.filter([
                { filterFn: function (item) { return item.get("Destination") == dest; } }
            ]);
        }
    }
});