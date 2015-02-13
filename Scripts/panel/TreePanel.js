Ext.define(config.classFormChooseRecord, {
    extend: 'Ext.panel.Panel',
	alias: 'widget.choosepanel',
    frame: false,
    buttons: null,
	
	

    initComponent: function (options) {
        Ext.apply(this, options || {});
        var that = this;
        this.buttons = new Array();

        
        this.on(
            "afterrender",
            function () {
                that.refreshTree();
                var tree = $(that.getEl().dom).dynatree("getTree");
                if ((typeof that.value != 'undefined')
                    && (that.value != null)) {

                    if (that.value.length > 0) {
                        $.each(that.value.split(';'), function (index, val) {
                            tree.selectKey(val.trim());
                        });
                    }

                }
                tree.selectKey(that.value);
                tree.activateKey(that.value);
            },
            this);

		this.callParent();


    },
    getValue: function () {

        if (this.checkbox) {
            var tree = $(this.getEl().dom).dynatree("getTree");
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
        var tree = $(this.getEl().dom).dynatree("getTree");

        if (this.checkbox) {

            var selNodes = tree.getSelectedNodes();
            var title = "";
            var selKeys = $.map(selNodes, function (node1) {
                title += node1.data.title + ';';
            });
            return title;
        } else {
            var node = tree.getNodeByKey(this.value);
            return node.data.title;
        }

    },
    refreshTree: function (newValue) {	
	
        var that = this;

        if (typeof newValue != 'undefined')
            this.value = newValue;

        var responseObjects = this.getTreeData();
		
        if (this.tree == null) {
            this.tree = $(this.getEl().dom).dynatree({
                selectMode: ((that.checkbox) ? 2 : 1),
                checkbox: that.checkbox,
                generateIds: true,
                onClick: function (node) {
                    that.value = node.data.index;
                },
                onDblClick: function (node) {
                    that.value = node.data.index;
                    that.onValueSelected(that);
                },
                children: []
            });
        }
        this.tree.dynatree("getRoot").removeChildren(true);
        this.tree.dynatree("getRoot").addChild(responseObjects);
        this.setValue(this.value);
    },
	
	getTreeData: function() {
	
	},
	
    setValue: function (value) {
        if (value == null) return;

        var that = this;
        var tree = $(that.getEl().dom).dynatree("getTree");
        that.value = value;

        tree.selectKey(that.value.toString());
        tree.activateKey(that.value.toString());
    }

});