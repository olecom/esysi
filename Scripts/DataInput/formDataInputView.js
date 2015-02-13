///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classFormDataInputView, {

    windowDataInput: null,
    panelTabControl: null,
    panelRecordsView: null,
    formRecordControlButtons: null,

    tabGridRecords: null,
    tabGridFilters: null,
    tabColumnSettings: null,

    idDataInput: null,
    idWindow: null,

    storeColumnSettings: null,
    storeRecords: null,
    storeFilters: null,
    columnDefinitionRecordsGrid: null,

    isNeedToCreateRecordsGrid: false,

    windowDataInputPrefix: 'windowDataInput_',

    constructor: function (options) {

        Ext.apply(this, options || {});

        if (this.idDataInput == null) {
            throw "idDataInput is not defined"
            return;
        }

        this.idWindow = this.windowDataInputPrefix + this.idDataInput;

        var that = this;

        this.panelTabControl = this.createTabPanel();
        this.panelRecordControls = this.createControlButtons();

        this.windowDataInput = Ext.create('Ext.window.Window', {
            id: this.idWindow,
            title: this.titleWindow,
            height: 500,
            width: 530,
            bodyPadding: 0,

            maximizable: true,
            maximized: true,
            renderTo: application.pnlSpace.getEl().dom,
            constrain: true,
            resizable: true,
            margin: 0,
            padding: 0,
            autoScroll: false,

            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [
                this.panelTabControl,
                this.panelRecordControls
            ],
            buttons: [{
                text: config.ttlClose,
                handler: function () {
                    that.windowDataInput.close();
                }
            }]
        });


    },
    show: function () {
        this.windowDataInput.show();

    },
    reloadStoreColumnSettings: function () {

        if (this.storeColumnSettings == null)
            this.storeColumnSettings = Ext.create('Ext.data.Store', {
                fields: ['text', 'id', 'hidden'],
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
        var items = HostApi.DataInputFormColumnSettingGetList(this.idDataInput);

        this.storeColumnSettings.loadRawData({ 'items': items });
    },
    reloadColumnDefinition: function () {
        this.columnDefinitionRecordsGrid = HostApi.DataInputFormColumnModelGet2(this.idDataInput);
    },
    reloadStoreRecordsView: function () {
        var ColNames = new Array();
        for (var i = 0; i < this.columnDefinitionRecordsGrid.length; i++) {
            ColNames.push({
                name: this.columnDefinitionRecordsGrid[i].dataIndex,
                type: this.columnDefinitionRecordsGrid[i].type,
                dateFormat: this.columnDefinitionRecordsGrid[i].dateFormat
            });
        }

        if (this.storeRecords == null) {
            this.storeRecords = Ext.create('Ext.data.Store', {
                fields: ColNames,
                data: { 'items': []
                },
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json',
                        root: 'items'
                    }
                },
                sortOnLoad: true,

                sorters: [{
                    direction: 'DESC',
                    property: ColNames[0].name
                }]
            });
        }
        var items = HostApi.RecordOfDataInputFormGetList2(this.idDataInput);
        this.storeRecords.loadRawData({ 'items': items });

    },
    createTabColumnSettings: function () {
        var that = this;
        return Ext.widget({
            title: 'Users',
            xtype: 'grid',
            selModel: {
                mode: 'MULTI'
            },
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop'
                },
                listeners: {
                    drop: function (node, data, dropRec, dropPosition) {
                        that.saveColumnSettings();
                    }
                }
            },
            store: this.storeColumnSettings,
            columns: [{
                text: 'Порядок сортировки',
                dataIndex: 'text'
            }, {
                text: 'Спрятать',
                dataIndex: 'hidden',
                type: 'bool',
                xtype: 'checkcolumn',
                listeners:
                    {
                        checkchange: function (column, recordIndex, checked) {
                            that.saveColumnSettings();
                        }
                    }
            }
            ],
            width: 300,
            height: 150,
            title: 'Сортировка и видимость',
            tooltip: 'A button tooltip'
        });
    },
    createPanelRecordsView: function () {
        var that = this;
        var width = this.columnDefinitionRecordsGrid.length * 100;

        var grid = Ext.create('Ext.grid.Panel', {
            title: false,
            frame: false,
            border: false,
            width: width,
            store: this.storeRecords,
            columns: this.columnDefinitionRecordsGrid,
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {

                    var id = that.panelRecordsView.getSelectionModel().getSelection()[0].raw.Id;
                    var viewRecWindow = Ext.create(config.classFormDataInputRecord,
                    {
                        idDataInput: that.idDataInput,
                        onClose: function () {
                            that.reloadStoreRecordsView();
                        }
                    });
                    viewRecWindow.viewRecord(id);
                },
                cellkeydown: function (cell, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    if (e.getKey() == e.ENTER) {
                        that.editRecord();
                    } else if ((e.getKey() == e.DELETE) && (!e.ctrlKey)) {
                        Ext.MessageBox.confirm('Delete record', 'Are you sure you want to do that?',
                            function (btn) {
                                if (btn == 'yes') that.deleteRecord();
                            }
                        );
                    } else if ((e.getKey() == e.DELETE) && (e.ctrlKey)) {
                        that.deleteRecord();

                    }
                    this.up("panel").fireEvent("cellkeydown");
                },
                render: function (self) {
                    self.getEl().addListener('keydown', function (event) {

                        if (event.getKey() === Ext.EventObject.INSERT) {
                            that.addNewRecord();
                        }

                    });
                }
            }
        });

        return grid;
    },
    createTabGridFilters: function () {
        var that = this;
        this.createStoreFilters();
        return Ext.create('Ext.grid.Panel', {
            autoScroll: true,
            title: 'Фильтры',
            frame: false,
            store: this.storeFilters,
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {

                    var row = that.tabGridFilters.getSelectionModel().getSelection()[0].data;
                    var propertyTypeId = row.propertyTypeId;
                    var propertyType = row.propertyType;
                    var filterValue = row.filterValue;
                    var filterActive = row.filterActive;
                    var recordIndex = index;
                    var filterDialog = Ext.create(config.classWindowDataInputSetFilterValue, {
                        filterValue: filterValue,
                        propertyType: propertyType,
                        propertyTypeId: propertyTypeId,
                        onChooseFilterValue: function (filterValue, filterValueTitle) {
                            var showEmpty = that.storeFilters.data.getAt(recordIndex).data.showEmpty;
                            that.setFilterValue(propertyTypeId, filterValue, filterActive, filterValueTitle, showEmpty);
                            that.createStoreFilters();
                        }
                    });
                }
            },
            columns: [
                { text: 'propertyTypeId', dataIndex: 'propertyTypeId', hidden: true },
                {
                    text: 'Активен',
                    dataIndex: 'filterActive',
                    width: 70,
                    xtype: 'checkcolumn',
                    listeners: {
                        checkchange: function (column, recordIndex, checked) {
                            var propertyTypeId = that.storeFilters.data.getAt(recordIndex).data.propertyTypeId;
                            var filterActive = that.storeFilters.data.getAt(recordIndex).data.filterActive;
                            var filterValue = that.storeFilters.data.getAt(recordIndex).data.filterValue;
                            var filterValueTitle = that.storeFilters.data.getAt(recordIndex).data.filterValueTitle;
                            var showEmpty = that.storeFilters.data.getAt(recordIndex).data.showEmpty;
                            that.setFilterValue(propertyTypeId, filterValue, filterActive, filterValueTitle, showEmpty);
                        }
                    }
                },
                { text: 'Столбец', dataIndex: 'propertyName', width: 160 },
                {
                    text: 'Пустые',
                    dataIndex: 'showEmpty',
                    width: 70,
                    xtype: 'checkcolumn',
                    listeners: {
                        checkchange: function (column, recordIndex, checked) {
                            var propertyTypeId = that.storeFilters.data.getAt(recordIndex).data.propertyTypeId;
                            var filterActive = that.storeFilters.data.getAt(recordIndex).data.filterActive;
                            var filterValue = that.storeFilters.data.getAt(recordIndex).data.filterValue;
                            var filterValueTitle = that.storeFilters.data.getAt(recordIndex).data.filterValueTitle;
                            var showEmpty = that.storeFilters.data.getAt(recordIndex).data.showEmpty;
                            that.setFilterValue(propertyTypeId, filterValue, filterActive, filterValueTitle, showEmpty);
                        }
                    }
                },
                { text: 'Значение', dataIndex: 'filterValue', width: 100, hidden: true },
                { text: 'Значение', dataIndex: 'filterValueTitle', flex: 1 }

            ]
        });
    },
    createTabPanel: function () {

        var that = this;

        this.reloadStoreColumnSettings();

        this.tabColumnSettings = this.createTabColumnSettings();

        this.reloadColumnDefinition();

        this.reloadStoreRecordsView();

        this.tabGridRecords = Ext.create('Ext.panel.Panel', {
            autoScroll: true,
            title: 'Записи',
            tooltip: 'A button tooltip',
            listeners: {
                show: function () {
                    
                    if (that.isNeedToCreateRecordsGrid) 
                    {
                        that.panelRecordsView.destroy();
                        that.reloadColumnDefinition();
                        that.reloadStoreRecordsView();
                        that.panelRecordsView = that.createPanelRecordsView();
                        that.tabGridRecords.add(that.panelRecordsView);
                        that.isNeedToCreateRecordsGrid = false;
                    }
                }
            }
        });

        this.tabGridFilters = this.createTabGridFilters();
        this.panelRecordsView = this.createPanelRecordsView();
        this.tabGridRecords.add(this.panelRecordsView);


        return Ext.create('Ext.tab.Panel', {
            frame: false,
            border: false,
            bodyStyle: 'background:transparent;',
            flex: 1,
            items: [
                this.tabGridRecords,
                this.tabGridFilters,
                this.tabColumnSettings
            ]
        });


    },
    createControlButtons: function () {

        var that = this;

        this.comboRecordClass = Ext.create('Ext.form.ComboBox', {
            store: this.createStoreClasses(),
            queryMode: 'local',
            displayField: 'ClassName',
            valueField: 'Id'
        });

        this.formRecordControlButtons = Ext.create('Ext.form.Panel', {
            frame: false,
            border: false,
            bodyStyle: 'background:transparent;',
            layout: 'column',
            style: {
                paddingTop: '4px'
            },
            height: 35,
            items: [
                {
                    xtype: 'label',
                    text: 'Класс',
                    style: {
                        paddingTop: '4px',
                        paddingLeft: '2px',
                        paddingRight: '2px'
                    }
                },
                this.comboRecordClass,
                {
                    xtype: 'button',
                    text: "Добавить",
                    handler: function () {
                        that.addNewRecord();
                    }
                },
                {
                    xtype: 'button',
                    text: "Удалить",
                    handler: function () {
                        that.deleteRecord();
                    }
                },
                {
                    xtype: 'button',
                    text: "Редактировать",
                    handler: function () {
                        that.editRecord();
                    }
                },
                {
                    xtype: 'button',
                    text: "Дублировать",
                    handler: function () {
                        that.duplicateRecord();
                    }
                }
            ]

        });

        return this.formRecordControlButtons;
    },
    saveColumnSettings: function () {
        var settings = {
            orderIds: [],
            hiddenIds: []
        };

        $.each(this.storeColumnSettings.data.items, function (index, element) {
            settings.orderIds.push(element.data.id);
            if (element.data.hidden) settings.hiddenIds.push(element.data.id);
        });
        HostApi.DataInputFormColumnSettingSet(settings.orderIds.toString(), settings.hiddenIds.toString(), this.idDataInput);

        this.isNeedToCreateRecordsGrid = true;

    },
    createStoreClasses: function () {
        this.storeRecordClass = Ext.create('Ext.data.Store', {
            fields: ['Id', 'ClassName'],
            data: [],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });
        var items = HostApi.ClassOfDataInputFormGetList(this.idDataInput);

        this.storeRecordClass.loadRawData({ 'items': items });
        return this.storeRecordClass;
    },
    createStoreFilters: function () {
        if (this.storeFilters == null) {
            this.storeFilters = Ext.create('Ext.data.Store', {
                fields: ['propertyTypeId', 'propertyType', 'propertyName', 'filterActive', 'filterValue', 'filterValueTitle', 'showEmpty'],
                data: [],
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json',
                        root: 'items'
                    }
                }
            });
        }

        var items = HostApi.DataInputFormColumnFilterGetList(this.idDataInput);
        return this.storeFilters.loadRawData({ 'items': items });

    },
    setFilterValue: function (propertyTypeId, propertyValue, filterActive, propertyTitle, showEmpty) {
        HostApi.DataInputFormColumnFilterSet(this.idDataInput, propertyTypeId, propertyValue, propertyTitle, filterActive, showEmpty);
        this.isNeedToCreateRecordsGrid = true;
        //this.reloadStoreRecordsView();
    },
    addNewRecord: function () {
        var that = this;
        var idClass = that.comboRecordClass.getValue();
        if (idClass == null) {
            alert('error');
            return;
        }
        var newRecWindow = Ext.create(config.classFormDataInputRecord,
                        {
                            idDataInput: that.idDataInput,
                            onClose: function (idRec) {

                                that.reloadStoreRecordsView();
                                that.panelRecordsView.getSelectionModel().select(that.storeRecords.find('0', idRec));

                            }
                        });
        newRecWindow.createRecord(idClass);
    },
    deleteRecord: function () {
        var that = this;
        var id = that.panelRecordsView.getSelectionModel().getSelection()[0].data.Id;
        that.reloadStoreRecordsView();
        HostApi.RecordDelete(id);
        that.reloadStoreRecordsView();
    },
    editRecord: function () {
        var that = this;
        var id = that.panelRecordsView.getSelectionModel().getSelection()[0].data.Id;
        var viewRecWindow = Ext.create(config.classFormDataInputRecord,
                        {
                            idDataInput: that.idDataInput,
                            onClose: function () {
                                that.reloadStoreRecordsView();
                            }
                        });
        viewRecWindow.viewRecord(id);
    },
    duplicateRecord: function () {
        var that = this;
        var id = that.panelRecordsView.getSelectionModel().getSelection()[0].data.Id;

        // дублируем
        var newRecId = HostApi.RecordDuplicate(id);

        // обновляем список
        that.reloadStoreRecordsView();

        // выделяем
        that.panelRecordsView.getSelectionModel().select(that.storeRecords.find('0', newRecId));

        //редактируем
        var viewRecWindow = Ext.create(config.classFormDataInputRecord,
                        {
                            idDataInput: that.idDataInput,
                            onClose: function () {
                                that.reloadStoreRecordsView();
                            }
                        });
        viewRecWindow.viewRecord(newRecId);

    }
});
