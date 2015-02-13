///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classMenuReporting, {
    windowDictionaryEdit: null,
    constructor: function (options) {

        Ext.apply(this, options || {});

        var that = this;

        this.getMenuItems = function () {

            var partMenu = [
                    {
                        id: 'btnReportBlockAlgorithms',
                        endsWithId: false,
                        handler: function () { that.btnOpenReportBlockAlgorithmsList_Click(); }
                    }, {
                        id: 'btnBindedFilters',
                        endsWithId: false,
                        handler: function () { that.btnOpenBindedFiltersList_Click(); }
                    }, {
                        id: 'btnOpenReportConfiguration',
                        endsWithId: false,
                        handler: function () { that.btnOpenReportConfiguration_Click(); }
                    }, {
                        id: 'btnReportPrint',
                        endsWithId: false,
                        handler: function () { that.btnShowReportPrint_Click(); }
                    }, {
                        id: 'btnShowReportQueue',
                        endsWithId: false,
                        handler: function () { that.btnShowReportQueue_Click(); }
                    }, {
                        id: "btnReport_",
                        endsWithId: true,
                        handler: function (id,title) {
                            var dictForm = Ext.create(config.classFormDictionaryEdit,
                            {
                                idDictionary: id
                            });
                        }
                    }
                ];
            return partMenu;
        };
    },
    btnOpenReportConfiguration_Click: function () {
        var that = this;
        this.windowReportConfiguration = Ext.create(config.classDialogSelectReportConfiguration, {
            onSelect: function (selectedReportId) {
                this.windowReportConfiguration = Ext.create(config.classWindowReportConfiguration, {
                    configuration: {
                        reportName: null,
                        reportGroupId: null,
                        reportFormType: null,
                        reportConfigurationId: selectedReportId
                    }
                    
                });
                this.windowReportConfiguration.show();
            },
            configReport: true
        });
        this.windowReportConfiguration.show();
    },
    btnShowReportPrint_Click: function () {
        var that = this;
        this.windowReportConfiguration = Ext.create(config.classDialogSelectReportConfiguration, {
            onSelect: function (selectedReportId) {

                var dlgReportOrder =
                    Ext.create(config.classDialogMakeReportOrder, {
                        reportConfigurationId: selectedReportId,
                        onConfirm: function () {
                            var reportOrderData = dlgReportOrder.getValues();
                            var data= {
                                    reportOrderName: dlgReportOrder.getReportOrderName(),
                                    reportConfigurationId: selectedReportId,
                                    paramValues: $.toJSON(reportOrderData)
                                };
                            
                            HostApi.ReportOrderCreateByObj(data);

                            $(application).trigger("ReportOrderQueueUpdated");
                        }
                    });

                dlgReportOrder.show();
            }
        });
        this.windowReportConfiguration.show();
    },
    btnShowReportQueue_Click: function () {
        var that = this;
        var wnd = Ext.create(config.classDialogReportQueue, {});
        wnd.show();
    },
    btnOpenBindedFiltersList_Click: function () {
        var that = this;
        var wnd = Ext.create(config.classWindowBindedFiltersList, {});
        wnd.show();
    },
    btnOpenReportBlockAlgorithmsList_Click: function () {
        var that = this;
        var wnd = Ext.create(config.classWindowReportBlockAlgorithmsList, {});
        wnd.show();
    },
    getReportMenuItems: function () {
        var mi = null;
        var res = [];
        if (mi != null) {
            for (i = 0; i < mi.length; i++) {

                var id = mi[i].Id;

                (function (val) {
                    res.push(
                {
                    id: "btnReport_" + mi[i].Id,
                    text: mi[i].Name,
                    handler: function () {
                        var dictForm = Ext.create(config.classFormDictionaryEdit,
                                        {
                                            idDictionary: val
                                        });
                    }
                });
                })(id);
            }
        }
        return res;
    }
});

application.moduleClasses.push(config.classMenuReporting);