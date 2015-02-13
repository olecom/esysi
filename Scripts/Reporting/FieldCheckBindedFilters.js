///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

//Поле, таблица со строками-преднастроенными фильтрами и полями для галочек

//Поля для инициализации
//fieldLabel - текстовое обозначение поля
////////Для встраивания в CECPanel имеются поля
//configMember - поле конфигурации со значением

//Методы getValue,setValue
//Значением является идентификатор расчетного параметра, подпись - кратко отображает способ расчета параметра
//Событие 'change', обработчик function(field, newVal, oldVal)

Ext.define("ManAcc.Reporting.FieldCheckBindedFilters", {
    extend: 'Ext.grid.Panel',
    border: false,
    margin: {
        bottom: 5
    },
    flex: 1,
    bodyStyle: 'background:none',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    constructor: function (options) {
        Ext.apply(this, options || {});

        var that = this;
        var value = null;
        var fieldLabel = options.fieldLabel;

        this.addEvents('change');

        var BindedFilterList = HostApi.ReportBindedFilterGetList();

        this.store = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name', 'Check'],
            data: {
                'items': BindedFilterList
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });




        this.columns = [
			{ dataIndex: 'Id', hidden: true },
            { text: 'Применить', dataIndex: 'Check', xtype: 'checkcolumn', width: 68,
                listeners: {
                    checkchange: function (checkcolumn, rowIndex, checked, eOpts) {
                        var oldValue = value;
                        var result = [];
                        that.store.data.each(function (item, index, totalItems) {
                            if (item.data.Check) {
                                result.push(item.data.Id);
                            }
                        });
                        value = result.join().replace(',', ';');
                        that.fireEvent('change', that, value, oldValue);
                    }
                }
            },
			{ text: fieldLabel, dataIndex: 'Name', flex: 1 }
		];


        this.setValue = function (val) {
            value = val || "";            
            var arValue = value.split(';');
            that.store.data.each(function (item, index, totalItems) {
                if (arValue.indexOf(item.data.Id.toString()) != -1) {
                    item.set('Check', true);
                }
            });
        };

        this.getValue = function () {
            return value;
        };

        this.callParent(arguments);
    }
});