///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogReportQueue, {
    extend: 'Ext.window.Window',
    title: config.ttlReportQueue,
    modal: false,
    maximized: true,
    maximizable: true,
    constrain: true,
    height: 600,
    width: 800,
    items: null,
    buttons: null,
    grid: null,
    timerRefresher: null,
    layout: 'fit',
    constructor: function (options) {

        var that = this;

        Ext.apply(this, options || {});

        this.renderTo = application.pnlSpace.getEl().dom;

        this.storeOrderQueue = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Progress', 'Name'],
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

        this.timerRefresher = setInterval(function () {
            that.refreshStoreQueue();
        }, 10000);

        that.refreshStoreQueue();

        this.grid = Ext.create('Ext.grid.Panel', {
            scroll: true,
            
            store: this.storeOrderQueue,
            columns: [
				{ text: 'Id', dataIndex: 'Id', hidden: true },
				{ text: config.ttlProgress, dataIndex: 'Progress' },
				{ text: config.ttlReport, dataIndex: 'Name', flex: 1 }
			],
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {
                    var r = Ext.create(config.classDialogReportView, {
                        reportOrderId: record.data.Id
                    });
                    r.show();
                }
            }
        });


        this.items = [
            this.grid
        ];

        this.buttons = [{
            xtype: 'button',
            text: config.ttlRefreshReport,
            handler: function () {
                var id = that.grid.getSelectionModel().getSelection()[0].get("Id");
                HostApi.ReportOrderRefresh(id);
                that.refreshStoreQueue();

            }
        }, {
            xtype: 'button',
            text: config.ttlDelete,
            handler: function () {
                var id = that.grid.getSelectionModel().getSelection()[0].get("Id");
                HostApi.ReportOrderDelete(id);
                that.refreshStoreQueue();

            }
        }, {
            xtype: 'button',
            text: config.ttlOk,
            handler: function () {
                that.close();
            }
        }];

        this.callParent(arguments);

        this.on('destroy', function () {
            clearInterval(that.timerRefresher);
        });


        $(application).on("ReportOrderQueueUpdated", function () {
            that.refreshStoreQueue();
        });

    },
    refreshStoreQueue: function () {
        var items = HostApi.ReportOrderGetList();
        this.storeOrderQueue.loadRawData({ 'items': items });

    }
});