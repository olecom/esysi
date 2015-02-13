///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classFormChooseDictionaryRecord, {
    extend: 'Ext.panel.Panel',
    frame: false,
    buttons: null,

    /*New Fields*/
    idPrefix: null,
    comboRecordClass: null,
    storeRecordClass: null,
    windowDictionaryEdit: null,
    idDictionary: null,
    treeDict: null,
    value: null,
    onValueSelected: null,
    checkbox: false,
    predefinedValues: null,
    dataInputFormId: null,
    restrictionClassId: null,
    propertyId: null,


    initComponent: function (options) {
        Ext.apply(this, options || {});
        var that = this;
        this.buttons = new Array();
        this.idPrefix = Math.floor(Date.now());
        this.callParent();
        this.on(
            "afterrender",
            function () {
                that.refreshDictTree();
                var tree = $(that.getEl().dom).dynatree("getTree");
                that.setValue(that.value);
            },
            this);
    },
    getValue: function () {
        var prefixLength = this.idPrefix.length;
        if (this.checkbox) {
            var tree = $(this.getEl().dom).dynatree("getTree");
            var selNodes = tree.getSelectedNodes();
            var value = '';
            var selKeys = $.map(selNodes, function (node) {
                value = value + node.data.key.substring(prefixLength) + ';'
            });
            if (value[value.length - 1] == ';') value = value.substring(0, value.length - 1);
            return value;
        }
        return this.value.substring(prefixLength);
    },
    getTitle: function () {
        var tree = $(this.getEl().dom).dynatree("getTree");

        if (this.checkbox) {
            var selNodes = tree.getSelectedNodes();
            var title = "";
            var selKeys = $.map(selNodes, function (node1) {
                title += node1.data.title + ' ';
            });
            return title;
        } else {
            var node = tree.getNodeByKey(that.idPrefix + this.value.toString());
            return node.data.title;
        }

    },
    refreshDictTree: function (newValue) {
        var that = this;

        if (typeof newValue != 'undefined')
            this.value = newValue;
        var send = {
            IdDictionary: this.idDictionary,
            IdDictionaryElementsSelected: this.value,
            restrictionClassId: this.restrictionClassId,
            predefinedValues: (that.predefinedValues == null) ? null : $.toJSON(that.predefinedValues),
            dataInputFormId: that.dataInputFormId,
            propertyId: that.propertyId,
            prefix: that.idPrefix
        };
        var responseDictObjects = HostApi.DictionaryElementGetTreeByObj(send);


        if (this.treeDict == null) {
            this.treeDict = $(this.getEl().dom).dynatree({
                selectMode: that.selectMode || ((that.checkbox) ? 2 : 1),
                checkbox: that.checkbox,
                idPrefix: that.idPrefix,
                generateIds: true,
                onClick: function (node) {
                    that.value = node.data.index;
                },
                onDblClick: function (node) {
                    that.value = node.data.index;
                    that.onValueSelected();
                },
                children: []
            });
        }
        this.treeDict.dynatree("getRoot").removeChildren(true);
        this.treeDict.dynatree("getRoot").addChild(responseDictObjects);
        this.setValue(this.value);
    },
    addChildRecord: function (idParent) {
        that = this;
        Ext.MessageBox.prompt('Добавить корневую запись', 'Введите имя:',

            function (btn, text) {
                if (btn == "ok") {
                    var send = { IdParent: idParent, IdDictionary: that.type, Name: text, IdClass: null };
                    var id = HostApi.RecordCreate(send);
                    that.refreshDictTree(id);
                }
            }
        );
    },
    setValue: function (value) {
        if ((typeof this.value == 'undefined') || (this.value == null)) return;

        var that = this;
        var tree = $(that.getEl().dom).dynatree("getTree");
        that.value = value;

        if (typeof that.value.length == 'undefined') {
            tree.selectKey(that.idPrefix + that.value.toString());
            tree.activateKey(that.idPrefix + that.value.toString());
        } else if (that.value.length > 0) {
            $.each(that.value.split(';'), function (index, val) {
                tree.selectKey(that.idPrefix + val.trim().toString());
            });
        }


    }
});