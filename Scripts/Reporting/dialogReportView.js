///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogReportView, {
    extend: 'Ext.window.Window',
    title: 'Просмотр отчета',
    modal: false,
    maximizable: true,
    maximized: true,
    layout: 'fit',
    reportOrderId: null,
    panelReport: null,
    constrain: true,
    items: null,
    buttons: null,
    height: 600,
    width: 800,

    constructor: function (options) {

        var that = this;

        Ext.apply(this, options || {});

        this.renderTo = application.pnlSpace.getEl().dom;

        var html = HostApi.ReportGet(this.reportOrderId);

        this.panelReport = Ext.create('Ext.panel.Panel', {
            autoScroll: true,
            html: html,
            overflowY: 'scroll',
            overflowX: 'scroll'
        });

        this.items = [
            this.panelReport
        ];

        this.buttons = [{
            xtype: 'button',
            text: config.ttlOk,
            handler: function () {
                that.close();
            }
        }];

        this.callParent(arguments);
    }
});