///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classDialogSimpleDelimiterEmpty, {

    extend: 'Ext.window.Window',
    title: 'Сумма дочерних',
    modal: true,

    items: null,
    buttons: null,

    txtBlockName: null,
    configuration: {
        Type: null,
        ParentId: null,
        ReportConfigurationId: null,
        Title: null
    },

    constructor: function (options) {
        var that = this;

        Ext.apply(this, options || {});

        this.buttons = [{
            xtype: 'button',
            text: 'Ok',
            handler: function () {
                that.createSimpleDelimiter();
            }
        }];

        this.txtBlockName = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Имя блока',
            name: 'fieldValue',
            allowBlank: false
            //value: that.value
        });

        this.items = [this.txtBlockName];
        this.callParent(arguments);
    },
    createSimpleDelimiter: function () {
        var that = this;

        that.configuration.Title = that.txtBlockName.getValue();
        that.configuration.DivideType = 'nodelimiter';

        var id = HostApi.ReportCrossBlockSetByObj(that.configuration);

        this.close();
        this.onSuccess(id);
        
    }
});