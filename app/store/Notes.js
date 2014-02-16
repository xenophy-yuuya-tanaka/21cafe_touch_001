/**
 * Notes Store
 *
 * @class App.store.Notes
 * @extends Ext.data.Store
 */
Ext.define('App.store.Notes', {
    extend: 'Ext.data.Store',
    requires: [
        'App.model.Note'
    ],
    config: {
        autoLoad: true,
        model: 'App.model.Note',
        storeId: 'Notes'
    },
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
});
