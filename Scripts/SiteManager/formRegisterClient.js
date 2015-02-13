///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classFormRegisterClient, {
    viewport: null,
    form: null,

    delautFieldWidth: 350,
    registrationPanelWidth: 400,
    registrationPanelHeight: 500,

    btnRegisterClick: function () {

        var that = this;
        //client validation
        var formData = new Object();

        if (!(that.validateEmail(
            that.form.getForm().findField('EMail').getValue()
            ))) {

            Ext.Msg.show({
                title: config.ttlErrorInReristerAttempt,
                msg: config.ttlInvalidEmail,
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });

            return false;
        }


        if (that.form.getForm().findField('PasswordConfirm').getValue()
                != that.form.getForm().findField('Password').getValue()) {

            Ext.Msg.show({
                title: config.ttlErrorInReristerAttempt,
                msg: config.ttlPasswordAndConfirmDiffer,
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });

            return false;
        }

        var formData = that.form.getForm().getValues();

        //post server validation
        try{
            var msg = HostApi.SiteRegisterByObj(formData);
            Ext.Msg.show({
                title: config.ttlRegistration,
                msg: msg,
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } 
        catch(ex)
        {
            Ext.Msg.show({
                title: config.ttlRegistration,
                msg: ex,
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }

        
      


    },

    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    constructor: function (options) {
        Ext.apply(this, options || {});
        var that = this;

        var captcha = 'http://' + config.domain + '/' + $.cookie("CaptchaImg");

        this.form = Ext.create('Ext.form.Panel', {
            closable: false,
            modal: true,
            title: config.ttlUserRegistration,
            width: that.registrationPanelWidth,
            height: that.registrationPanelHeight,
            buttons: [{
                text: config.ttlRegAndGetLink,
                handler: function () {
                    that.btnRegisterClick();
                }
            }, {
                text: config.ttlAuthorization,
                handler: function () {
                    window.location.href = 'http://' + config.domain + '/'
                }


            }],
            items: [{
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: config.ttlFirstName,
                    name: 'FirstName',
                    labelAlign: 'top',
                    cls: 'field-margin',
                    flex: 1,
                    width: that.delautFieldWidth
                }, {
                    xtype: 'textfield',
                    fieldLabel: config.ttlLastName,
                    name: 'LastName',
                    labelAlign: 'top',
                    cls: 'field-margin',
                    flex: 1,
                    width: that.delautFieldWidth
                }, {
                    xtype: 'textfield',
                    fieldLabel: config.ttlCompanyName,
                    name: 'CompanyName',
                    labelAlign: 'top',
                    cls: 'field-margin',
                    flex: 1,
                    width: that.delautFieldWidth
                }, {
                    xtype: 'textfield',
                    fieldLabel: config.ttlContactPhone,
                    name: 'PhoneNumber',
                    labelAlign: 'top',
                    cls: 'field-margin',
                    flex: 1,
                    width: that.delautFieldWidth
                }, {
                    xtype: 'textfield',
                    fieldLabel: config.ttlEmail,
                    name: 'EMail',
                    labelAlign: 'top',
                    cls: 'field-margin',
                    flex: 1,
                    width: that.delautFieldWidth
                }, {
                    xtype: 'textfield',
                    fieldLabel: config.ttlAdminPassword,
                    inputType: 'password',
                    name: 'Password',
                    labelAlign: 'top',
                    cls: 'field-margin',
                    flex: 1,
                    width: that.delautFieldWidth
                }, {
                    xtype: 'textfield',
                    fieldLabel: config.ttlAdminPasswordConfirm,
                    inputType: 'password',
                    name: 'PasswordConfirm',
                    labelAlign: 'top',
                    cls: 'field-margin',
                    flex: 1,
                    width: that.delautFieldWidth
                }, {
                    xtype: 'textfield',
                    fieldLabel: config.ttlCapthaTextAntiBot,
                    name: 'CaptchaConfirm',
                    labelAlign: 'top',
                    cls: 'field-margin',
                    flex: 1,
                    width: that.delautFieldWidth
                }, {
                    html: '<img src="' + captcha + '">',
                    width: that.delautFieldWidth,
                    height: 50
                }]
            }]
        });

        this.viewport = Ext.create('Ext.container.Viewport', {
            layout: {
                align: 'middle',
                pack: 'center',
                type: 'hbox'
            },
            items: [
                this.form
            ]
        });


    }
});