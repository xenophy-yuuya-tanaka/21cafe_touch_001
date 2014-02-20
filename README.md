# README STEP3

## モデルとストアを使ってみよう！

1つ前のSTEPで、一覧のコンポーネントに対して次のように固定でデータを渡すように実装をしました。

    data: [
        {text: 'TESTTEST', update: '2013/08/01 13:00'},
        {text: 'TESTTEST', update: '2013/08/02 13:00'},
        {text: 'TESTTEST', update: '2013/08/03 13:00'},
        {text: 'TESTTEST', update: '2013/08/01 13:00'},
        {text: 'TESTTEST', update: '2013/08/01 13:00'},
        {text: 'TESTTEST', update: '2013/08/01 13:00'}
    ]

しかし、実際にはこのような実装はあまりせず

- どのようなデータかを表現するモデル（レコード）を実装
- 複数のモデル（レコード）を格納するためのストアを実装

して、まとめてデータの管理を行います。

こうすることでデータの取り回しが良くなるだけでなく、Ext JS/Touchに用意されている様々なコンポーネントには、このストアをバインドする機能が備わっています。

そのため、大量のデータを管理しつつ、表示させたい場合は単にコンポーネントに対して

    store: 'ストア名'

と記述するだけで、ストアに保持されているデータがコンポーネントに描画されます。

簡単ですが、下記スライドのP51に簡易的な図解があります。

- [https://speakerdeck.com/tnker/sencha-irohafalse-i](https://speakerdeck.com/tnker/sencha-irohafalse-i)

## それでは、モデルを作ってみよう！

モデルは、保持するデータがどのようなデータなのかを表現するためのものなので

- どのようなフィールドをもっているのかを定義する`fields`
- データの扱い方の設定をするための`proxy`

を設定します。

今回の例であれば

    {text: 'TESTTEST', update: '2013/08/01 13:00'}

というデータなので、このデータが持っているフィールドは

- text
- update

といった2つのフィールドになります。  
また、データの扱いに関してはAjaxでデータを取得するわけではなく、あくまでサンプルとしてメモリ上に保持しているだけなので、そちらも合わせて設定したのが次のコード

    Ext.define('App.model.Note', {
        extend: 'Ext.data.Model',
        config: {
            fields: [{
                    name: 'text',
                    type: 'string'
                }, {
                    name: 'update',
                    type: 'string'
                }
            ],
            proxy: {
                type: 'memory'
            }
        }
    });

これを、Ajaxを利用してデータを取得するといったことをする場合は、`proxy`プロパティ部分を次のように変更します。

    proxy: {
        type: 'ajax',
        url: 'http://xxxxx.xxxxx'
    }

他にも設定は色々ありますが、詳しくはリファレンスをご参照ください

- [http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.data.Model](http://docs.sencha.com/extjs/4.2.2/#!/api/E
xt.data.Model)


## 続いてストアをつくる

ストアは、上記で作成したモデルデータを管理するための入れ物のような役割をします。  
基本的には、`Ext.data.Store`クラスを継承したクラスを作成し、扱いたいデータモデルを設定するだけです。

今回は、一部のプロパティの説明のみを行います。  
上記のモデルを利用して実装したのが、次のコード

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

新たに出てきた3種類のプロパティ

- autoLoad
    - これは、このストアのクラスがインスタンス化された際、自動的に`proxy`に設定された情報からデータを取得するプロパティです。  
      この設定を行っていない場合は、ストア生成後に`load`メソッドを実行しないとデータが読み込まれません。
- model
    - プロパティの名前通り、このストアに設定するモデルクラスを文字列で定義します
- storeId
    - MVCに沿って実装している場合、`Ext.getStore('Notes')`でストアのインスタンスの取得が行えますが（引数はストアのクラス名（このクラスであれば`Notes`））、何かしら単体でこのクラスを利用するとなった場合は、`storeId`を設定しておかないと同じように取得することが行えません。  
      今回は必要無いですが、念のため付けておくともしもの時に楽です。
      
`data`プロパティについては、前回の一覧用コンポーネントに定義したものと同様で固定データを指定することが出来ます。ただ前回と大きく違うのは、ストアとして定義しておくことによって、最終的にサーバーからデータを取得するとなった際に`proxy`の設定を書き換えるだけで良いという点です。

色々説明し切れていない部分はありますが、詳しく知りたい方はリファレンスを見てみてください


- [http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.data.Store](http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.data.Store)


## ストアを使うための設定と、一覧コンポーネントへの設定

これでモデルとストアが一通り出来ました。  
今度はこれを、アプリケーション内で利用できるように設定を行います。

設定を行うファイルはプロジェクトディレクトリ直下の`app.js`を編集します。  
`app.js`内では、`Ext.application`メソッドを利用してアプリケーション全体のエントリーポイントが実装されています。

そのコード内の途中に次のように、先ほど作成したストアクラスを設定します。

    Ext.application({
        name: 'App',
    
        requires: [
            'Ext.MessageBox'
        ],
        views: [
            'Main'
        ],
        stores: [
            'Notes'　←ココ
        ],
        ... // 省略

このように、`views` `stores` `controllers`といったプロパティを定義してクラス名を設定してあげることで、アプリケーション起動時に必要なクラスとして読み込まれます。（`requires`のようなもの）

`Ext.application`や`Ext.application`における`views` `stores` `controllers`などは、ここで説明すると少し長くなってしまうので、今のところは「このメソッドを利用してアプリケーションが起動して、その際のオプションとして3種のプロパティがある」という感じに思っておいてください。

この設定が完了したら、`List.js`に定義をしていた`data`プロパティを削除し、新たに`store: 'Notes'`を追加しておいてください。

    Ext.define('App.view.List', {
        extend: 'Ext.dataview.List',
        xtype: 'app-list',
        config: {
            layout: 'fit',
            store: 'Notes',
            itemTpl: '{text}  -  {update}'
        }
    });

この状態でアプリケーションを再度起動すると、ちゃんと表示されると思います。  
データが同じだと少し分かりにくいので、ストアに移動させる際に少しデータを変えておくと良いかもしれません。