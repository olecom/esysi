///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogChooseCrossReportBlock, {

    extend: 'Ext.window.Window',
    title: "Выбрать блок",
    modal: true,

    onSelect: null,
    items: null,
    buttons: null,

    height: 400,
    width: 600, 
    treeReportDividers: null,
    layout: 'fit',
    SelectedReportBlockId: null,
    ReportConfigurationId: null,
    TreeType: null,

    constructor: function (options) {
        var that = this;

        this.items = new Array();
        this.buttons = new Array();


        Ext.apply(this, options || {});

        this.treeReportDividers = Ext.create(config.classPanelTreeReportDividers, {
            title: config.ttlTreeRowDivide,
            autoScroll: true,
            
            value: that.SelectedReportBlockId,
            ReportConfigurationId: that.ReportConfigurationId,
            ReportBlockType: that.TreeType,
            checkbox: false,
            onValueSelected: function () {
                var value = this.getValue();
                var title = this.getTitle();
                
                that.onSelect(value, title);
            },
            buttons: []
        });

        this.items.push(
            this.treeReportDividers
        );

        this.callParent(arguments);
    }
});