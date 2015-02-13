///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define("ManAcc.Dictionaries.WindowDictionaryDelete", {
    extend: 'Ext.window.Window',
    id: 'windowDictDelList',
    title: config.ttlDictionary,
    height: 500,
    width: 450,
    bodyPadding: 10,
    resizable: false,
    modal: true,
    autoShow: false,
    margin: 0,
    padding: 0,
    autoScroll: true,

    constructor: function (options) {
        Ext.apply(this, options || {});
        var that = this;
        var dictStore = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: { 'items': HostApi.DictionaryGetList() },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });
        var grid = Ext.create('Ext.grid.Panel', {
            title: config.ttlProperties,
            store: dictStore,
            columns: [
                { text: 'Id', dataIndex: 'Id', hidden: true },
                { text: 'Name', dataIndex: 'Name', flex: 1 }

            ],
            height: 400,
            width: 410,
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {
                    HostApi.DictionaryDelete(record.data.Id);
                    $(application).trigger("DeleteToolberMenuButton", [record.data.Id]);
                    dictStore.loadRawData({ 'items': HostApi.DictionaryGetList() });
                }
            }
        });

        this.items = [
            grid
        ];

        this.buttons = [{
            text: config.ttlClose,
            handler: function () {
                that.close();
            }
        }];

        this.callParent(arguments);
    }
});