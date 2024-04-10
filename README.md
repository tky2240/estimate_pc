# estimate_pc
自作PCの見積もり用サイト

- https://estimate-pc.uouo.fish/

# ホスト方法
- 短縮URLに違うドメインを使う場合
```
cp example/separeted_url/example.env ./.env
cp example/separeted_url/Caddyfile ./Caddyfile
docker compose up -d
```
- 短縮URLに同じドメインを使う場合
```
cp example/same_url/example.env ./.env
cp example/same_url/Caddyfile ./Caddyfile
docker compose up -d
```

# 設定ファイル等
- Caddyfile
  - frankenphpで使用
- crontab
  - スクレイピングを定期的に行うのに使用
  - デフォルトでは毎日2時に実行
- initdb.d/create_tables.sql
  - 初回起動時にテーブルを作成するのに使用

# 環境変数
| 変数名                        | 説明                              | 備考                                         |
| ----------------------------- | --------------------------------- | -------------------------------------------- |
| DEFAULT_DOMAIN                | 短縮URLに使用するドメイン         |                                              |
| IS_HTTPS_ENABLED              | shlinkでhttpsを使用するかどうか   |                                              |
| CREATING_SHORT_URL_END_POINT  | shlinkの短縮URL作成エンドポイント |                                              |
| INITIAL_API_KEY               | shlinkで使用するAPI Key           |                                              |
| MYSQL_ROOT_PASSWORD           | MYSQLのrootパスワード             |                                              |
| REACT_APP_SEARCH_API_URL_BASE | 検索APIのエンドポイント           |                                              |
| REACT_APP_CREATE_API_URL_BASE | 短縮URL作成APIのエンドポイント    |                                              |
| API_LISTEN_PORT               | バックエンドAPIのlistenポート     |                                              |
| DATABASE_URL                  | データベースの接続URL             | mysql://root:${password}@db:3306/estimate_pc |
| FRONT_FQDN                    | フロントエンドのFQDN              |                                              |
| SHORT_FQDN                    | 短縮URLのFQDN                     |                                              |

# TODO
- 上部のバーを固定する
- 短縮用ドメイン使わないバージョンのdocker
- readmeをちゃんと書く