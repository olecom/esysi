///<reference path="..\\..\\..\\ManAcc_HostApp\\Scripts\\_references.js" />

Ext.define('Ext.ux.Wizard', {
    extend: 'Ext.window.Window',
    //alias: 'widget.wizard',
    cls: 'wizard',
    title: 'Wizard',
    //autoHeight: true,
    border: false,
    layout: 'card',
    activeItem: 0,
    inWizard: false,
    includeSubTitle: false,

    maximizable: true,
    buttons: [],

    btnFinish: null,
    btnNext: null,
    btnPrevious: null,
    btnCancel: null,

    constructor: function (options) {

        var that = this;
        Ext.apply(this, options || {});

        this.btnCancel = {
            text: config.ttlCancel,
            itemId: 'cancel',
            action: 'cancelWizard',
            scope: this,
            handler: function (cancel) {
                var wizard = that; // cancel.up('wizard');
                if (wizard.getForm().isDirty()) {
                    Ext.Msg.show({
                        scope: this,
                        title: 'Cancelling Wizard',
                        msg: 'All changes will be lost. Are you sure you want to cancel?',
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.Msg.QUESTION,
                        fn: function (buttonId, text, opt) {
                            switch (buttonId) {
                                case 'yes':
                                    wizard.fireEvent('wizardcancelled', wizard);
                                    break;
                                case 'no':
                                    break;
                            }
                        }
                    });
                } else {
                    wizard.fireEvent('wizardcancelled', wizard);
                }
            }
        };
        this.btnPrevious = {
            text: config.ttlPreviousStep,
            itemId: 'prev',
            action: 'prevWizard',
            hidden: true,
            scope: this,
            handler: function (prev) {
                var wizard = that; //prev.up('wizard');

                if (isNumber(wizard.getActiveItem().jumpOverIfBack))
                    wizard.activeItem -= wizard.getActiveItem().jumpOverIfBack;

                that.setActiveItem(--wizard.activeItem);
                wizard.fireEvent('wizardpagechange', wizard);
                wizard.fireEvent('wizardprev', wizard);
            }
        };
        this.btnNext = {
            text: config.ttlNextStep,
            itemId: 'next',
            action: 'nextWizard',
            scope: this,
            handler: function (next) {
                var wizard = that; // next.up('wizard');

                if (typeof (this.getActiveItem().onNextStep) != 'undefined')
                    this.getActiveItem().onNextStep();

                if (isNumber(wizard.getActiveItem().jumpOverIfNext))
                    wizard.activeItem += wizard.getActiveItem().jumpOverIfNext;

                that.setActiveItem(++wizard.activeItem);
                wizard.fireEvent('wizardpagechange', wizard);
                wizard.fireEvent('wizardnext', wizard);
            }
        };
        this.btnFinish = {
            text: config.ttlFinish,
            itemId: 'finish',
            action: 'finishWizard',
            hidden: true,
            scope: this,
            handler: function (finish) {
                var wizard = that;// finish.up('wizard');

                if (typeof (this.getActiveItem().onFinish) != 'undefined')
                    this.getActiveItem().onFinish();

                wizard.fireEvent('wizardfinished', wizard)
            }
        };

        this.buttons.push(this.btnCancel);
        this.buttons.push(this.btnPrevious);
        this.buttons.push(this.btnNext);
        this.buttons.push(this.btnFinish);

        this.callParent(arguments);
    },

    setActiveItem: function (i) {

        var panel = this.items.items[i];
        if (typeof (panel.beforeSetPanelActive) != 'undefined')
            panel.beforeSetPanelActive();
        this.getLayout().setActiveItem(i);
    },

    render: function () {

        if (this.includeSubTitle) {
            this.setTitle(this.titlePrefix + ' (1 из ' + this.items.length + ') ' + this.getActiveItem().title);
        } else {
            this.setTitle(this.titlePrefix + ' (1 из ' + this.items.length + ')');
        }
        this.inWizard = true;
        this.callParent(arguments);
        this.fireEvent('wizardstarted', this);

    },

    listeners: {

        wizardstarted: function (wizard) {
            var panel = this.items.items[0];
            if (typeof (panel.beforeSetPanelActive) != 'undefined')
                panel.beforeSetPanelActive();
        },

        wizardfinished: function (wizard) {
            wizard.close();
        },

        wizardnext: function () {


        },

        beforerender: function () {
            Ext.each(this.getLayout().getLayoutItems(), function (card) {
                card.preventHeader = true;
            });
        },

        wizardpagechange: function (wizard) {
            var toolbar = wizard.getDockedItems()[1];

            if (wizard.activeItem >= 0) {
                toolbar.child('#next').setVisible(true);
                toolbar.child('#prev').setVisible(true);
            }

            if (wizard.activeItem == 0) {
                toolbar.child('#prev').setVisible(false);
            }

            if (wizard.activeItem == (wizard.items.length - 1)) {
                toolbar.child('#next').setVisible(false);
            }

            toolbar.child('#finish').setVisible(wizard.getActiveItem().finishable);
            toolbar.child('#next').setVisible(!wizard.getActiveItem().finishable);

            if (this.includeSubTitle) {
                wizard.getActiveItem().preventHeader = true;
                wizard.setTitle(wizard.titlePrefix + ' (' + (wizard.activeItem + 1) + ' of ' + this.items.length + ') ' + this.getActiveItem().title);
            } else {
                wizard.setTitle(wizard.titlePrefix + ' (' + (wizard.activeItem + 1) + ' of ' + this.items.length + ')');
            }

        }
    },


    getActiveItem: function () {

        return this.items.items[this.activeItem];

    }
});