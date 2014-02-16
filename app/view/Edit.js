Ext.define('App.view.Edit', {

    extend: 'Ext.form.Panel',
    xtype: 'app-edit',

    config: {

        layout: {
            type: 'vbox'
        },

        items: [{
            xtype: 'textareafield',
            label: 'memo',
            name: 'BODY',
            placeHolder: '内容を入力...',
            //flex: 1
            height: 400
        }, {
            xtype: 'textfield',
            label: 'date',
            name: 'UPDATE',
            readOnly: true
        }, {
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                text: 'Back',
                ui: 'back'
            }, {
                xtype: 'spacer'
            }, {
                text: 'Save',
                handler: function(button) {
                    var form = button.up('formpanel'),
                        vals = form.getValues();

                }
            }]
        }]

        }

    });
