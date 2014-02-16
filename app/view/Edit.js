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
            name: 'text',
            placeHolder: '内容を入力...',
            //flex: 1
            height: 400
        }, {
            xtype: 'textfield',
            label: 'date',
            name: 'update',
            readOnly: true
        }, {
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                text: 'Back',
                action: 'back',
                ui: 'back'
            }, {
                xtype: 'spacer'
            }, {
                text: 'Save',
                handler: function(button) {
                    var form = button.up('app-edit'),
                        vals = form.getValues();

                    form.fireEvent('app-memo-save', vals);
                }
            }]
        }]

        }

    });
