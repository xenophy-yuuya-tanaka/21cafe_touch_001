Ext.define('App.view.List', {

    extend: 'Ext.dataview.List',
    xtype: 'app-list',

    config: {

        layout: 'fit',

        //selectedCls: false,

        //store: 'Notes',

        itemTpl: '{text}  -  {update}',

        data: [
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/02 13:00'},
            {text: 'TESTTEST', update: '2013/08/03 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'},
            {text: 'TESTTEST', update: '2013/08/01 13:00'}
        ]

    }

});
