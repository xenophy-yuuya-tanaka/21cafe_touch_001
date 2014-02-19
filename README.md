# README STEP2

## メモ帳の一覧を表示するコンポーネントを作ってみよう！

コンポーネントの置き方などを学んだところで、続いてはメモ帳の一覧を表示するための自作コンポーネントを作ってみましょう！

    - app/
      ├ controller/
      ├ form/
      ├ model/
      ├ store/
      ├ profile/
      └ view/
        ├ Main.js
        └ List.js ←新たにファイルを作ります

## Listクラスを作る

あたらに作成した`List.js`ファイルを編集し、新たに一覧用のコンポーネントを実装していきます。

クラスの定義は、[step1](https://github.com/xenophy-yuuya-tanaka/21cafe_touch_001/tree/step1#%E7%B0%A1%E6%98%93%E3%82%B3%E3%83%BC%E3%83%89%E8%AA%AC%E6%98%8E)で触れた`Ext.define`を使って定義を行います。

    Ext.define('App.view.List', {
        extend: 'Ext.dataview.List',
        xtype: 'app-list'
    });

一覧表示に使うコンポーネントは、`Ext.dataview.List`コンポーネントを利用します。  
また、後ほど別のviewにこのコンポーネントを利用するために`xtype: 'app-list'`を定義しておきます。

続いて、コンポーネントプロパティを定義していきます。

    Ext.define('App.view.List', {
        extend: 'Ext.dataview.List',
        xtype: 'app-list',
        config: {
            layout: 'fit'
        }
    });

内包しているコンポーネントを画面サイズに合わせて拡大させるために、`layout: 'fit'`

続いて、一覧表示用のテンプレートの定義を行います。

    Ext.define('App.view.List', {
        extend: 'Ext.dataview.List',
        xtype: 'app-list',
        config: {
            layout: 'fit',
            itemTpl: '{text}  -  {update}'
        }
    });

ここで`itemTpl`というプロパティに文字列の定義を行っていますが、このプロパティに文字列を渡すと内部で`Ext.XTemplate`が生成されます。このテンプレートは、渡されたデータを元にHTMLを出力するものです。

**渡されたデータ**は、次のように`data`プロパティに記述することで定義を行えます。


    Ext.define('App.view.List', {
        extend: 'Ext.dataview.List',
        xtype: 'app-list',
        config: {
            layout: 'fit',
            itemTpl: '{text}  -  {update}',
            data: [
                {text: 'TESTTEST', update: '2013/08/01 13:00'},
                {text: 'TESTTEST', update: '2013/08/02 13:00'},
                {text: 'TESTTEST', update: '2013/08/03 13:00'},
                {text: 'TESTTEST', update: '2013/08/01 13:00'},
                {text: 'TESTTEST', update: '2013/08/01 13:00'},
                {text: 'TESTTEST', update: '2013/08/01 13:00'}
            ]
        }
    });
    
`data`プロパティにオブジェクトを内包した配列（厳密にはオブジェクト出なくても良い）を渡し、`itemTpl`プロパティのテンプレート定義に、オブジェクトが保持しているプロパティを`{text}`といった形で記載しておくと、配列に保持している数だけイテレートされ一覧が表示されます。

テンプレート（XTemplate）の詳細につきましては、リファレンスを参照してください

- [http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.XTemplate](http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.XTemplate)


## 一覧コンポーネントが出来たら表示してみよう！

    - app/
      ├ controller/
      ├ form/
      ├ model/
      ├ store/
      ├ profile/
      └ view/
        ├ Main.js ←ここを編集します
        └ List.js

アプリケーションの全体の表示で使っている`Main`クラスに、先ほど作成した一覧コンポーネントを追加します。

追加方法は`items`プロパティに`List`コンポーネントで設定した`xtype`の値を入れてもらえれば問題無いです。また、この際に1点注意なのですが、新規に作成したクラスの`xtype`などを利用する場合は、`requires`配列に対象のクラスを設定しておく必要があります。
