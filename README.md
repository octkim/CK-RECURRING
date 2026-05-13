# Candela Korea Dashboard — Vercel 배포 가이드

## 파일 구조
```
vercel-project/
  api/
    sheets.js        ← Apps Script 프록시 (URL 은닉)
  public/
    index.html       ← 대시보드 HTML
  vercel.json        ← 라우팅 설정
```

## 배포 방법

### 1. Vercel 환경변수 설정 (필수)
Vercel Dashboard → 프로젝트 → Settings → Environment Variables

| 변수명 | 값 |
|--------|-----|
| `APPS_SCRIPT_URL` | `https://script.google.com/macros/s/AKfycbz7...` (실제 URL) |

### 2. 이 폴더 전체를 Vercel에 배포
- Vercel CLI: `vercel deploy`
- 또는 GitHub에 올린 후 Vercel에서 연결

## 보안 효과
- 클라이언트(브라우저)에서 보이는 URL: `/api/sheets?sheet=RAW_DATA`
- 실제 Apps Script URL: 서버 환경변수에만 존재, 절대 노출 안 됨
