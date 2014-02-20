# README STEP4

## 続いて登録用のコンポーネントを作ってみよう！

続いて登録用の画面コンポーネントを作ってみましょう。

    - app/
      ├ controller/
      ├ form/
      ├ model/
      ├ store/
      ├ profile/
      └ view/
        ├ Main.js
        ├ Edit.js ←新たにファイルを作ります
        └ List.js

## Editクラスを作る

新たに作成した`Edit.js`に登録用のコンポーネントを実装していきます。  
今回利用するコンポーネントは、`Ext.form.Panel`を利用して実装します。

このコンポーネントは入力フォームを扱う場合に便利なメソッドを色々備えています。

    Ext.define('App.view.Edit', {
        extend: 'Ext.form.Panel',
        xtype: 'app-edit',
        ...

> 「...」は省略を表してるだけです

このコンポーネントも後ほど`Main.js`にて利用するので、`xtype: 'app-edit'`を指定しておきます。

続いて内包するコンポーネントを配置していきます。  
今回は`layout: 'vbox'`でレイアウトを行います。  
`layout`方式の指定だけでなく、細かいプロパティを定義する場合は次のようにオブジェクトリテラルて定義を行う事で指定することが可能です。

    ...
    config: {
        layout: {
            type: 'vbox'
        },
        items: [{
    ...

内包するコンポーネントは、`xtype: 'textfield'`を利用します。  
それ以外のプロパティについては次の通り

- label
    - 入力フィールドのタイトル部分になるプロパティ
- name
    - `form`の`submit`メソッドを実行した際に、サーバーへ送信されるパラメータ名になるプロパティ
- placeHolder
    - 何も入力されていない場合に表示する文字列
- readOnly
    - 指定したコンポーネントを読み取り専用にする為のプロパティ
    
`items`の最後に`xtype: 'toolbar'`を追加し、`docked: 'top'`を設定することで、画面上の上部にドッキングします。ドッキングしているコンポーネントは、スクロールせず固定表示になります。（ここでは解説しませんが、一部のドッキングタイプはスクロールするものもあります）

また`toolbar`は、`container`なのでコンポーネントを内包することが出来ます。  
ここでは2つの`button`コンポーネントを追加しています。

    ...
    items: [{
        xtype: 'textareafield',
        label: 'memo',
        name: 'BODY',
        placeHolder: '内容を入力...',
        //flex: 1
        height: 400
    }, {
        xtype: 'textfield',
        label: 'date',
        name: 'UPDATE',
        readOnly: true
    }, {
        xtype: 'toolbar',
        docked: 'top',
        items: [{
            text: 'Back',
            ui: 'back'
        }, {
            xtype: 'spacer'
        }, {
            text: 'Save',
            handler: function(button) {
                var form = button.up('formpanel'),
                    vals = form.getValues();
            }
        }]
    }]
    ...

`button`コンポーネントの`handler`プロパティに関数を設定することにより、クリック時の動作を直接定義することが可能です。この`handler`内で利用している`up`メソッドは、`ComponentQuery`と呼ばれるものでCSSセレクターのような指定方法でコンポーネントを取得することが可能な機能になります。

また`form.getValues()`は、`Ext.form.Panel`に用意された内包しているフォーム用コンポーネントの値をまとめて取得することが可能なメソッドになります。

    ...
    }, {
        text: 'Save',
        handler: function(button) {
            var form = button.up('formpanel'),
                vals = form.getValues();
        }
    }]
    ...

ここまでで一旦登録用フォームは完了です。  
最終的な全体コードは次の通り。

    Ext.define('App.view.Edit', {
        extend: 'Ext.form.Panel',
        xtype: 'app-edit',
        config: {
            layout: {
                type: 'vbox'
            },
            items: [{
                xtype: 'textareafield',
                label: 'memo',
                name: 'BODY',
                placeHolder: '内容を入力...',
                //flex: 1
                height: 400
            }, {
                xtype: 'textfield',
                label: 'date',
                name: 'UPDATE',
                readOnly: true
            }, {
                xtype: 'toolbar',
                docked: 'top',
                items: [{
                    text: 'Back',
                    ui: 'back'
                }, {
                    xtype: 'spacer'
                }, {
                    text: 'Save',
                    handler: function(button) {
                        var form = button.up('formpanel'),
                            vals = form.getValues();
                    }
                }]
            }]
        }
    });
    
ココまで出来たら一旦`Main.js`に、`Edit.js`を設定します。  
今まで`app-list`で定義してた部分を一時的に`app-edit`に変更して画面を表示してみましょう！

    Ext.define('App.view.Main', {
        extend: 'Ext.Container',
        requires: [
            'App.view.List',
            'App.view.Edit'
        ],
        xtype: 'app-main',
        config: {
            layout: 'fit',
            items: [{
                xtype: 'app-edit'
            }]
        }
    });