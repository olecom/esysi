///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

//CECPanel (Configuration-Event Controller-Panel)
Ext.define("ManAcc.Common.CECPanel", {

    extend: 'Ext.panel.Panel',
    items: [],
    buttons: [],
    configuration: {},

    constructor: function (options) {
        Ext.apply(this, options || {});
        this.addEvents('configpropertychanged');
        this.callParent(arguments);
        this.watchForConfiguration();
        this.watchForItems();
        this.applyValuesToFormFields();
        this.applyTitlesToFormFields();
    },

    //метод для отображения Configuration в компоненты panel, вызывается из конструктора
    applyValuesToFormFields: function () {
        var cmps = Ext.ComponentQuery.query('component[configMember]', this);
        for (var i = 0; i < cmps.length; i++) {
            if (typeof cmps[i].configMember != 'undefined') {
                var val = this.configuration[cmps[i].configMember]
                cmps[i].suspendEvents(false);
                cmps[i].setValue(val);
                cmps[i].resumeEvents();
                //Поиск ошибок
                if (val != cmps[i].getValue()) {
                    //Исключаем известные ошибки
                    if (!((typeof val == 'undefined') && (cmps[i].getValue() == "") || (cmps[i].xtype == "textfield")))
                        throw 'Ошибка в эквивалентности гет и сет значения ' + cmps[i].configMember;
                }
            }
        }
    },

    //метод для отображения Configuration в компоненты panel, вызывается из конструктора
    applyTitlesToFormFields: function () {
        var cmps = Ext.ComponentQuery.query('component[configMemberTitle]', this);
        for (var i = 0; i < cmps.length; i++) {
            if (typeof cmps[i].configMemberTitle != 'undefined') {
                var title = this.configuration[cmps[i].configMemberTitle];
                if (title != null) cmps[i].setTitle(title);
                else cmps[i].setTitle("");
            }
        }
    },

    //метод запускает отслеживание изменений в полях пользовательского интерфейса, вызывается из конструктора
    watchForItems: function () {
        var cmps = Ext.ComponentQuery.query('component[configMember]', this);
        var that = this;
        for (var i = 0; i < cmps.length; i++) {

            if (typeof cmps[i].configMember != 'undefined') {

                if (cmps[i] instanceof Ext.form.field.Text) {
                    cmps[i].on(
                        'blur',
                        function (field, The, eOpts) {

                            that.configuration[field.configMember] = field.getValue();

                        },
                        this
                    );
                }
                else {
                    
                    cmps[i].on(
                        'change',
                        function (field, newVal, oldVal, eOpts) {

                            that.configuration[field.configMember] = newVal;

                        },
                        this
                    );
                }
            }
        }
    },
    //метод запускающий отслеживание изменений конфигурации, вызывается из конструктора
    watchForConfiguration: function () {
        var that = this;
        for (var property in this.configuration) {
            if (this.configuration.hasOwnProperty(property)) {
                Object.watch(
                    this.configuration,
                    property,
                    function (propName, oldVal, newVal) {//(this, prop, oldval, val)
                        that.propertyChanged(propName, oldVal, newVal);
                        return newVal;
                    }
                );
            }
        }
    },
    //метод срабатывает при изменении конфигурации, вызывается из watchForConfiguration
    propertyChanged: function (propName, oldVal, newVal) {
        this.fireEvent('configpropertychanged', this, { propName: propName, oldVal: oldVal, newVal: newVal });
        var cmps = Ext.ComponentQuery.query('component[configMember=' + propName + ']', this);
        for (var i = 0; i < cmps.length; i++) {
            cmps[i].suspendEvents(false);
            cmps[i].setValue(newVal);
            cmps[i].resumeEvents();
        }
    }
});