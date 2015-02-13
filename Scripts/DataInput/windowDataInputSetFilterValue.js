Ext.define(config.classWindowDataInputSetFilterValue, {

    filterValue: null,
    propertyTypeId: null,
    onChooseFilterValue:null,
    propertyType: null,

    window: null,
    items: null,
    width: 500,
    height: 400,


    constructor: function (options) {
        Ext.apply(this, options || {});
        this.createItems();
        this.showWindow();
    },
    getValue: function () {
        var type = this.propertyType;

        if (type == "str") {
            return this.items[0].getValue();
        } else if (type == "number") {
            return this.items[0].getValue() + ',' + this.items[1].getValue();
        } else if (type == "date") {
            return $.format.date(this.items[0].getValue(), "dd.MM.yyyy")
                + ','
                + $.format.date(this.items[1].getValue(), "dd.MM.yyyy");
        } else if (type == "boolean") {
            return this.items[0].getValue();
        } else if ((type.indexOf('dict') == 0) && ($.isNumeric(type.replace('dict', '')))) {
            return this.items[0].getValue();
        } else if (type == "recordclass") {
            return this.items[0].getValue();
        } else throw "Unknown type " + type;
    },
    getTitle: function () {
        var type = this.propertyType;

        if (type == "str") {
            return this.items[0].getValue();
        } else if (type == "number") {
            return 'От ' + this.items[0].getValue() + ' до' + this.items[1].getValue();
        } else if (type == "date") {
            return 'From ' + $.format.date(this.items[0].getValue(), "dd.MM.yyyy")
                + ' To ' + $.format.date(this.items[1].getValue(), "dd.MM.yyyy");
        } else if (type == "boolean") {
            return this.items[0].getValue();
        } else if ((type.indexOf('dict') == 0) && ($.isNumeric(type.replace('dict', '')))) {
            return this.items[0].getTitle();
        } else if (type == "recordclass") {
            return this.items[0].getTitle();
        } else throw "Unknown type " + type;
    },
    createItems: function () {
        var that = this;
        var value = this.filterValue;
        var type = this.propertyType;

        if (type == "str") {

            this.items = [
                Ext.create('Ext.form.field.Text', {
                    name: 'fieldValue',
                    fieldLabel: "Поле содержит",
                    allowBlank: false,
                    value: value

                })
            ];

            this.width = null;
            this.height = null;

        } else if (type == "number") {

            var value_ar = value.split(',');

            this.items = [
                    Ext.create('Ext.form.field.Text', {
                        name: 'fieldValueFrom',
                        fieldLabel: "От",
                        allowBlank: false,
                        value: value_ar[0]
                    }),
                    Ext.create('Ext.form.field.Text', {
                        name: 'fieldValueTo',
                        fieldLabel: "До",
                        allowBlank: false,
                        value: value_ar[1]
                    })
                ];
            this.width = null;
            this.height = null;

        } else if (type == "date") {

            var value_ar = value.split(',');
            this.items = [
                    Ext.create('Ext.form.field.Date', {
                        name: 'fieldValueFrom',
                        fieldLabel: 'Дата с',
                        allowBlank: false,
                        value: value_ar[0],
                        format: "d.m.Y"
                    }),
                    Ext.create('Ext.form.field.Date', {
                        name: 'fieldValueTo',
                        fieldLabel: 'Дата по',
                        allowBlank: false,
                        value: value_ar[1],
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
                        value: value
                    })
                ];
            this.width = null;
            this.height = null;
        } else if ((type.indexOf('dict') == 0) && ($.isNumeric(type.replace('dict', '')))) {
            this.items = [
                    Ext.create(config.classFormChooseDictionaryFilterRecords, {
                        name: 'fieldValue',
                        fieldLabel: config.ttlValue,
                        allowBlank: false,
                        value: value,
                        idDictionary: type.replace('dict', ''),
                        onValueSelected: function () {
                            var value = that.getValue();
                            var title = that.getTitle();
                            that.window.close();
                            that.onChooseFilterValue(value, title);
                        }
                    })
                ];

        } else if (type == "recordclass") {
                this.items = [
                    Ext.create(config.classFormChooseRecordClass, {
                        name: 'fieldValue',
                        title: config.ttlValue,
                        allowBlank: false,
                        value: value
                    })
                ];
        } else throw "Unknown type " + type;


    },
    showWindow: function () {
        var that = this;
        this.window = Ext.create('Ext.window.Window', {
            id: 'windowPropertyValue',
            title: config.ttlPropertyValue,
            height: this.height,
            width: this.width,
            bodyPadding: 10,
            resizable: false,
            margin: 0,
            padding: 0,
            autoScroll: true,
            modal: true,
            items: this.items,
            buttons: [{
                text: config.ttlClose,
                handler: function () {
                    var value = that.getValue();
                    var title = that.getTitle();
                    that.window.close();
                    that.onChooseFilterValue(value, title);
                }
            }]
        });
        this.window.show();
    }
});
