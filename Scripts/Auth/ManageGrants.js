///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define("ManAcc.Auth.ManageGrants", {
    extend: 'Ext.window.Window',
    title: config.ttlGrants,
    height: 470,
    width: 550,
    bodyPadding: 5,
    resizable: false,
    modal: true,
    margin: 0,
    padding: 0,
    autoScroll: true,
    layout: 'column',
    constructor: function (options) {

        Ext.apply(this, options || {});

        var that = this;

        var RolesUnionUsers = HostApi.RoleUserGetList();

        RolesUnionUsers = $(RolesUnionUsers).translate('Name');

        var RolesUnionUsersStore = Ext.create('Ext.data.Store', {
            fields: ['Id', 'isUser', 'Name'],
            autoLoad: true,
            data: { 'items': RolesUnionUsers },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        var GrantsStore = Ext.create('Ext.data.Store', {
            fields: ['Id', 'isGranted', 'MenuTitle'],
            autoLoad: true,
            data: { 'items': [] },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        var gridUsersRoles = Ext.create('Ext.grid.Panel', {
            width: 150,
            height: 400,
            margin: '0 10 0 0',
            store: RolesUnionUsersStore,
            columns: [
                { text: 'Id', dataIndex: 'Id', hidden: true },
                { text: 'isUser', dataIndex: 'isUser', hidden: true },
                { text: config.ttlUser + '/' + config.ttlRole, dataIndex: 'Name', flex: 1, width: 400 }
            ],
            listeners: {
                select: function (dv, record, item, index, e) {
                    gridUsersRoles.lastSelectedId = record.data.Id;
                    gridUsersRoles.isUser = record.data.isUser;
                    var response = HostApi.PrivilegeGetList(record.data.Id, record.data.isUser);
                    response = $(response).translate('MenuTitle')
                    GrantsStore.loadRawData({ 'items': response });
                }
            }
        });

        var gridGrants = Ext.create('Ext.grid.Panel', {
            width: 370,
            height: 400,
            store: GrantsStore,
            columns: [
                { text: 'Id', dataIndex: 'Id', hidden: true },
                {
                    text: config.ttlGrant,
                    dataIndex: 'isGranted',
                    width: 70,
                    xtype: 'checkcolumn',
                    listeners: {
                        checkchange: function (column, recordIndex, checked) {
                            var idGrant = GrantsStore.data.getAt(recordIndex).data.Id;
                            var idUser = gridUsersRoles.lastSelectedId;
                            var isUser = gridUsersRoles.isUser;
                            HostApi.PrivilegeSet(idUser, idGrant, checked, isUser);
                        }
                    }
                },
                { text: config.ttlAction, dataIndex: 'MenuTitle', flex: 1, width: 150 }
            ],
            listeners: {
                select: function (dv, record, item, index, e) {
                    //gridRoles.lastSelectedRoleId = record.data.Id;
                    //formRoleProperties.getForm().setValues([{id:"Name",value:record.data.Name}]);
                }
            }
        });
        this.items = [
            gridUsersRoles,
            gridGrants
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