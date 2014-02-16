Ext.define('App.controller.Main', {

    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: '.app-main',
            edit: '.app-edit'
        },
        control: {
            '.app-list': {
                'select': 'onSelect'
            },
            '.app-list button[action=new]': {
                'tap': 'onAdd'
            }
        }
    },

    onAdd: function() {
        var me    = this,
            model = Ext.ModelManager.create({}, 'App.model.Note'),
            view  = me.getMain(),
            edit  = me.getEdit();

        edit.setRecord(model);
        view.setActiveItem(1);
    },

    onSelect: function(comp, record) {
        var me   = this,
            view = me.getMain(),
            edit = me.getEdit();

        edit.setRecord(record);
        view.setActiveItem(1);
    }

});
