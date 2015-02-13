///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />


Ext.define(config.classFormPropertyValue, {

    value: null,
    predefinedValues: null,
    dataInputFormId: null,
    type: null,
    methodOnSave: null,

    window: null,
    items: null,
    width: 500,
    height: 400,
    checkbox: true,
    restrictionClassId: null,
    propertyId: null,

    constructor: function (options) {
        Ext.apply(this, options || {});
        this.createItems();
        this.showWindow();
    },
    getValue: function () {
        var type = this.type;

        if (type == "str") {
            return this.items[0].getValue();
        } else if (type == "number") {
            return this.items[0].getValue();
        } else if (type == "date") {
            return $.format.date(this.items[0].getValue(), "dd.MM.yyyy");
        } else if (type == "boolean") {
            return this.items[0].getValue();
        } else if ($.isNumeric(type)) {
            return this.items[0].getValue();
        } else if (type == "recordclass") {
            return this.items[0].getValue();
        } else throw "Unknown type " + type;
    },
    getTitle: function () {
        var type = this.type;

        if (type == "str") {
            return this.items[0].getValue();
        } else if (type == "number") {
            return this.items[0].getValue();
        } else if (type == "date") {
            return $.format.date(this.items[0].getValue(), "dd.MM.yyyy");
        } else if (type == "boolean") {
            return this.items[0].getValue();
        } else if ($.isNumeric(type)) {
            return this.items[0].getTitle();
        } else if (type == "recordclass") {
            return this.items[0].getTitle();
        } else throw "Unknown type " + type;
    },
    createItems: function () {
        var that = this;
        var type = this.type;

        if (type == "str") {

            this.items = [
                Ext.create('Ext.form.field.Text', {
                    name: 'fieldValue',
                    fieldLabel: config.ttlValue,
                    allowBlank: false,
                    value: that.value
                })
            ];

            this.width = null;
            this.height = null;

        } else if (type == "number") {


            this.items = [
                    Ext.create('Ext.form.field.Text', {
                        name: 'fieldValue',
                        fieldLabel: config.ttlValue,
                        allowBlank: false,
                        value: that.value
                    })
                ];
            this.width = null;
            this.height = null;

        } else if (type == "date") {

            this.items = [
                    Ext.create('Ext.form.field.Date', {
                        name: 'fieldValue',
                        fieldLabel: config.ttlValue,
                        allowBlank: false,
                        value: that.value,
                        format: "d.m.Y"
                    })
                ];
            this.width = null;
            this.height = null;


        } else if (type == "boolean") {

            this.items = [
                    Ext.create('Ext.form.field.Checkbox', {
                        name: 'fieldValue',
                        fieldLabel: config.ttlValue,
                        allowBlank: false,
                        value: that.value
                    })
                ];
            this.width = null;
            this.height = null;
        } else if (type == "recordclass") {

            this.items = [
                    Ext.create(config.classFormChooseRecordClass, {
                        name: 'fieldValue',
                        title: config.ttlValue,
                        allowBlank: false,
                        value: that.value
                    })
                ];
            this.width = null;
            this.height = null;
        } else if ($.isNumeric(type)) {
            this.items = [
                    Ext.create("ManAcc.Dictionaries.PanelDictionaryElementTree", {
                        name: 'fieldValue',
                        selectMode: that.selectMode,
                        fieldLabel: config.ttlValue,
                        allowBlank: false,
                        value: that.value,
                        idDictionary: type,
                        predefinedValues: that.predefinedValues,
                        dataInputFormId: that.dataInputFormId,
                        restrictionClassId: that.restrictionClassId,
                        propertyId: that.propertyId,
                        checkbox: that.checkbox,
                        onValueSelected: function () {
                            var value = that.getValue();
                            var title = that.getTitle();
                            that.window.close();
                            that.methodOnSave(value, title);
                        }
                    })
                ];

        } else throw "Unknown type " + type;


    },
    showWindow: function () {
        var that = this;
        var buttons = [];

        if (this.isBtnAddValueVisible()) {

            var comboSearchWord = Ext.create('Ext.form.field.ComboBox', {
                fieldLabel: config.ttlSearch,
                /*
                style: {
                paddingRight: '30px'
                }, 
                */
                padding: '0 30 0 0',
                labelWidth: false,
                labelStyle: 'width: auto',
                hideLabel: false,
                store: this.createRecordsListStore(),
                queryMode: 'local',
                displayField: 'Name',
                valueField: 'Id',
                editable: true,
                listeners: {
                    select: function (combo, records, eOpts) {
                        that.items[0].setValue(
                            records[0].data.Id
                        );
                    }
                }
            });

            buttons.push(comboSearchWord);

            buttons.push({
                text: config.ttlAddValue,
                handler: function () {
                    var idParent = that.getValue();
                    that.addChildRecord(idParent);
                }
            });

        }

        buttons.push({
            text: config.ttlClose,
            handler: function () {
                that.window.close();
            }
        });

        buttons.push({
            text: config.ttlOk,
            handler: function () {
                var value = that.getValue();
                var title = that.getTitle();
                if (value != "") {

                    if (that.type == 'date') {
                        var expr = /^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
                        if (!expr.test(value)) {
                            alert('Дата должна быть введена в формате dd.mm.yyyy');
                            return;
                        }

                    } else if (that.type == 'number') {
                        value = value.replace(",", ".");
                        var expr = /^-?\d*\.?\d+$/;
                        if (!expr.test(value)) {
                            alert('Число имеет неверный формат');
                            return;
                        }
                    }
                }

                that.window.close();
                that.methodOnSave(value, title);
            }
        });

        this.window = Ext.create('Ext.window.Window', {
            id: 'windowPropertyValue',
            title: config.ttlPropertyValue,
            height: this.height,
            width: this.width,
            layout: 'fit',
            resizable: false,
            margin: 0,
            padding: 0,
            autoScroll: true,
            modal: true,
            items: this.items,
            buttons: buttons,
            listeners: {
                afterRender: function (thisForm, options) {
                    that.keyNav = Ext.create('Ext.util.KeyNav', that, {
                        target: that.window.getEl(),
                        enter: that.saveAndClose,
                        scope: that,
                        key: Ext.EventObject.ENTER
                    });
                }
            }
        });
        this.window.show();
    },
    isBtnAddValueVisible: function () {
        return ($.isNumeric(this.type));
    },
    createRecordsListStore: function () {

        var store = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
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



        store.loadRawData({ 'items': HostApi.DictionaryElementsGetList( this.type ) });

        return store;
    },
    addChildRecord: function (idParent) {
        that = this;
        Ext.MessageBox.prompt('Добавить корневую запись', 'Введите имя:',

            function (btn, text) {
                if (btn == "ok") {
                    var id = HostApi.RecordCreateByObj({ IdParent: idParent, IdDictionary: that.type, Name: text, IdClass: null });
                    that.items[0].refreshDictTree(id);
                }
            }
        );
    },
    saveAndClose: function () {
        var value = this.getValue();
        var title = this.getTitle();
        this.window.close();
        this.methodOnSave(value, title);
    }
});
