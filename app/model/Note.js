/**
 * Note Model
 *
 * @class App.model.Note
 * @extends Ext.data.Model
 */
Ext.define('App.model.Note', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'id',
                type: 'string'
            },
            {
                name: 'text',
                type: 'string'
            },
            {
                name: 'update',
                type: 'string'
            }
        ],
        proxy: {
            type: 'localstorage'
        }
    }
});
