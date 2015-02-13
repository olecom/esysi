Ext.define("ManAcc.Reporting.FieldLinkClass", {
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

        this.addEvents('change');
        var btnChooseReportBlock = function () {
            var wnd = Ext.create("ManAcc.Reporting.WindowSelectClass", { fieldlink: that });
            wnd.show();
        }
		
		var сlearCalculatingFormula = function () {

            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?',
                function (btn) {
                    if (btn == 'no') return;
                    that.setTitle("");
                    that.setValue(null);
                    that.fireEvent('change', that, null, null);
                }
            );
        }
		

        var txtLinkReportBlock = Ext.create('Ext.form.field.Text', {
            flex: 1,
			fieldLabel: options.fieldLabel,
            hideLabel: false,
            editable: false,
            listeners: {
                afterrender: function (c) {
                    c.inputEl.on('dblclick', function () {
                        btnChooseReportBlock();
                    });
                },
				change: function (th, newVal, oldVal) {
                       	that.fireEvent('change', that, that.getValue(), null);		  
				}
            }
        });

        var btnSetLinkReportBlock = Ext.create('Ext.button.Button', {
            text: '...',
            handler: btnChooseReportBlock,
            scope: this
        });

		var btnClearCalculating = Ext.create('Ext.button.Button', {
            text: 'X',
            handler: сlearCalculatingFormula,
            scope: this
        });
		
		
        this.items = [
            txtLinkReportBlock,
            btnSetLinkReportBlock,
			btnClearCalculating
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
		
		this.setVisibleValue = function(val) {
		    txtLinkReportBlock.setValue(val);  
		}
		
        this.getValue = function () {
            return value;
        }

        this.callParent(arguments);
    }
});