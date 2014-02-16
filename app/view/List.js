Ext.define('App.view.List', {

    extend: 'Ext.dataview.List',
    xtype: 'app-list',

    config: {

        layout: 'fit',

        //selectedCls: false,

        store: 'Notes',

        itemTpl: '{text}  -  {update}',

        items: [{
            xtype: 'titlebar',
            title: 'memo',
            docked: 'top',
            items: [{
                text: 'New',
                action: 'new',
                align: 'right'
            }]
        }]

    }

});
