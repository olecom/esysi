///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classFormAuth, {
    
    items: null,
    form: null,
    window: null,
    onSuccessAuth: null,

    constructor: function (options) {
        Ext.apply(this, options || {});
        var that = this;
        this.fillItems();
        this.form = Ext.create('Ext.form.Panel', {
            layout: 'fit',
            border: false,
            frame: false,
            items: this.items,
            bodyStyle: 'background:none',
            margin: 0,
            layout: 0
        });
        this.window = Ext.create('Ext.window.Window', {
            id: 'windowAuth',
            title: config.ttlSiteName,
            height: 250,
            width: 400,
            bodyPadding: 10,
            resizable: false,
            closable: false,
            modal: true,
            margin: 0,
            padding: 0,
            autoScroll: true,
            items: this.form,
            buttons: [{
                itemId: "btnLogin",
                text: config.ttlLogin,
                handler: function () {
                    that.login();
                }
            },
            {
                itemId: "btnLangRus",
                text: "РУС",
                handler: function () {
                    var urlChangeLang = 'http://' + config.domain + '/?lang=ru';
                    window.location.assign(urlChangeLang);

                }
            },
            {
                itemId: "btnLangEng",
                text: "ENG",
                handler: function () {
                    window.location.assign('http://' + config.domain + '/?lang=en');
                }
            },
            {
                itemId: "btnRegistration",
                text: config.ttlRegistration,
                hidden: true,
                handler: function () {
                    window.location.href = 'http://' + config.domain + '/' + config.pageRegisterSite;
                }
            }]
        });
    },

    checkUser: function () {
        if (typeof ($.cookie("sid")) == "undefined") {
            this.window.show();
            return false;
        }

        try {
            HostApi.SessionCheck();
            this.window.close();
            this.onSuccessAuth();
        }
        catch (err) {
            if (this.window.isVisible() != true)
                this.window.show();
            return false;
        }
    },
    fillItems: function () {

        this.items = [{
            
            xtype: 'textfield',
            itemId: 'UserName',
            name: 'UserName',
            fieldLabel: config.ttlUserName,            
            labelAlign: 'top',
            cls: 'field-margin',
            flex: 1,
            width: 300,
            allowBlank: false,
            anchor: '100%'
        }, {
            xtype: 'textfield',
            itemId: 'Password',
            name: 'Password',
            fieldLabel: config.ttlPassword,            
            labelAlign: 'top',
            cls: 'field-margin',
            flex: 1,
            width: 300,
            allowBlank: false,
            anchor: '100%'
        }];

        var txtCid = Ext.create('Ext.form.field.Text',
        {
            fieldLabel: config.ttlCompanyName,
            itemId: 'CompanyName',
            name: 'CompanyName',
            labelAlign: 'top',
            cls: 'field-margin',
            flex: 1,
            width: 300,
            allowBlank: false,
            anchor: '100%',
            readOnly: ((typeof ($.cookie("cid")) != "undefined") && ($.cookie("cid") != "")),
            disabled: ((typeof ($.cookie("cid")) != "undefined") && ($.cookie("cid") != "")),
            listeners: {
                afterrender: function (that, eOpts) {
                    that.getEl().on('dblclick', function () {
                        txtCid.setReadOnly(false);
                        txtCid.enable(true);
                    });
                }
            }

        });
        this.items.push(txtCid);



    },
    show: function () {
        this.window.show();
    },
    login: function () {

        var that = this;
        var formData = this.form.getForm().getValues();

        try {
            response = HostApi.SessionCreateByObj(formData);
            $.cookie('sid', response.sid);
            $.cookie('usr', formData.UserName);
            $.cookie('cid', response.cid);

            that.window.close();
            that.onSuccessAuth();
        }
        catch (err) {
            Ext.Msg.show({
                title: config.ttlAuthorization,
                msg: config.ttlUserNotFoundInSystem,
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR,
                fn: function (btn) {
                    if (btn == 'ok') {
                        if (err == "clear") {
                            $.removeCookie("cid");
                            window.location.assign('http://' + config.domain + '/');
                            //location.reload(true, null);
                        }
                    }
                }
            });
        }
    }
});