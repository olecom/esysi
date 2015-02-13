///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define("ManAcc.DataInput.WindowDataInputFormConfigurationOpen", {
    extend: 'Ext.window.Window',
    title: config.ttlDataInput,
    height: 500,
    width: 450,
    bodyPadding: 10,
    resizable: false,
    modal: true,
    margin: 0,
    padding: 0,
    autoScroll: true,
    constructor: function (options) {

        Ext.apply(this, options || {});
        var that = this;
 
        var items = HostApi.DataInputFormGetList();
        var dictStore = Ext.create('Ext.data.Store', {

            fields: ['Id', 'Name'],
            data: { 'items': items },
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
                { text: config.ttlName, dataIndex: 'Name', flex: 1 }

            ],
            height: 400,
            width: 410,
            listeners: {
                itemdblclick: function (grid, record, item, index, e, eOpts) {
                    Ext.create(config.classDialogDataInputConfiguration, {
                        configuration: {
                            Name: record.data.Name,
                            idDataInputForm: record.data.Id
                        }
                    }).show();
                }
            }
        });

        this.items = [grid];
        this.buttons = [{
            text: config.ttlClose,
            handler: function () {
                that.close();
            }
        }];
        this.callParent(arguments);
    }
});