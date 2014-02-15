Ext.define('App.view.Main', {

    extend: 'Ext.Container',
    requires: [
        'App.view.List'
    ],
    xtype: 'app-main',

    config: {

        layout: 'fit',

        items: [{
            xtype: 'app-list'
        }]

    }

});
