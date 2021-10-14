<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Server Side Rendering

## getInitialProps
    -Chạy ca phia Server va Client
    -Lân load đau tien chaạ phía Server
    -Lần đieu huong tiep theo(next/link, next/router) chay phia Client(SPA)

    -Ưu điem :Tot cho SEO. Giam tai phia Server
    -Nhuoc điem: De bi lô Endpoints ve data cua API.Neu uu tien o di dong hon, thiet bi co cau hinh yeu ->Khong nen dung

## getServerSideProps -> Fetch data trong môi request
- Chi chay phia Server
- Load lan dau tien chay phia Server
- Lần đieu huong tiep theo(next/link, next/router) van chay phia Server

- Uu diem : Tot cho SEO.Che giau duoc Endpoints
- Nhuoc diem: Toc do ung dung se cham hon voi nhung lan sau.Tang tai phia Server

--------------------------------------------------

# Static Generation

## getStaticProps -> Fetch data tai thoi diem buid time
 - Chi chay phia Server
 - O moi truong Development(npm run dev): Giong hoan toan GetServerSideProps
 - O moi truong Production:
     + Data duoc goi mot lan duy nhat tai thoi diem build time(npm run build).
     + Data khong bi thay doi trong suot thoi gian hoat dong(Neu khong Re Build Project)

## getStaticPaths -> Xac dinh cu the các dynamic routes nao duoc pre-render phia server.
- Chi chay phía server
- Dung ket hop voi getStaticProps khi do lam dynamic routes


## Ban than thang _app.tsx khong phai la 1 cai page

 -->
