///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classFormDictionaryEdit, {

    dictionaryName: '',

    comboRecordClass: null,
    storeRecordClass: null,
    storePointProperties: null,
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
            title: config.ttlRecord,
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

        this.storePointProperties = Ext.create('Ext.data.Store', {
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

        this.gridProperties = Ext.create('Ext.grid.Panel', {
            flex: 1,
            overlapHeader: false,
            border: false,
            frame: true,
            overflowY: 'scroll',
            overflowX: 'scroll',
            title: config.ttlProperties,
            store: this.storePointProperties,
            columns: [
                { text: 'Id', dataIndex: 'Id', hidden: true },
                { text: config.ttlType, dataIndex: 'TypeName', width: 150 },
                { text: config.ttlValue, dataIndex: 'Value', flex: 1 }
            ],

            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {

                    var value = record.data.Value;
                    var code = record.data.Code;
                    if (record.data.Code == 'dict') {
                        value = record.data.ValueId;
                        code = record.data.DictionaryId;
                    }
                    if (record.data.Code == 'recordclass') {
                        value = record.data.ValueId;
                    }
                    var IdProperty = record.data.Id;

                    var choose = Ext.create(config.classFormPropertyValue, {
                        value: value,
                        type: code,
                        methodOnSave: function (value) {
                            that.updateProperty(IdProperty, value);
                        }
                    });
                }
            }
        });

        that.storeRecordClass = Ext.create('Ext.data.Store', {
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

        that.comboRecordClass = Ext.create('Ext.form.ComboBox', {
            store: that.storeRecordClass,
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            emptyText: ".. Класс ..",
            editable: false,
            hidden: true
        });


        var storePropertyType = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'isDictionary', 'idDictionary', 'Code'],
            data: HostApi.PropertyTypeGetList()
        });

        var comboTypesProperties = Ext.create('Ext.form.ComboBox', {
            store: storePropertyType,
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
                                that.comboRecordClass,
                                {
                                    xtype: 'button',
                                    text: config.ttlAddRoot,
                                    handler: function () {
                                        that.addRootRecord();
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: config.ttlAddChildNode,
                                    handler: function () {
                                        var idParent = that.treeDict_lastSelectedId;
                                        that.addChildRecord(idParent);
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: config.ttlDelete,
                                    handler: function () {
                                        var id = that.treeDict_lastSelectedId;
                                        var pid = that.treeDict.dynatree("getTree").getNodeByKey(id).getParent().data.index;
                                        that.deleteRecord(id, function () {

                                            that.refreshDictTree(pid);

                                        });
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: '&uarr;',
                                    handler: function () {
                                        var id = that.treeDict_lastSelectedId;
                                        that.ChangeRecordOrder(id, true);
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: '&darr;',
                                    handler: function () {
                                        var id = that.treeDict_lastSelectedId;
                                        that.ChangeRecordOrder(id, false);
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
                        that.gridProperties,
                        {
                            xtype: 'panel',
                            layout: 'column',
                            border: false,
                            bodyStyle: 'background:transparent;',

                            items: [
                                comboTypesProperties,
                                {
                                    xtype: 'button',
                                    text: config.ttlAddProperty,
                                    handler: function () {

                                        var IdRecord = that.treeDict_lastSelectedId;
                                        var IdTypeProperty = comboTypesProperties.getValue();
                                        var i = comboTypesProperties.getStore().find("Id", IdTypeProperty);
                                        var isDictionary = comboTypesProperties.getStore().data.items[i].raw.isDictionary;
                                        var Code = comboTypesProperties.getStore().data.items[i].raw.Code;
                                        var idDictionary = comboTypesProperties.getStore().data.items[i].raw.idDictionary;
                                        if (isDictionary) Code = idDictionary;

                                        var store = that.gridProperties.getStore()
                                        var pos = store.find('TypeId', IdTypeProperty)
                                        if (pos == -1) {
                                            var choose = Ext.create(config.classFormPropertyValue, {
                                                value: null,
                                                type: Code,
                                                methodOnSave: function (value) {
                                                    that.addProperty(IdRecord, IdTypeProperty, value);
                                                }
                                            });
                                        }
                                        else {

                                            var record = store.getAt(pos);
                                            var value = record.data.Value;
                                            var code = record.data.Code;
                                            if (record.data.Code == 'dict') {
                                                value = record.data.ValueId;
                                                code = record.data.DictionaryId;
                                            }
                                            if (record.data.Code == 'recordclass') {
                                                value = record.data.ValueId;
                                            }
                                            var IdProperty = record.data.Id;

                                            var choose = Ext.create(config.classFormPropertyValue, {
                                                value: value,
                                                type: code,
                                                methodOnSave: function (value) {
                                                    that.updateProperty(IdProperty, value);
                                                }
                                            });
                                        }

                                        
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: config.ttlDelete,
                                    handler: function () {
                                        var id = that.gridProperties.getSelectionModel().getSelection()[0].get("Id");
                                        that.delProperty(id);
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: "Присвоить всем листовым элементам",
                                    handler: function () {
                                        var rec_id = that.treeDict_lastSelectedId;
                                        var selectedRec = that.gridProperties.getSelectionModel().getSelection()[0];
                                        if (typeof selectedRec == 'undefined') {
                                            Ext.Msg.alert('Внимание!', 'Необходимо выбрать свойство для листовых элементов');
                                            return;
                                        }
                                        var prop_id = selectedRec.get("Id");
                                        that.setPropertyValueToDescendant(rec_id, prop_id);
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
    addRootRecord: function () {
        var that = this;

        Ext.MessageBox.prompt(config.ttlAddRootRecord, config.ttlEnterName,
            function (btn, text) {
                if (btn == "ok") {


                    try {
                        var id = HostApi.RecordCreate(0, that.idDictionary, text, that.comboRecordClass.getValue());
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
    addChildRecord: function (idParent) {
        that = this;
        Ext.MessageBox.prompt('Добавить корневую запись', 'Введите имя:',

            function (btn, text) {
                if (btn == "ok") {

                    try {
                        var id = HostApi.RecordCreate(idParent, that.idDictionary, text, that.comboRecordClass.getValue());
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
    deleteRecord: function (idRecord, AfterDelete) {
        that = this;
        Ext.MessageBox.confirm(config.ttlDeleteFromDict, config.ttlAreYouSure,

            function (btn) {
                if (btn == "yes") {

                    HostApi.RecordDelete(idRecord);
                    AfterDelete();

                }
            }
        );
    },
    addProperty: function (IdRecord, IdPropertyType, Value) {
        var data = { IdRecord: IdRecord, IdPropertyType: IdPropertyType, Value: Value };
        HostApi.PropertyCreateByObj(data);
        this.refreshPointProperties(IdRecord);
    },
    updateProperty: function (IdProperty, Value) {
        HostApi.PropertyEditByObj({ IdProperty: IdProperty, Value: Value });
        this.refreshPointProperties(this.treeDict_lastSelectedId);
    },
    delProperty: function (IdProperty) {
        HostApi.PropertyDelete(IdProperty);
        var IdRecord = this.treeDict_lastSelectedId;
        this.refreshPointProperties(IdRecord);
    },
    classByRecord: function (IdRecord, ClassName) {
        HostApi.ClassCreateByRecord(IdRecord, ClassName);
        this.refreshClass();
    },
    refreshDictTree: function (SelectedId) {
        var that = this;
        var responseDictObjects = HostApi.RecordOfDictionaryGetTreeByObj({ Id: this.idDictionary, SelectedId: SelectedId });

        var el = this.treePanel.getEl().dom;
        if (this.treeDict == null) {
            this.treeDict = $(el).dynatree({
                clickFolderMode: 1,
                generateIds: true,
                onActivate: function (node) {
                    //that.treeDict_lastSelectedNode = node;
                    that.treeDict_lastSelectedId = node.data.index;
                    that.refreshPointProperties(node.data.index);
                },
                onDblClick: function (node) {
                    var renameFunc = function (btn, text) {
                        if (btn == "ok") {
                            var id = node.data.index;
                            HostApi.RecordRename(id, text);
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
                            HostApi.RecordSetNewParentRecordByObj({
                                RecordId: sourceNode.data.index,
                                NewParentId: node.data.index
                            });
                        }
                        catch (ex) { return false; }

                    },
                    onDragStop: function (sourceNode) {
                        if (!that.DragOver) {
                            HostApi.RecordSetNewParentRecordByObj({
                                RecordId: sourceNode.data.index,
                                NewParentId: null
                            });
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
    refreshPointProperties: function (IdRecord) {
        this.storePointProperties.loadRawData({ 'items': HostApi.PropertyGetListByRecord(IdRecord) });
    },
    refreshClass: function (IdRecord) {
        this.storeRecordClass.loadRawData({ 'items': HostApi.ClassGetList() });
    },
    setPropertyValueToDescendant: function (rec_id, prop_id) {
        HostApi.PropertySetToChild(rec_id, prop_id);
    },
    ChangeRecordOrder: function (id, dir) {
        HostApi.RecordChangeOrder(id, dir);
        this.refreshDictTree(id);
    }
});

