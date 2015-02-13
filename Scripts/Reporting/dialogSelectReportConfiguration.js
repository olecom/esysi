///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogSelectReportConfiguration, {

    extend: 'Ext.window.Window',
    title: config.ttlChooseReportConfiguration,
    modal: true,
    layout: 'fit',
    onSelect: null,
    items: null,
    buttons: null,
    uiComponents: {
        treePanel: null,
        treeReports: null
    },
    configReport: false,

    constructor: function (options) {
        var that = this;

        this.items = new Array();
        this.buttons = new Array();


        Ext.apply(this, options || {});

        if (this.configReport) {
            this.buttons.push({
                text: config.ttlDuplcate,
                handler: function () {
                    var node = that.uiComponents.treeReports.dynatree("getActiveNode");
                    if (node) {
                        HostApi.ReportConfigurationDuplicate(node.data.index);

                        that.refreshTree();
                    }
                }
            }, {
                text: config.ttlEdit,
                handler: function () {
                    var node = that.uiComponents.treeReports.dynatree("getActiveNode");
                    if (node) {
                        that.onSelect(node.data.index);
                        that.close();
                    }
                }
            }, {
                text: config.ttlDelete,
                handler: function () {

                    var node = that.uiComponents.treeReports.dynatree("getActiveNode");
                    if (!node) return;
                    HostApi.ReportConfigurationDelete(node.data.index);
                    node.remove();

                }
            }, {
                text: config.ttlCreateConfiguration,
                handler: function () {
                    this.windowReportConfiguration = Ext.create(config.classWindowReportConfiguration, {});
                    this.windowReportConfiguration.show();
                }
            });
        };


        var containerId = 'dialog_selectReportConfiguration';
        this.treePanel = Ext.create('Ext.panel.Panel', {
            scroll: true,
            overflowY: 'scroll',
            overflowY: 'scroll',
            width: 400,
            height: 400,
            html: ('<div id="%id%"></div>').replace('%id%', containerId)
        });

        this.items.push(
            this.treePanel
        );

        this.callParent(arguments);

        this.treePanel.on('render', function () {
            //var el = that.treePanel.getId();

            that.uiComponents.treeReports = $('#' + containerId).dynatree({
                generateIds: true,
                onDblClick: function (node) {
                    that.onSelect(node.data.index);
                    that.close();
                },
                children: []
            });

            var treeData = HostApi.ReportGetTree();

            that.uiComponents.treeReports.dynatree("getRoot").removeChildren(true);
            that.uiComponents.treeReports.dynatree("getRoot").addChild(treeData);
        });
    },
    refreshTree: function () {
        var treeData = HostApi.ReportGetTree();
        this.uiComponents.treeReports.dynatree("getRoot").removeChildren(true);
        this.uiComponents.treeReports.dynatree("getRoot").addChild(treeData);
    }
});