///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

//Поле, позволяющее задать способ рассчета значения в строке/столбце,
//настроив расчетный параметр

//Поля для инициализации
//reportBlockId - идентификатор отчетного блока для которого задается расчетный параметр
//reportConfigurationId - идентификатор конфигурации отчета
//fieldLabel - текстовое обозначение поля
////////Для встраивания в CECPanel имеются поля
//configMember - поле конфигурации со значением
//configMemberTitle - поле конфигурации для задания начальной подписи

//Методы getValue,setValue,getTitle,setTitle,isDirty
//Значением является идентификатор расчетного параметра, подпись - кратко отображает способ расчета параметра
//Событие 'change', обработчик function(field, newVal, oldVal) - изменение значения

Ext.define("ManAcc.Reporting.FieldCalculationParameter", {
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
        var isDirty = false;
        var parameterConfiguration = null;
        var value = null;
        var fieldLabel = options.fieldLabel;
        var ReportConfigurationId = options.reportConfigurationId;
        var ReportBlockId = options.reportBlockId;

        this.addEvents('change');

        var сlearCalculatingFormula = function () {

            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?',
                function (btn) {
                    if (btn == 'no') return;
                    isDirty = true;
                    that.setTitle("");
                    that.setValue(null);
                    var pcId = (parameterConfiguration == null) ? null : parameterConfiguration.Id;
                    that.fireEvent('change', that, null, pcId);
                }
            );
        }

        var setCalculatingFormula = function () {

            if (!isDirty) {
                if (value != null) {
                    parameterConfiguration = HostApi.ReportParameterGet(value);
                } else {
                    parameterConfiguration = {};
                }
            }

            var s = Ext.create(config.classDialogReportParameter, {
                configuration: Ext.clone(parameterConfiguration || {}),
                parameterNameReadOnly: true,
                onSave: function (configurationNew) {
                    if (configurationNew.Id != parameterConfiguration.Id)
                        that.fireEvent('change', that, configurationNew.Id, parameterConfiguration.Id);
                    isDirty = true;
                    parameterConfiguration = configurationNew;
                    that.setTitle(
                        parameterConfiguration.CalculationType + " " +
                        parameterConfiguration.AggregateFunction + " " +
                        parameterConfiguration.ArithmeticExpression
                    );
                }
            });

            s.show();
        }

        var txtCalcParameter = Ext.create('Ext.form.field.Text', {
            fieldLabel: fieldLabel,
            flex: 1,
            blankText: 'Нет расчета',
            allowBlank: true,
            readOnly: true,
            listeners: {
                afterrender: function (c) {
                    c.inputEl.on('dblclick', function () {
                        setCalculatingFormula();
                    });
                }
            }
        });

        var btnClearCalculating = Ext.create('Ext.button.Button', {
            text: 'X',
            handler: сlearCalculatingFormula,
            scope: this
        });
        var btnSetCalculating = Ext.create('Ext.button.Button', {
            text: '...',
            handler: setCalculatingFormula,
            scope: this
        });

        this.items = [
            txtCalcParameter,
            btnSetCalculating,
            btnClearCalculating
        ];

        this.setTitle = function (title) {
            txtCalcParameter.setValue(title);
        };

        this.getTitle = function () {
            return txtCalcParameter.getValue();
        };

        this.setValue = function (val) {
            value = val;
            if (value == null) parameterConfiguration = null;
        };

        this.getValue = function () {
            return value;
        };

        this.getCalculationParameterConfiguration = function () {
            if (parameterConfiguration != null) {
                parameterConfiguration.ReportConfigurationId = ReportConfigurationId;
                parameterConfiguration.ReportBlockId = ReportBlockId;
                parameterConfiguration.Id = value;
            }
            return parameterConfiguration;
        };

        this.isDirty = function () {
            return isDirty;
        };

        this.callParent(arguments);
    }
});