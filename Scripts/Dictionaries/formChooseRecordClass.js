///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classFormChooseRecordClass, {
    extend: 'Ext.grid.Panel',
    /*Panel*/
    frame: false,
    width: 400,
    height: 400,
    /*New Fields*/
    window: null,
    value: null,
    onValueSelected: null,
    checkbox: true,

    initComponent: function (options) {
        Ext.apply(this, options || {});
        var that = this;

        if (this.checkbox) {
            this.columns = [
		        { text: 'Id', dataIndex: 'Id', hidden: true },
                { text: 'check', dataIndex: 'Checked', xtype: 'checkcolumn' },
		        { text: config.ttlClass, dataIndex: 'Name', flex: 1 }
	        ];
        } else {

            this.columns = [
		        { text: 'Id', dataIndex: 'Id', hidden: true },
		        { text: config.ttlClass, dataIndex: 'Name', flex: 1 }
	        ];
        }

        this.store = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Checked', 'Name'],
            data: {
                'items': [],
                idProperty: 'Id'
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });
        var classes = HostApi.ClassGetList();
        this.store.loadRawData({ 'items': classes });


        this.callParent();
        this.setValue(this.value);
    },
    getValue: function () {
        var that = this;
        var val = '';
        that.store.data.each(function (item, index, totalItems) {
            if (item.data.Checked) {
                val += item.data.Id + ';';
            }
        });
        return val;
    },
    getTitle: function () {

        var that = this;
        var val = '';
        that.store.data.each(function (item, index, totalItems) {
            if (item.data.Checked) {
                val += item.data.Name + ' ';
            }
        });
        return val;

    },
    setValue: function (value) {
        var that = this;
        var ar = [];

        if ((typeof that.value != 'undefined')
            && (that.value != null)
            && (that.value.length > 0)) {

            ar = value.split(';');

        }

        for (var i = 0; i < ar.length; i++) {
            ar[i] = parseInt(ar[i], 10);
        }

        for (i = 0; i < that.store.getCount(); i++) {
            var rec = that.store.getAt(i);
            if (ar.indexOf(rec.data.Id) != -1) {
                rec.set('Checked', true);
            }
        }
    }
});