# README STEP5

## ここまでで作成した一覧・登録コンポーネントをそれぞれ組み合わせてみよう！

### その前に

登録用画面で`toolbar`を設定しましたが、一覧用画面にも同じような設定をしてみましょう！  
ただ全く同じだと味気ないので、一覧画面には`toolbar`ではなく`titlebar`を設定します。

`titlebar`は、`title`プロパティに文字列をセットするとツールバーの真ん中にセットした文字列をタイトルのような形で表示してくれます。また内包（`items`）コンポーネントに`align`プロパティを設定すると、タイトルバーの左右かを選んでボタンを設置することが可能です。

    Ext.define('App.view.List', {
        extend: 'Ext.dataview.List',
        xtype: 'app-list',
        config: {
            layout: 'fit',
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

## 2つの画面を組み合わせる

`Main.js`に`List.js`（一覧）と`Edit.js`（登録）を設置します。    
その際に、複数の画面を切り替えるため`layout: 'card'`にしておいてください。
    
    Ext.define('App.view.Main', {
        extend: 'Ext.Container',
        requires: [
            'App.view.List',
            'App.view.Edit'
        ],
        xtype: 'app-main',
        config: {
            layout: 'card',
            items: [{
                xtype: 'app-list'
            }, {
                xtype: 'app-edit'
            }]
        }
    });


## コントローラーを作成してみよう！

最後にコントローラーを作成していきます。  
`app/controller`ディレクトリ配下に、`Main.js`と`Edit.js`の2ファイルを新たに作成します。

    - app/
      ├ controller/
      | ├ Main.js ← 新たに作成
      | └ Edit.js ← 新たに作成
      ├ form/
      ├ model/
      ├ store/
      ├ profile/
      └ view/

そしてこれらのファイルを、利用できるようにしておくためプロジェクトディレクトリ直下の`app.js`に追加します。

    Ext.application({
        name: 'App',
        requires: [
            'Ext.MessageBox'
        ],
        views: [
            'Main'
        ],
        stores: [
            'Notes'
        ],
        controllers: [
            'Main',　←ココ
            'Edit'　 ←ココ
        ],
        ...
        

## Mainコントローラーを作る

さっそくコントローラーを実装していきます。  
クラス定義には、今まで同様`Ext.define`を使い継承元は`Ext.app.Controller`を継承して実装していきます。

    Ext.define('App.controller.Main', {
        extend: 'Ext.app.Controller',
        ...

続いて、今回利用するコントローラー独特のプロパティをご紹介します。

- refs
    - `ComponentQuery`を用いて、設定したコンポーネントを取得するための**getter**を自動生成する機能
- control
    - `ComponentQuery`を用いて、特定のコンポーネントへのイベントバインディングを行える機能

>`ComponentQuery`については、[http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.ComponentQuery](http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.ComponentQuery)を参照してみてください

### refs

まず、`refs`プロパティは次のように`refs`に対してオブジェクトリテラルで、設定を行います。  
生成される**getter**に利用されるのが**key**で**value**は、その**getter**が実行された際に取得するための`ComponentQuery`になります。

- main
    - 生成されるgetter: `getMain()`
    - getter実行時に取得されるコンポーネント: `xtype: 'app-main'`のコンポーネント
- edit
    - 生成されるgetter: `getEdit()`
    - getter実行時に取得されるコンポーネント: `xtype: 'app-edit'`のコンポーネント

-

    config: {
        refs: {
            main: '.app-main',
            edit: '.app-edit'
        },
        ...
    }

### control

続いて`control`ですが、こちらもオブジェクトリテラルで指定を行います。  
イベントバインディングを行いたいコンポーネントの`ComponentQuery`を**key**に設定し、さらにその**value**にオブジェクトリテラルで、**key**にイベント名、**value**にイベントが発火した際に実行する関数名（もしくは無名関数）を設定します。

ここでは

- `xtype: 'app-list'`コンポーネントが`select`イベントを発火したら、`Main`コントローラーの`onSelect`メソッドを実行する
- `xtype: 'app-list'`コンポーネントの中にある、プロパティに`action: 'new'`が設定されている`xtype: 'button'`コンポーネントの`tap`イベントが発火したら`onAdd`メソッドを実行する

というような2つのイベントバインディングを行っています

>各コンポーネントが持っているイベント種類については、APIリファレンスを参照

    config: {
        ...
        control: {
            '.app-list': {
                'select': 'onSelect'
            },
            '.app-list button[action=new]': {
                'tap': 'onAdd'
            }
        }
    }
    
それでは、イベントバインディングで設定している各メソッドを見ていきましょう

### onSelect

一覧のどれかが選択された際に実行されるのは下記コードになります。  
ここで、選択されたメモの情報を取得し編集画面に遷移させるような処理を実装します。

    onSelect: function(comp, record) {
        var me   = this,
            view = me.getMain(),
            edit = me.getEdit();

        edit.setRecord(record);
        view.setActiveItem(1);
    }

処理の始めに行っているのは、この後の処理で必要になるコンポーネントを`refs`で生成したgetterを利用して取得しています。

また`List`コンポーネントの`select`イベントは、実行されるメソッドの第2引数に選択されたレコードを渡してくれるので、これを利用して編集画面にデータを渡します。

この際に`Edit`コンポーネントは`Ext.form.Panel`を利用しており、このコンポーネントには`setRecord`というようなレコードを引数に設定することで、モデルのフィールド名に一致する入力コンポーネントがあれば自動的に値を反映してくれるメソッドが用意されており、今回はそちらを利用します。

そして編集画面への画面遷移については、`refs`から取得した`Edit`コンポーネントに対して`setActiveItem`を利用して遷移させることができます。（`layout:'card'`などで利用可能、引数には対象のインスタンスもしくはindexを指定）

### onAdd

今度はNewボタンをタップした際に、遷移させる処理の実装です。  
コードは次の通り

    onAdd: function() {
        var me    = this,
            model = Ext.ModelManager.create({}, 'App.model.Note'),
            view  = me.getMain(),
            edit  = me.getEdit();

        edit.setRecord(model);
        view.setActiveItem(1);
    },
    ...

`onSelect`とやっていることはほとんど同じです。

1点違うのは、選択されているレコード使って`setRecord`を実行するのではなく、自ら新たなレコードを作成している点です。`Ext.ModelManager.create`メソッドを利用し、第1引数に空の設定情報、第2引数に対象のモデルクラス名（フルパス）を指定することで空のレコードを生成します。

ここまで実装が完了すれば一通りOKです。

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
    

## 続いてEditコントローラーを作る！

コントローラー特有のプロパティについては説明は終わっているので、実装しているメソッドについて見ていきましょう。  
まず全体のコードは次の通り

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
    
            console.log(record.data);
    
            val.update = Ext.Date.format(new Date(), 'Y/m/d H:m');
            record.set(val);
    
            if (isNew) {
                store.add(record);
            }
    
            store.sync();
            me.onBack();
        }
    });
    
### onBack

ここでは、単純に一覧画面へ遷移させているだけです。

    onBack: function() {
        var me = this,
            view = me.getMain();

        view.setActiveItem(0);
    },

### onSave

こちらは画面上のSaveボタンがタップされた際の処理になります。

中で行っている処理は

- `Ext.getStore`メソッドを利用して、一覧にバインドされているストアを取得
- `Edit`コンポーネントの`getRecord`メソッドでフォームに読み込まれているレコードを取得
- 上記で取得したレコードの`update`フィールドを確認し新規かどうかを確認
- その後レコードの`update`フィールドを現在時間に更新
- 最初に取得したストアに`add`メソッドを利用して追加を行う
- 一覧画面へ戻る

というような流れで処理を行っています。
基本的に、ストアに既に含まれているレコードの値を変更した際は自動的に一覧画面にも反映されますが、これがサーバーへの保存等も行わないと行けない場合は、ストアの`sync`メソッドなどを利用する必要があります。

    onSave: function(val) {
        var me = this,
            store = Ext.getStore('Notes'),
            edit = me.getEdit(),
            record = edit.getRecord(),
            isNew = Ext.isEmpty(record.get('update'));

        console.log(record.data);

        val.update = Ext.Date.format(new Date(), 'Y/m/d H:m');
        record.set(val);

        if (isNew) {
            store.add(record);
        }

        //store.sync(); ← 本来サーバーなどに通知する場合に利用
        me.onBack();
    }

これで、一通りのクラスの実装が完了しました！おつかれさまです！