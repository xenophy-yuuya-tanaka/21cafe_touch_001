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
    }
});
