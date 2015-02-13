///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classFormDataInputRecord, {

    windowRecord: null,
    gridProperties: null,

    storePointProperties: null,

    idRecordClass: null,
    idDataInput: null,
    idRecord: null,
    idWindow: null,

    onClose: null,

    constructor: function (options) {

        Ext.apply(this, options || {});

        this.idWindow = 'windowDataRecord' + Math.floor(Math.random() * 10000);

        var that = this;

        this.storePointProperties = Ext.create('Ext.data.Store', {
            fields: ['Id', 'TypeName', 'TypeId', 'Value', 'ValueTitle', 'Value', 'Code', 'DictionaryId', 'DefaultValueTitle', 'DefaultValue', 'Locked'],
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

        this.gridProperties = this.createGridProperties();

        this.windowRecord = Ext.create('Ext.window.Window', {
            id: this.idWindow,
            title: config.ttlDataInput,
            height: 500,
            width: 530,
            bodyPadding: 10,
            resizable: true,
            margin: 0,
            padding: 0,
            autoScroll: true,
            layout: {
                type: 'fit',
                align: 'stretch',
                pack: 'start'
            },
            items: [

                this.gridProperties
            ],
            buttons: [{
                text: 'Очистить поле',
                handler: function () {
                    var id = that.gridProperties.getSelectionModel().getSelection()[0].data.Id;
                    var ind = that.storePointProperties.find('Id', id);
                    if (ind == -1) {
                        ind = that.storePointProperties.find('TypeId', that.gridProperties.getSelectionModel().getSelection()[0].data.TypeId);
                    }
                    var rec = that.storePointProperties.getAt(ind)
                    rec.set("Value", null);
                    rec.set("ValueTitle", "");
                }
            }, {
                text: 'Сохранить и закрыть',
                handler: function () {
                    if (that.saveRecord()) {
                        that.windowRecord.close();
                        that.onClose(that.idRecord);
                    }
                }
            }]
        });

    },

    viewRecord: function (idRecord) {

        this.idRecord = idRecord;
        this.fillPropertyStore();
        this.windowRecord.setTitle("Просмотр записи");
        this.windowRecord.show();
    },

    createRecord: function (idRecordClass) {
        this.idRecordClass = idRecordClass;
        this.fillPropertyStore();
        this.windowRecord.setTitle("Новая запись");
        this.windowRecord.show();
    },

    isOpenMode: function () {
        return (this.idRecord != null);
    },

    fillPropertyStore: function () {
        var response = "";
        if (this.isOpenMode()) {
            response = HostApi.PropertyOfRecordGetList(this.idRecord, this.idDataInput);

        } else {
            response = HostApi.PropertyOfClassGetList(this.idRecordClass, this.idDataInput);
        }
        if (!this.isOpenMode()) {
            $.each(response, function (i, val) {
                if (val.Code == 'dict') {
                    val.ValueTitle = val.DefaultValueTitle;
                    val.Value = val.DefaultValue;
                } if (val.Code == 'date') {
                    val.Value = val.DefaultValue;
                }
            });
        }

        this.storePointProperties.loadRawData({ 'items': response });
    },

    createGridProperties: function () {

        var that = this;
        return Ext.create('Ext.grid.Panel', {
            title: config.ttlProperties,
            store: this.storePointProperties,
            columns: [
                { text: 'Id', dataIndex: 'Id', hidden: true },
                { text: config.ttlType, dataIndex: 'TypeName' },
                { text: config.ttlValue, dataIndex: 'ValueTitle', flex: 1 }
            ],
            viewConfig: {
                stripeRows: false,
                getRowClass: function (record) {
                    if (!((record.get("Locked") == null)
                        || (typeof record.get("Locked") == 'undefined')
                        || (record.get("Locked") == ''))) {
                        return 'gray-row';
                    }
                    return '';
                }
            },
            height: 400,
            width: 410,
            listeners: {
                itemdblclick: function (_grid, record, _item, _index, e, eOpts) {

                    if (!((record.data.Locked == null)
                        || (typeof record.data.Locked == 'undefined')
                        || (record.data.Locked == ''))) {

                        alert("Locked");
                        return;
                    }
                    var grid = _grid;
                    var item = _item;
                    var index = _index;
                    var value = record.data.Value;
                    var code = record.data.Code;

                    if (record.data.Code == 'dict') {
                        value = record.data.Value;
                        code = record.data.DictionaryId;
                    } 
                    var IdProperty = record.data.Id;
                    var SettedValues = that.getValues();
                    var choose = Ext.create(config.classFormPropertyValue, {
                        value: value,
                        checkbox: false,
                        predefinedValues: SettedValues,
                        dataInputFormId: that.idDataInput,
                        restrictionClassId: that.idRecordClass,
                        propertyId: record.data.TypeId,
                        type: code,
                        methodOnSave: function (value, title) {

                            var grid1 = grid;
                            var item1 = item;

                            var store = grid.getStore();
                            var rownum = store.find('TypeId', record.data.TypeId);
                            var row = store.getAt(rownum);

                            row.set("ValueTitle", title);
                            row.set("Value", value);

                            if (record.data.Code == 'dict') {
                                row.set("ValueTitle", title);
                                row.set("Value", value);

                                var forcedVals = HostApi.PropertyTypeForcedValuesGetList(value);

                                //Снимаем предыдущие принудительные флаги
                                store.data.each(function (item, index, totalItems) {
                                    if (item.data.Locked == record.data.TypeId) item.set("Locked", null);
                                });

                                //Ставим новые пренудительные значения
                                var length = forcedVals.length;
                                for (var i = 0; i < length; i++) {
                                    var ind = store.find('TypeId', forcedVals[i].TypeId);
                                    if (ind == -1) continue;
                                    var rec = store.getAt(ind);

                                    rec.set("ValueTitle", forcedVals[i].ValueTitle);
                                    rec.set("Value", parseInt(forcedVals[i].Value, 10));
                                    rec.set("Locked", record.data.TypeId);
                                }
                            }
                        }
                    });
                }
            }
        });
    },


    getValues: function () {
        var data = this.storePointProperties.data;
        var data_send = new Array();
        for (var i = 0; i < data.length; i++) {
            var rec = this.storePointProperties.data.items[i].data;
            data_send.push({
                TypeId: rec.TypeId,
                Value: rec.Value
            });
        }
        return data_send;
    },

    saveRecord: function () {

        var data_send = this.getValues();
        try {
            this.idRecordClass = HostApi.RecordOfDataInputFormSave($.toJSON(data_send), this.idDataInput, this.idRecordClass, this.idRecord);
        }
        catch (ex) {
            alert(ex);
            return false;
        }
        return true;
    }



});