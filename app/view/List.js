Ext.define('App.view.List', {

    extend: 'Ext.dataview.List',
    xtype: 'app-list',

    config: {

        layout: 'fit',

        //selectedCls: false,

        store: 'Notes',

        itemTpl: '{text}  -  {update}'

    }

});
