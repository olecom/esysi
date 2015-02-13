///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define("ManAcc.Auth.ManageUsers", {
    extend: 'Ext.window.Window',
    id: 'windowUsers',
    title: config.ttlUsers,
    height: 500,
    width: 550,
    bodyPadding: 10,
    resizable: false,
    modal: true,
    margin: 0,
    padding: 0,
    autoScroll: true,   

    constructor: function (options) {

        Ext.apply(this, options || {});

        var that = this;
        var responseUsers = HostApi.UserGetList();
        var userStore = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Login', 'Name', 'Role', 'Role_Id'],
            data: { 'items': responseUsers },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        var responseRoles = HostApi.RoleGetList()

        var roleStore = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            data: { 'items': responseRoles },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        var gridUsers = Ext.create('Ext.grid.Panel', {
            store: userStore,
            columns: [
                { text: 'Id', dataIndex: 'Id', hidden: true },
                { text: config.ttlLogin, dataIndex: 'Login', flex: 1 },
                { text: config.ttlUser, dataIndex: 'Name' },
                { text: config.ttlRole, dataIndex: 'Role' },
                { text: 'Роль', dataIndex: 'Role_Id', hidden: true }
            ],
            width: 515,
            height: 250,
            listeners: {
                select: function (dv, record, item, index, e) {

                    gridUsers.lastSelectedUserId = record.data.Id;
                    formUserProperties.getForm().setValues([
                        {
                            id: "Name",
                            value: record.data.Name
                        }, {
                            id: "Login",
                            value: record.data.Login
                        }, {
                            id: "Role",
                            value: record.data.Role_Id
                        }, {
                            id: "Password",
                            value: ""
                        }]);
                }
            }
        });

        var formUserProperties = Ext.create('Ext.form.Panel', {
            height: 200,
            frame: false,
            border: false,
            buttonAlign: 'left',
            bodyStyle: 'background:none',
            margin: '0 0 5 0',
            width: 400,
            height: 150,
            defaults: {
                width: 350
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: config.ttlLastNameAndInitials,
                name: 'Name',
                allowBlank: false
            }, {
                xtype: 'textfield',
                fieldLabel: config.ttlLogin,
                name: 'Login',
                allowBlank: false
            }, {
                xtype: 'textfield',
                fieldLabel: config.ttlPassword,
                emptyText: config.ttlEnterNewPassword,
                name: 'Password',
                allowBlank: true
            }, {
                xtype: 'combobox',
                fieldLabel: config.ttlRole,
                name: 'Role',
                store: roleStore,
                queryMode: 'local',
                displayField: 'Name',
                valueField: 'Id',
                allowBlank: true
            }],
            buttons: [{
                text: config.ttlSaveChanges,
                handler: function () {

                    var user = formUserProperties.getForm().getValues();
                    user.Id = gridUsers.lastSelectedUserId;
                    HostApi.UserModifyByObj(user);

                    var responseUsers = HostApi.UserGetList();
                    userStore.loadRawData({ 'items': responseUsers });

                }
            }, {
                text: config.ttlSaveAsNew,
                handler: function () {

                    var user = formUserProperties.getForm().getValues();
                    HostApi.UserAddByObj(user);
                    var responseUsers = HostApi.UserGetList();
                    userStore.loadRawData({ 'items': responseUsers });

                }
            }, {
                text: 'Удалить',
                handler: function () {

                    HostApi.UserDelete(gridUsers.lastSelectedUserId);
                    var responseUsers = HostApi.UserGetList();
                    userStore.loadRawData({ 'items': responseUsers });

                }
            }]
        });

        this.items = [
                formUserProperties,
                gridUsers
            ];

        this.buttons = [{
            text: config.ttlClose,
            handler: function () {
                that.close();
            }
        }];

        this.callParent(arguments);
    }
});