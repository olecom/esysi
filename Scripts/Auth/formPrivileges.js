///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define(config.classFormPrivileges, {
     constructor: function (options) {

        Ext.apply(this, options || {});

        var that = this;

        this.getMenuItems = function () {

            var partMenu = [
                {
                    id: 'btnUsers',
                    handler: function () { that.btnUsers_Click(); }
                },
                {
                    id: 'btnRoles',
                    handler: function () { that.btnRoles_Click(); }
                },
                {
                    id: 'btnPrivileges',
                    handler: function () { that.btnGrants_Click(); }
                }
            ];

            return partMenu;
        };
    },
    btnUsers_Click: function () {
        var windowUsers = Ext.create("ManAcc.Auth.ManageUsers", {});
        windowUsers.show();
    },
    btnRoles_Click: function () {
        var windowRoles = Ext.create("ManAcc.Auth.ManageRoles", {});
        windowRoles.show();
    },
    btnGrants_Click: function () {
        var windowGrants = Ext.create("ManAcc.Auth.ManageGrants", {});
        windowGrants.show();
    }

});

application.moduleClasses.push(config.classFormPrivileges);