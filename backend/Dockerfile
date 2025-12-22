# 役割 
# 一つのコンテナを作成するための指示書
# どのような環境、手順でコンテナを作成するのかを指示する。

# 開発環境の設定
FROM node:20-alpine

# Dockerの作業コンテナ名を設定
WORKDIR /app

# 依存関係を先にコピー
COPY package*.json ./

# コピーした依存関係をインストール
RUN npm install

# package.json以外のファイルをコピー
COPY . .

# ポート番号を指定
EXPOSE 3000

# コンテナ起動時に実行するコマンドを宣言
CMD ["npm", "run", "dev"]