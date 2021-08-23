import "bootstrap/dist/css/bootstrap.min.css";
// libs
import App, { AppContext, AppProps } from "next/App"; //Thang này có san cua next js rùi
import Head from "next/head";
import Footer from "../components/Footer";
import { useEffect, useMemo } from "react";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// components
import Header from "../components/Header";
// others
import "../assets/css/style.scss";
import store, { persistor } from "../app/store";

function MyApp({ Component, pageProps, router }: AppProps) {
  const pathname = router.pathname;
  // useMomo chay trc khi render(xem no nhu la 1 constructor) => tra ve 1 value
  const hiddenFooter = useMemo(() => {
    const excluded = ["/", "/posts/[postId]", "/login", "/register"];
    const currentRouter = pathname;
    // console.log(router);
    return excluded.indexOf(currentRouter) !== -1;
  }, [pathname]);

  const hiddenHeader = useMemo(() => {
    const excluded = ["/login", "/register"];
    const currentRouter = pathname;
    return excluded.indexOf(currentRouter) !== -1;
  }, [pathname]);

  // console.log("hiddenHeader", hiddenHeader);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <div id="root">
            <Head>
              <meta
                httpEquiv="Content-Type"
                content="text/html; charset=UTF-8"
              />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="viewport"
                content="width=device-width, minimum-scale=1, maximum-scale=1"
              />
              <meta name="keywords" content="HTML5 Template" />
              <meta name="description" content="Cộng đồng chế ảnh ZendVN" />
              <meta name="author" content="etheme.com" />
              <link rel="icon" href="/favicon.ico" />
              <title>Cộng đồng chế ảnh ZendVN</title>

              {/* <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          rel="stylesheet"
        /> */}

              {/* <link
          rel="stylesheet"
          href="/fonts/font-awesome/css/font-awesome.css"
        />
        <link rel="stylesheet" href="/fonts/emotion/style.css" /> */}
            </Head>

            {!hiddenHeader && <Header />}

            <main>
              <Component {...pageProps} />
            </main>
            {!hiddenFooter && <Footer />}
          </div>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

// appContext: AppContext: kieu du lieu cho AppContext
MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  // console.log("appProps", appProps);

  // Sau này goi api check User Login ở dây
  return {
    pageProps: {
      ...appProps.pageProps,
    },
  };
};

export default MyApp;
