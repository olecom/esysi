Ext.define("ManAcc.Reporting.WindowSelectClass", {
    extend: 'Ext.window.Window',
    title: config.ttlChooseClass,
    fieldlink: null,
    width: 300,
    height: 400,
    layout: 'fit',
    resizable: true,
    margin: 0,
    padding: 0,
    autoScroll: true,
    modal: true,

    initComponent: function () {
        
        var me = this;
        var choosepanel = Ext.create(config.classFormChooseRecordClass, {
            name: 'fieldValue',
            title: config.ttlValue,
            allowBlank: false,
            value: this.fieldlink ? this.fieldlink.getValue() : ''
        });

        this.items = [choosepanel];

        this.buttons = [{
            text: config.ttlClose,
            handler: function () {
                me.close();
            }
        }, {
            text: config.ttlOk,
            handler: function () {

                var value = choosepanel.getValue();
                var title = choosepanel.getTitle();

                me.fieldlink.setValue(value);
                me.fieldlink.setVisibleValue(title);
                me.close();

            }
        }];

        this.callParent();
    }

});