Ext.define('App.controller.Edit', {

    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: '.app-main',
            edit: '.app-edit'
        },
        control: {
            '.app-edit': {
                'app-memo-save': 'onSave'
            },
            '.app-edit button[action=back]': {
                'tap': 'onBack'
            }
        }
    },

    onBack: function() {
        var me = this,
            view = me.getMain();

        view.setActiveItem(0);
    },

    onSave: function(val) {
        var me = this,
            store = Ext.getStore('Notes'),
            edit = me.getEdit(),
            record = edit.getRecord(),
            isNew = Ext.isEmpty(record.get('update'));

        val.update = Ext.Date.format(new Date(), 'Y/m/d H:m');
        record.set(val);

        if (isNew) {
            record.set('id', Ext.String.format('memo{0}', Ext.Date.now()));
            store.add(record);
        }

        console.log(record.data);

        store.sync();

        me.onBack();
    }

});
