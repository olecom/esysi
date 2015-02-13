///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define("ManAcc.Dictionaries.WindowEdit", {

    dictionaryName: '',

    comboDictionaryElementClass: null,
    storeDictionaryElementClass: null,
    storePointRatios: null,
    windowDictionaryEdit: null,
    idDictionary: null,

    treePanel: null,
    treeDict: null,
    DragOver: null,

    constructor: function (options) {

        var that = this;

        Ext.apply(this, options || {});

        var idWindow = 'windowDictionaryEdit_' + this.idDictionary;
        if (typeof (Ext.getCmp(idWindow)) != "undefined") {
            Ext.getCmp(idWindow).toFront();
            return false;
        }

        this.treePanel = Ext.create('Ext.panel.Panel', {
            title: config.ttlDictionaryElement,
            flex: 1,
            overlapHeader: false,
            padding: '25 0 0 0',
            frame: true,
            border: false,
            overflowY: 'scroll',
            overflowX: 'scroll'
        });

        this.treePanel.on(
            "afterrender",
            function () {
                that.refreshDictTree();
            },
            this);

        this.storePointRatios = Ext.create('Ext.data.Store', {
            fields: ['Id', 'TypeName', 'TypeId', 'Value', 'ValueId', 'Code', 'DictionaryId'],
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

        this.gridRatios = Ext.create('Ext.grid.Panel', {
            flex: 1,
            overlapHeader: false,
            border: false,
            frame: true,
            overflowY: 'scroll',
            overflowX: 'scroll',
            title: config.ttlRatios,
            store: this.storePointRatios,
            columns: [
                { text: 'Id', dataIndex: 'Id', hidden: true },
                { text: config.ttlType, dataIndex: 'TypeName', width: 150 },
                { text: config.ttlValue, dataIndex: 'Value', flex: 1 }
            ],

            listeners: {
                itemdblclick: function (grid, DictionaryElement, item, index, e, eOpts) {

                    var value = DictionaryElement.data.Value;
                    var code = DictionaryElement.data.Code;
                    if (DictionaryElement.data.Code == 'dict') {
                        value = DictionaryElement.data.ValueId;
                        code = DictionaryElement.data.DictionaryId;
                    }
                    if (DictionaryElement.data.Code == 'DictionaryElementclass') {
                        value = DictionaryElement.data.ValueId;
                    }
                    var IdRatio = DictionaryElement.data.Id;

                    var choose = Ext.create(config.classFormRatioValue, {
                        value: value,
                        type: code,
                        methodOnSave: function (value) {
                            that.updateRatio(IdRatio, value);
                        }
                    });
                }
            }
        });

        this.storeDictionaryElementClass = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: [],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        this.comboDictionaryElementClass = Ext.create('Ext.form.ComboBox', {
            store: that.storeDictionaryElementClass,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            emptyText: ".. Класс ..",
            editable: false,
            hidden: true
        });


        var storeRatioType = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'isDictionary', 'idDictionary', 'Code'],
            data: HostApi.RatioTypeGetList()
        });

        var comboTypesRatios = Ext.create('Ext.form.ComboBox', {
            store: storeRatioType,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            emptyText: ".. Свойство ..",
            editable: false
        });

        this.windowDictionaryEdit = Ext.create('Ext.window.Window', {
            id: idWindow,
            title: config.ttlDict + ' ' + this.dictionaryName,
            bodyPadding: 10,
            resizable: true,

            maximizable: true,
            maximized: true,
            renderTo: application.pnlSpace.getEl().dom,
            constrain: true,
            height: 600,
            width: 800,

            margin: 0,
            padding: 0,

            autoScroll: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    flex: 1,
                    bodyStyle: 'background:transparent;',

                    border: false,
                    items: [
                        that.treePanel,
                        {
                            xtype: 'panel',
                            layout: 'column',
                            border: false,
                            bodyStyle: 'background:transparent;',

                            items: [
                                that.comboDictionaryElementClass,
                                {
                                    xtype: 'button',
                                    text: config.ttlAddRoot,
                                    handler: function () {
                                        that.addRootDictionaryElement();
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: config.ttlAddChildNode,
                                    handler: function () {
                                        var idParent = that.treeDict_lastSelectedId;
                                        that.addChildDictionaryElement(idParent);
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: config.ttlDelete,
                                    handler: function () {
                                        var id = that.treeDict_lastSelectedId;
                                        var pid = that.treeDict.dynatree("getTree").getNodeByKey(id).getParent().data.index;
                                        that.deleteDictionaryElement(id, function () {
                                            that.refreshDictTree(pid);
                                        });
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: '&uarr;',
                                    handler: function () {
                                        var id = that.treeDict_lastSelectedId;
                                        that.ChangeDictionaryElementOrder(id, true);
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: '&darr;',
                                    handler: function () {
                                        var id = that.treeDict_lastSelectedId;
                                        that.ChangeDictionaryElementOrder(id, false);
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    margin: '0 0 0 5',
                    border: false,
                    flex: 1,
                    bodyStyle: 'background:transparent;',

                    items: [
                        that.gridRatios,
                        {
                            xtype: 'panel',
                            layout: 'column',
                            border: false,
                            bodyStyle: 'background:transparent;',

                            items: [
                                comboTypesRatios,
                                {
                                    xtype: 'button',
                                    text: config.ttlAdd,
                                    handler: function () {

                                        var IdDictionaryElement = that.treeDict_lastSelectedId;
                                        var IdTypeRatio = comboTypesRatios.getValue();
                                        var i = comboTypesRatios.getStore().find("Id", IdTypeRatio);
                                        var isDictionary = comboTypesRatios.getStore().data.items[i].raw.isDictionary;
                                        var Code = comboTypesRatios.getStore().data.items[i].raw.Code;
                                        var idDictionary = comboTypesRatios.getStore().data.items[i].raw.idDictionary;
                                        if (isDictionary) Code = idDictionary;

                                        var store = that.gridRatios.getStore()
                                        var pos = store.find('TypeId', IdTypeRatio)
                                        if (pos == -1) {
                                            var choose = Ext.create(config.classFormRatioValue, {
                                                value: null,
                                                type: Code,
                                                methodOnSave: function (value) {
                                                    that.addRatio(IdDictionaryElement, IdTypeRatio, value);
                                                }
                                            });
                                        }
                                        else {

                                            var DictionaryElement = store.getAt(pos);
                                            var value = DictionaryElement.data.Value;
                                            var code = DictionaryElement.data.Code;
                                            if (DictionaryElement.data.Code == 'dict') {
                                                value = DictionaryElement.data.ValueId;
                                                code = DictionaryElement.data.DictionaryId;
                                            }
                                            if (DictionaryElement.data.Code == 'DictionaryElementclass') {
                                                value = DictionaryElement.data.ValueId;
                                            }
                                            var IdRatio = DictionaryElement.data.Id;

                                            var choose = Ext.create(config.classFormRatioValue, {
                                                value: value,
                                                type: code,
                                                methodOnSave: function (value) {
                                                    that.updateRatio(IdRatio, value);
                                                }
                                            });
                                        }

                                        
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: config.ttlDelete,
                                    handler: function () {
                                        var id = that.gridRatios.getSelectionModel().getSelection()[0].get("Id");
                                        that.delRatio(id);
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: "Присвоить всем листовым элементам",
                                    handler: function () {
                                        var rec_id = that.treeDict_lastSelectedId;
                                        var selectedRec = that.gridRatios.getSelectionModel().getSelection()[0];
                                        if (typeof selectedRec == 'undefined') {
                                            Ext.Msg.alert('Внимание!', 'Необходимо выбрать свойство для листовых элементов');
                                            return;
                                        }
                                        var prop_id = selectedRec.get("Id");
                                        that.setRatioValueToDescendant(rec_id, prop_id);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        this.windowDictionaryEdit.show();

        this.refreshClass();

    },
    addRootDictionaryElement: function () {
        var that = this;

        Ext.MessageBox.prompt(config.ttlAddRootDictionaryElement, config.ttlEnterName,
            function (btn, text) {
                if (btn == "ok") {


                    try {
                        var id = HostApi.DictionaryElementCreate(null, that.idDictionary, text);
                        that.refreshDictTree(id);
                    }
                    catch (err) {
                        Ext.Msg.show({
                            title: "Error",
                            msg: err,
                            width: 300,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                }
            }
        );
    },
    addChildDictionaryElement: function (idParent) {
        that = this;
        Ext.MessageBox.prompt('Добавить корневую запись', 'Введите имя:',

            function (btn, text) {
                if (btn == "ok") {

                    try {
                        var id = HostApi.DictionaryElementCreate(idParent, that.idDictionary, text);
                        that.refreshDictTree(id);
                    }
                    catch (err) {
                        Ext.Msg.show({
                            title: "Error",
                            msg: err,
                            width: 300,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }



                }
            }
        );
    },
    deleteDictionaryElement: function (idDictionaryElement, AfterDelete) {
        that = this;
        Ext.MessageBox.confirm(config.ttlDeleteFromDict, config.ttlAreYouSure,

            function (btn) {
                if (btn == "yes") {

                    HostApi.DictionaryElementDelete(idDictionaryElement);
                    AfterDelete();

                }
            }
        );
    },
    addRatio: function (IdDictionaryElement, IdRatioType, Value) {
        HostApi.RatioCreate(IdDictionaryElement,Value,IdRatioType);
        this.refreshPointRatios(IdDictionaryElement);
    },
    updateRatio: function (IdRatio, Value) {
        HostApi.RatioEdit(IdRatio, Value);
        this.refreshPointRatios(this.treeDict_lastSelectedId);
    },
    delRatio: function (IdRatio) {
        HostApi.RatioDelete(IdRatio);
        var IdDictionaryElement = this.treeDict_lastSelectedId;
        this.refreshPointRatios(IdDictionaryElement);
    },
    refreshDictTree: function (SelectedId) {
        var that = this;
        var responseDictObjects = HostApi.DictionaryElementGetTree(this.idDictionary, SelectedId);

        var el = this.treePanel.getEl().dom;
        if (this.treeDict == null) {
            this.treeDict = $(el).dynatree({
                clickFolderMode: 1,
                generateIds: true,
                onActivate: function (node) {
                    that.treeDict_lastSelectedId = node.data.index;
                    that.refreshPointRatios(node.data.index);
                },
                onDblClick: function (node) {
                    var renameFunc = function (btn, text) {
                        if (btn == "ok") {
                            var id = node.data.index;
                            HostApi.DictionaryElementRename(id, text);
                            node.data.title = text;
                            node.render();
                        }
                    };

                    Ext.MessageBox.prompt('Объект ' + node.data.title, 'Переименовать в:', renameFunc, that, false, node.data.title);
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
                        try {

                            HostApi.DictionaryElementsSetNewParent(sourceNode.data.index, node.data.index);
                        }
                        catch (ex) { return false; }

                    },
                    onDragStop: function (sourceNode) {
                        if (!that.DragOver) {
                            HostApi.DictionaryElementsSetNewParent(sourceNode.data.index,null);
                        }
                        that.refreshDictTree(sourceNode.data.index);
                    }
                }
            });
        }
        this.treeDict.dynatree("getRoot").removeChildren(true);
        this.treeDict.dynatree("getRoot").addChild(responseDictObjects);

        if (typeof SelectedId != "undefined") {
            if (typeof SelectedId == "number") SelectedId = SelectedId.toString();
            this.treeDict.dynatree("getTree").selectKey(SelectedId);
            this.treeDict.dynatree("getTree").activateKey(SelectedId);
            this.treeDict_lastSelectedId = SelectedId;
        }
    },
    refreshPointRatios: function (IdDictionaryElement) {
        this.storePointRatios.loadRawData({ 'items': HostApi.RatioGetListByDictionaryElement(IdDictionaryElement) });
    },
    refreshClass: function (IdDictionaryElement) {
        this.storeDictionaryElementClass.loadRawData({ 'items': HostApi.ClassGetList() });
    },
    setRatioValueToDescendant: function (rec_id, prop_id) {
        HostApi.RatioSetToChild(rec_id, prop_id);
    },
    ChangeDictionaryElementOrder: function (id, dir) {
        HostApi.DictionaryElementChangeOrder(id, dir);
        this.refreshDictTree(id);
    }
});

