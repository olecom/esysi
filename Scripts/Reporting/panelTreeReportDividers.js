///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classPanelTreeReportDividers, {
    extend: 'Ext.panel.Panel',

    frame: false,
    html: '<div id="%id%"></div>',

    tree: null,
    containerId: null,
    value: null,
    onValueSelected: null,
    checkbox: false,
    ReportConfigurationId: null,
    ReportBlockAlgorithmId: null,
    ReportBlockType: null,
    DragOver: null,


    initComponent: function (options) {
        Ext.apply(this, options || {});
        var that = this;
        this.containerId = 'div' + new Date().getTime();
        this.html = this.html.replace('%id%', this.containerId);



        this.callParent();
        this.on(
            "render",
            function () {
                that.refreshTree();
                that.selectCurrentValue();


            },
            this);
    },
    getValue: function () {

        if (this.checkbox) {
            var tree = $('#' + this.containerId).dynatree("getTree");
            var selNodes = tree.getSelectedNodes();
            var value = '';
            var selKeys = $.map(selNodes, function (node) {
                value = value + node.data.key + ';'
            });
            return value;
        }
        return this.value;
    },
    getTitle: function () {
        var tree = $('#' + this.containerId).dynatree("getTree");

        if (this.checkbox) {

            var selNodes = tree.getSelectedNodes();
            var title = "";
            var selKeys = $.map(selNodes, function (node1) {
                title += node1.data.title + ' ';
            });
            return title;
        } else {
            var node = tree.getNodeByKey(this.value);
            return node.data.title;
        }

    },
    refreshTree: function (newValue) {
        var that = this;

        this.value = newValue;
        var data = {
            ReportBlockAlgorithmId: this.ReportBlockAlgorithmId,
            ReportConfigurationId: this.ReportConfigurationId,
            ReportBlockType: this.ReportBlockType
        };

        var responseTreeObjects = HostApi.ReportCrossBlockGetTreeByObj(data);

        if (this.tree == null) {
            this.tree = $('#' + this.containerId).dynatree({
                debugLevel: 0,
                selectMode: ((that.checkbox) ? 2 : 1),
                checkbox: that.checkbox,
                generateIds: true,
                onClick: function (node) {
                    that.value = node.data.index;
                },
                onDblClick: function (node) {
                    that.value = node.data.index;
                    that.onValueSelected();
                },
                children: [],
                dnd: {
                    preventVoidMoves: false,
                    onDragStart: function (node) {
                        that.DragOver = false;
                        return true;
                    },
                    onDragEnter: function (node, sourceNode) {
                        return 'over';
                    },
                    onDrop: function (node, sourceNode, hitMode, ui, draggable) {
                        that.DragOver = true;
                        if (sourceNode.data.index != node.data.index) {
                            try {
                                HostApi.ReportCrossBlockPutUnderReportBlock(sourceNode.data.index, node.data.index);
                            }
                            catch (ex) { return false; }
                        }

                    },
                    onDragStop: function (sourceNode) {
                        if (!that.DragOver) {
                            HostApi.ReportCrossBlockPutUnderReportBlock(sourceNode.data.index);
                        }
                        that.refreshTree();
                    }
                }
            });
        }


        this.tree.dynatree("getRoot").removeChildren(true);
        this.tree.dynatree("getRoot").addChild(responseTreeObjects);
        this.selectCurrentValue();

    },
    selectCurrentValue: function () {
        var tree = $('#' + this.containerId).dynatree("getTree");
        if ((typeof this.value != 'undefined')
                    && (this.value != null)) {
            if (this.value.length > 0) {
                $.each(this.value.split(';'), function (index, val) {
                    tree.selectKey(val.trim());
                    tree.activateKey(val.trim());
                });
            } else {
                tree.selectKey(this.value);
                tree.activateKey(this.value);
            }
        }


    }
});