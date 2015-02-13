///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classFormChooseDictionaryFilterRecords, {
    extend: 'Ext.panel.Panel',
    /*Panel*/
    frame: false,
    width: 400,
    height: 400,


    /*New Fields*/
    comboRecordClass: null,
    storeRecordClass: null,
    windowDictionaryEdit: null,
    idDictionary: null,
    treeDict: null,
    lastSelectedIndex: null,
    value: null,
    onValueSelected: null,

    windowNamePrefix: 'wndDictionary',

    initComponent: function (options) {
        Ext.apply(this, options || {});
        var that = this;
        this.callParent();
        this.on(
            "afterrender",
            function () {
                that.refreshDictTree();
                var tree = $(that.getEl().dom).dynatree("getTree");
                if ((typeof that.value != 'undefined')
                    && (that.value != null)) {

                    if (that.value.length > 0) {
                        $.each(that.value.split(';'), function (index, val) {
                            tree.selectKey(val.trim());
                        });
                    }
                }
            },
            this);
    },
    getValue: function () {
        var that = this;
        var tree = $(that.getEl().dom).dynatree("getTree");
        var selNodes = tree.getSelectedNodes();
        var value = '';
        var selKeys = $.map(selNodes, function (node) {
            value = value + node.data.key + '; '
        });
        return value;
    },
    getTitle: function () {
        var that = this;
        var tree = $(that.getEl().dom).dynatree("getTree");
        var selNodes = tree.getSelectedNodes();
        var title = '';
        var selKeys = $.map(selNodes, function (node) {
            title = title + node.data.title + '; '
        });
        return title;
    },
    refreshDictTree: function () {
        var that = this;
        var responseDictObjects = HostApi.RecordOfDictionaryGetTree(this.idDictionary, this.value);   

        if (this.treeDict == null) {
            this.treeDict = $(that.getEl().dom).dynatree({
                selectMode: 3,
                checkbox: true,
                generateIds: true,
                onClick: function (node) {
                    that.lastSelectedIndex = node.data.index;
                },
                onDblClick: function (node) {
                    that.lastSelectedIndex = node.data.index;
                    that.onValueSelected();
                },
                children: []
            });
        }
        this.treeDict.dynatree("getRoot").removeChildren(true);
        this.treeDict.dynatree("getRoot").addChild(responseDictObjects);
    }
});