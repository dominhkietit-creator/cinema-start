import { ScrollViewStyleReset } from 'expo-router/html';

// Root HTML template for Expo Router web (Vercel deployment)
export default function Root({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <title>Cinema Star - Đặt vé xem phim</title>
        <ScrollViewStyleReset />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, #root {
                height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
                background-color: #0b0c0e;
                -webkit-font-smoothing: antialiased;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
