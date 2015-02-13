///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogMakeReportOrder, {
    extend: 'Ext.window.Window',
    title: config.ttlBuildReport,
    modal: true,
    maximizable: true,
    
    items: null,
    buttons: null,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    padding: '0 5 0 5',
    txtReportOrderName: null,

    reportConfigurationId: null,
    onConfirm: null,

    uiComponents: {
    },

    constructor: function (options) {

        var that = this;

        this.height = (window.innerHeight || document.body.clientHeight) / 2;
        this.width = (window.innerWidth || document.body.clientWidth) / 2;

        Ext.apply(this, options || {});

        
 
        

        this.txtReportOrderName = Ext.create('Ext.form.field.Text', {
            name: "ReportOrderName",
            fieldLabel: config.ttlReportOrderName,
            allowBlank: false,
            value: ""
        });

        this.items = [];
        that.items.push(this.txtReportOrderName);
        var filters = HostApi.ReportFilterGetList(this.reportConfigurationId);
        $.each(filters, function (key, value) {
            var uiFilter = that.createFilterItem(value);
            that.items.push(uiFilter);
        });

        this.buttons = [{
            xtype: 'button',
            text: config.ttlOk,
            handler: function () {
                that.onConfirm();
                that.close();
            }
        }];

        this.callParent(arguments);
    },
    createFilterItem: function (filter) {

        var type = filter.FilterType;
        if (type == "str") {

            var component = Ext.create('Ext.form.field.Text', {
                name: filter.ParameterId,
                fieldLabel: filter.Name,
                allowBlank: false,
                value: filter.DefaultValue
            });

        } else if (type == "number") {

            var component = Ext.create('Ext.form.field.Text', {
                name: filter.ParameterId,
                fieldLabel: filter.Name,
                allowBlank: false,
                value: filter.DefaultValue
            });

        } else if (type == "date") {

            var component = Ext.create('Ext.form.field.Date', {
                name: filter.ParameterId,
                fieldLabel: filter.Name,
                allowBlank: false,
                value: filter.DefaultValue,
                format: "d.m.Y"
            });

        } else if (type == "boolean") {

            var component = Ext.create('Ext.form.field.Checkbox', {
                name: filter.ParameterId,
                fieldLabel: filter.Name,
                allowBlank: false,
                value: filter.DefaultValue
            });

        } else if (type.indexOf('dict') == 0) {

            var component = Ext.create("ManAcc.Dictionaries.PanelDictionaryElementTree", {
                name: filter.ParameterId,
                checkbox: true,
                frame: true,
                //autoScroll: true,
                overflowY: 'scroll',
                overflowX: 'scroll',
                overlapHeader: false,
                collapsible: true,
                allowBlank: false,
                collapsed: false,
                title: filter.Name,
                titleCollapse: true,
                value: filter.DefaultValue,
                idDictionary: filter.PropertyTypeId,
                flex: 1,
                padding: '25 0 0 0',
                margin: '0 0 5 0',
                onValueSelected: function () {
                    var value = that.getValue();
                },
                listeners: {
                    collapse: function (p, eOpts) {
                        var title = p.getTitle();
                        if (title == "") {
                            p.setTitle(filter.Name + ": не выбрано");
                        } else {
                            p.setTitle(filter.Name + ': ' + title);
                        }
                    }
                }
            });


        } else if (type == 'recordclass') {



        } else throw "Unknown type " + type;

        return component;
    },

    getValues: function () {
        var values = new Array();
        for (var key in this.items.items) {
            if ("ReportOrderName" == this.items.items[key].name) continue;
            var value = new Object();
            value.Key = this.items.items[key].name;

            if (this.items.items[key].xtype == "datefield") {
                value.Value = this.items.items[key].getRawValue();
            } else {
                value.Value = this.items.items[key].getValue();
            }
            values.push(value);
        };
        return values;
    },
    getReportOrderName: function () {
        return this.txtReportOrderName.getValue();
    }

});