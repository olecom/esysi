///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

//Поле позволяющее установить ссылку на блок в контексте:
//конфигурации отчета и направления разбиения (строки/столбцы)

//Поля для инициализации
//divideDirection - RowDivide/ColumnDivide
//reportConfigurationId - идентификатор конфигурации отчета
//fieldLabel - текстовое обозначение поля
////////Для встраивания в CECPanel имеются поля
//configMember - поле конфигурации со значением
//configMemberTitle - поле конфигурации для задания начальной подписи

//Методы getValue,setValue,getTitle,setTitle
//Событие 'change', обработчик function(field, newVal, oldVal)

Ext.define("ManAcc.Reporting.FieldLinkReportBlock", {
    extend: 'Ext.panel.Panel',
    border: false,
    margin: {
        bottom: 5
    },
    bodyStyle: 'background:none',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    constructor: function (options) {
        Ext.apply(this, options || {});

        var that = this;
        var value = null;
        var reportConfigurationId = options.reportConfigurationId;
        var divideDirection = options.divideDirection;
        var fieldLabel = options.fieldLabel;

        this.addEvents('change');
        var btnChooseReportBlock = function () {
            var wnd = Ext.create(config.classDialogChooseCrossReportBlock, {
                SelectedReportBlockId: value,
                ReportConfigurationId: reportConfigurationId,
                TreeType: divideDirection,
                onSelect: function (newVal, newTitle) {
                    that.fireEvent('change', that, newVal, value);
                    value = newVal;
                    txtLinkReportBlock.setValue(newTitle);
                    wnd.close();
                }
            });
            wnd.show();
        }

        var txtLinkReportBlock = Ext.create('Ext.form.field.Text', {
            fieldLabel: fieldLabel,
            flex: 1,
            hideLabel: false,
            editable: false,
            listeners: {
                afterrender: function (c) {
                    c.inputEl.on('dblclick', function () {
                        btnChooseReportBlock();
                    });
                }
            }
        });

        var btnSetLinkReportBlock = Ext.create('Ext.button.Button', {
            text: '...',
            handler: btnChooseReportBlock,
            scope: this
        });

        this.items = [
            txtLinkReportBlock,
            btnSetLinkReportBlock
        ];

        this.setTitle = function (title) {
            txtLinkReportBlock.setValue(title);
        };

        this.getTitle = function () {
            return txtLinkReportBlock.getValue();
        };

        this.setValue = function (val) {
            value = val;
        };

        this.getValue = function () {
            return value;
        }

        this.callParent(arguments);
    }
});