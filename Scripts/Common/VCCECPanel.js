///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

//Класс контролирующий видимость элементов Visibility Control CECPanel (Configuration-Event Controller-Panel)
//Нужно определить ссылки в объекте состояний vcStates
//И функцию которая по конфигурации сможет вычислить состояние видимости

Ext.define("ManAcc.Common.VCCECPanel", {

    extend: 'ManAcc.Common.CECPanel',
    vcStates: {},
    vcCurrentState: null,
    constructor: function (options) {
        Ext.apply(this, options || {});
        this.vcCurrentState = this.configToVcState(this.configuration);
        this.callParent(arguments);
        this.on(
            'configpropertychanged',
            this.onConfigPropertyChanged,
            this
        );
        this.on(
            'render',
            this.startState,
            this
        );
    },
    configToVcState: function () {
        throw "Method configToVcState is not overriden";
    },
    vcEqual: function (a, b) {
        return a.id == b.id;
    },
    onConfigPropertyChanged: function (that, eOpts /*eOpts{oldVal,newVal,propName}*/) {
        var conf = Ext.clone(this.configuration);
        conf[eOpts.propName] = eOpts.newVal;
        var newVcState = this.configToVcState(conf);

        if (this.vcCurrentState != newVcState) {
            var stateElementsFrom = this.vcStates[this.vcCurrentState];
            var stateElementsTo = this.vcStates[newVcState];
            //находим разницу
            var changes = Delta.getDelta(stateElementsFrom, stateElementsTo, this.vcEqual);
            //то что добавилось делаем видимым
            for (var i = 0; i < changes.added.length; i++) {
                changes.added[i].setVisible(true);
            }
            //то что убралось делаем невидимым
            for (var i = 0; i < changes.deleted.length; i++) {
                changes.deleted[i].setVisible(false);
            }
        }

        this.vcCurrentState = newVcState;
    },
    startState: function () {
        var cmps = Ext.ComponentQuery.query('component[configMember]', this);
        for (var i = 0; i < cmps.length; i++) {
            if (typeof cmps[i].configMember != 'undefined') {
                cmps[i].setVisible(false);
            }
        }
        var conf = Ext.clone(this.configuration);
        var newVcState = this.vcStates[ this.configToVcState(conf) ];
        for (var i = 0; i < newVcState.length; i++) {
            newVcState[i].setVisible(true);
        }
    }
});