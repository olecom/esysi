///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classWindowReportBlockAlgorithmsList, {
    extend: 'Ext.window.Window',
    title: config.ttlPredefinedAlgorithms,
    modal: true,
    layout: 'fit',
    storeReportBlockAlgorithms: null,
    gridReportBlockAlgorithmList: null,
    storeReportBlockAlgorithms: null,

    initComponent: function (options) {
        Ext.apply(this, options || {});
        var that = this;

        this.buttons = [
            {
                text: config.ttlAdd,
                handler: function () {
                    that.btnCreateReportBlockAlgorithm_CLick();
                }
            }, {
                text: config.ttlDelete,
                handler: function () {
                    that.btnDeleteSelectedReportBlockAlgorithm_Click();
                }
            }, {
                text: config.ttlEdit,
                handler: function () {
                    that.btnOpenSelectedReportBlockAlgorithm_Click();
                }
            }, {
                text: config.ttlClose,
                handler: function () {
                    that.close();
                }
            }
        ];

        this.storeReportBlockAlgorithms = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'Expression'],
            data: { 'items': [] },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        this.gridReportBlockAlgorithmList = Ext.create('Ext.grid.Panel', {
            store: this.storeReportBlockAlgorithms,
            height: 400,
            width: 410,
            columns: [
				{ dataIndex: 'Id', hidden: true },
				{ dataIndex: 'Name', text: config.ttlName, flex: 1 }
			],
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {

                    that.btnOpenSelectedReportBlockAlgorithm_Click();
                    that.close();
                }
            }
        });

        this.items = [this.gridReportBlockAlgorithmList];

        this.callParent();

        this.refreshReportBlockAlgorithms();

    },

    refreshReportBlockAlgorithms: function () {

        var items = HostApi.ReportBlockAlgorithmGetList();

        this.storeReportBlockAlgorithms.loadRawData({ 'items': items });

    },

    btnCreateReportBlockAlgorithm_CLick: function () {

        var Name = 'New Binded Algorithm';

        var Id = HostApi.ReportBlockAlgorithmSave(null,Name);

        var that = this;

        var wnd = Ext.create(config.classPanelReportBlockAlgorithm, {
            configuration: {
                ReportBlockAlgorithmId: Id,
                ReportBlockAlgorithmName: Name
            },
            listeners: {
                close: function () {
                    that.refreshReportBlockAlgorithms();
                }
            }
        });

        wnd.show();
    },

    btnDeleteSelectedReportBlockAlgorithm_Click: function () {
        try
        {
            var id = this.gridReportBlockAlgorithmList.getSelectionModel().getSelection()[0].data.Id;
            HostApi.ReportBlockAlgorithmDelete(id);
  
            var ind = this.storeReportBlockAlgorithms.find('Id', id);
            this.storeReportBlockAlgorithms.removeAt(ind);
            this.gridReportBlockAlgorithmList.getView().refresh();
        }
        catch (Ex) {
            Ext.Msg.show({
                title: "Error",
                msg: Ex,
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }

    },

    btnOpenSelectedReportBlockAlgorithm_Click: function () {

        var that = this;

        var record = this.gridReportBlockAlgorithmList.getSelectionModel().getSelection()[0];

        var wnd = Ext.create(config.classPanelReportBlockAlgorithm, {
            configuration: {
                ReportBlockAlgorithmId: record.data.Id,
                ReportBlockAlgorithmName: record.data.Name
            },
            listeners: {
                close: function () {
                    that.refreshReportBlockAlgorithms();
                }
            }
        });

        wnd.show();
    }

});