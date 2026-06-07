# juku-log 開発進捗

## フェーズ一覧

| # | フェーズ | 状態 |
|---|---------|------|
| 1 | 基盤（Prisma + DB + seed） | ✅ ファイル完成 / ⏳ migrate実行待ち |
| 2 | 認証（Auth.js + Google OAuth） | 🔜 未着手 |
| 3 | API（Route Handlers） | 🔜 未着手 |
| 4 | 画面（講師用・本部用） | 🔜 未着手 |
| 5 | デプロイ準備（Dockerfile + Cloud Run手順） | 🔜 未着手 |

---

## フェーズ1: 基盤

### 完了済み
- [x] Prisma 7 + @prisma/client + tsx インストール
- [x] `docker-compose.yml` — PostgreSQL 16コンテナ
- [x] `prisma/schema.prisma` — 全モデル定義
  - `User` (id / name / email / image / role / createdAt)
  - `Student` (id / name / grade / school / isActive / createdAt)
  - `LessonRecord` (id / studentId / lessonDate / subject / content / teacherId / understanding / homework / homeworkDone / teacherComment / createdAt)
  - Auth.js 必須モデル: `Account` / `Session` / `VerificationToken`
- [x] `prisma.config.ts` — DATABASE_URL 読み込み設定（Prisma 7形式）
- [x] `prisma/seed.ts` — admin×1, 講師×1, 生徒×3, 授業記録×2
- [x] `src/lib/prisma.ts` — PrismaClient シングルトン
- [x] `.env` / `.env.example` — 環境変数テンプレート
- [x] `.gitignore` — `.env.example` を追跡対象に修正

### 残り作業
```bash
npx prisma db seed   # seed コマンド設定を prisma.config.ts に修正済み
```

---

## フェーズ2: 認証（予定）
- Auth.js (NextAuth v5) + Google OAuth + @auth/prisma-adapter
- 未ログイン → `/login` リダイレクト
- 新規ログインユーザーはデフォルト TEACHER ロールで作成

## フェーズ3: API（予定）
- `GET  /api/students`
- `GET  /api/records?studentId=`
- `POST /api/records`
- `PATCH /api/records/:id`
- `POST/PATCH /api/students` (admin only)
- `POST/PATCH /api/users` (admin only)

## フェーズ4: 画面（予定）
- 講師用: 生徒選択 → 記録入力フォーム → 記録一覧
- 本部用 `/admin`: 生徒・講師の管理画面

## フェーズ5: デプロイ準備（予定）
- 本番用 Dockerfile（Next.js standalone + マルチステージビルド）
- Cloud Run + Cloud SQL 接続手順（README）
