///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define("ManAcc.Reporting.WindowCrossReportBlock", {
    extend: 'Ext.window.Window',
    autoGenId: true,
    title: config.ttlReportBlock,
    modal: true,
    maximizable: true,
    maximized: true,
    closable: true,
    height: 500,
    width: 500,
    layout: 'fit',
    items: [],
    buttons: [],
    view: null,
    idCrossReportBlock: null,
    onSave: null,

    parameterConfiguration: null,

    constructor: function (options) {

        Ext.apply(this, options || {});
        var conf = null;
        if (this.idCrossReportBlock != null) {
            conf = HostApi.ReportCrossBlockGet(this.idCrossReportBlock);

        } else {
            conf = {
                Type: options.Type,
                ParentId: options.ParentId,
                ReportConfigurationId: options.ReportConfigurationId
            };
        }
        if (typeof options.AlgorithmOwnerId != "undefined") conf.AlgorithmOwnerId = options.AlgorithmOwnerId;
        this.view = Ext.create("ManAcc.Reporting.PanelCrossReportBlock", {
            configuration: conf
        });
        this.items = [this.view];

        this.buttons = [
            Ext.create('Ext.button.Button', {
                text: config.ttlOk,
                handler: this.btnOkClick,
                scope: this
            })
        ];

        this.callParent(arguments);
    },

    btnOkClick: function () {
        if (this.view.configuration.DivideType == null) {
            Ext.Msg.show({
                title: config.ttlAuthorization,
                msg: "Необходимо заполнить поле Тип разделителя",
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }
        if ((this.view.configuration.Title == null)
         || (this.view.configuration.Title == "")) {
            Ext.Msg.show({
                title: config.ttlAuthorization,
                msg: "Необходимо заполнить поле Название",
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }
        var reportBlockId = HostApi.ReportCrossBlockSetByObj(this.view.configuration);
        if (this.view.isParameterConfigurationDirty()) {
            var p = this.view.getParameterConfiguration();
            
            if (p != null) {
                p.Name = this.view.configuration.Alias;
                HostApi.ReportParameterSaveByObj(p);
            }
        }
        this.onSave(reportBlockId);
        this.close();
    }

});