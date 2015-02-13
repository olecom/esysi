///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define("ManAcc.Auth.ManageRoles", {
    extend: 'Ext.window.Window',
    id: 'windowRoles',
    title: config.ttlRoles,
    height: 500,
    width: 450,
    bodyPadding: 10,
    resizable: false,
    modal: true,
    margin: 0,
    padding: 0,
    autoScroll: true,
    constructor: function (options) {

        Ext.apply(this, options || {});

        var that = this;


        var responseRoles = HostApi.RoleGetList()
        responseRoles = $(responseRoles).translate('Name');
        var roleStore = Ext.create('Ext.data.Store', {
            fields: ['Id', 'Name'],
            autoLoad: true,
            data: { 'items': responseRoles },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        var gridRoles = Ext.create('Ext.grid.Panel', {
            width: 415,
            height: 360,
            store: roleStore,
            columns: [
                { text: 'Id', dataIndex: 'Id', hidden: true },
                { text: config.ttlRole, dataIndex: 'Name', flex: 1, width: 400 }
            ],
            listeners: {
                select: function (dv, record, item, index, e) {
                    gridRoles.lastSelectedRoleId = record.data.Id;
                    formRoleProperties.getForm().setValues([{ id: "Name", value: record.data.Name}]);
                }
            }
        });

        var formRoleProperties = Ext.create('Ext.form.Panel', {
            xtype: "form",
            frame: false,
            border: false,
            buttonAlign: 'left',
            bodyStyle: 'background:none',
            margin: '0 0 5 0',
            width: 400,
            height: 55,
            items: [{
                xtype: 'textfield',
                fieldLabel: config.ttlRole,
                name: 'Name',
                allowBlank: false,
                width: 350
            }],
            buttons: [{
                text: config.ttlSaveChanges,
                handler: function () {
                    var role = formRoleProperties.getForm().getValues();
                    role.Id = gridRoles.lastSelectedRoleId;

                    HostApi.RoleModifyByObj(role);
                    var responseRoles = HostApi.RoleGetList()
                    roleStore.loadRawData({ 'items': responseRoles });

                }
            }, {
                text: config.ttlSaveAsNew,
                handler: function () {

                    var RoleName = formRoleProperties.getForm().getValues();
                    HostApi.RoleAddByObj(RoleName);
                    var responseRoles = HostApi.RoleGetList()
                    roleStore.loadRawData({ 'items': responseRoles });

                }
            }, {
                text: config.ttlDelete,
                handler: function () {

                    HostApi.RoleDelete(gridRoles.lastSelectedRoleId);
                    var responseRoles = HostApi.RoleGetList()
                    roleStore.loadRawData({ 'items': responseRoles });

                }
            }]
        });
         
        this.items = [
            formRoleProperties,
            gridRoles
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