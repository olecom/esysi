///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classWindowBindedFiltersList, {
    extend: 'Ext.window.Window',
    title: config.ttlBindedFilters,
    modal: true,
    layout: 'fit',
    storeBindedFilters: null,
    gridBindedFilterList: null,
    storeBindedFilters: null,

    initComponent: function (options) {
        Ext.apply(this, options || {});
        var that = this;

        this.buttons = [
            {
                text: config.ttlAdd,
                handler: function () {
                    that.btnCreateBindedFilter_CLick();
                }
            }, {
                text: config.ttlDelete,
                handler: function () {
                    that.btnDeleteSelectedFilter_Click();
                }
            }, {
                text: config.ttlEdit,
                handler: function () {
                    that.btnOpenSelectedBindedFilter_Click();
                }
            }, {
                text: config.ttlClose,
                handler: function () {
                    that.close();
                }
            }
        ];

        this.storeBindedFilters = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'Expression'],
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

        this.gridBindedFilterList = Ext.create('Ext.grid.Panel', {
            store: this.storeBindedFilters,
            height: 400,
            width: 410,
            columns: [
				{ dataIndex: 'Id', hidden: true },
				{ dataIndex: 'Name', text: config.ttlName, flex: 1 }
			],
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {

                    that.btnOpenSelectedBindedFilter_Click();
                    that.close();

                }
            }
        });

        this.items = [this.gridBindedFilterList];

        this.callParent();

        this.refreshBindedFilters();

    },

    refreshBindedFilters: function () {


        this.storeBindedFilters.loadRawData({ 'items': HostApi.ReportBindedFilterGetList() });

    },

    btnCreateBindedFilter_CLick: function () {

        var Name = 'New Binded Filter';
        var Id = HostApi.ReportBindedFilterSave(null, Name, "");
 
        var that = this;

        var wnd = Ext.create(config.classPanelBindedFilter, {
            configuration: {
                BindedFilterId: Id,
                BindedFilterName: Name,
                FilterExpression: ''
            },
            listeners: {
                close: function () {
                    that.refreshBindedFilters();
                }
            }
        });

        wnd.show();
    },

    btnDeleteSelectedFilter_Click: function () {

        var id = this.gridBindedFilterList.getSelectionModel().getSelection()[0].get("Id");
        HostApi.ReportBindedFilterDelete(id);
 

        var ind = this.storeBindedFilters.find('Id', id);
        this.storeBindedFilters.removeAt(ind);
        this.gridBindedFilterList.getView().refresh();
   

    },

    btnOpenSelectedBindedFilter_Click: function () {

        var that = this;

        var record = this.gridBindedFilterList.getSelectionModel().getSelection()[0];

        var wnd = Ext.create(config.classPanelBindedFilter, {
            configuration: {
                BindedFilterId: record.data.Id,
                BindedFilterName: record.data.Name,
                FilterExpression: record.data.Expression
            },
            listeners: {
                close: function () {
                    that.refreshBindedFilters();
                }
            }
        });

        wnd.show();
    }

});