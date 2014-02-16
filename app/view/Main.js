Ext.define('App.view.Main', {

    extend: 'Ext.Container',
    requires: [
        'App.view.List',
        'App.view.Edit'
    ],
    xtype: 'app-main',

    config: {

        layout: 'fit',

        items: [{
            xtype: 'app-edit'
        }]

    }

});
