// libs
import React from "react";
import { AppProps } from "next/app"; //Thang này có san cua next js rùi
import Head from "next/head";
import Footer from "../components/Footer";
import { useEffect, useMemo, useState } from "react";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// components
import Header from "../components/Header";
// others
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.scss";
import store, { persistor } from "../app/store";
import { Fab, LinearProgress, makeStyles } from "@material-ui/core";
import LanguageProvider from "../context/LanguageContext";
import ThemeProvider, { ThemeContext } from "../context/ThemeContext";
import ScrollTop from "../components/Header/mains/ScrollTop";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99999999999,
  },
  color: {
    position: "fixed",
    top: "680px",
  },
}));

function MyApp({ Component, pageProps, router }: AppProps) {
  const classes = useStyles();
  const pathname = router.pathname;
  const [loading, setLoading] = useState(false);
  // useMomo chay trc khi render(xem no nhu la 1 constructor) => tra ve 1 value
  const hiddenFooter = useMemo(() => {
    const excluded = ["/", "/posts/[postId]", "/login", "/register", "/users/profile"];
    const currentRouter = pathname;
    // console.log(router);
    return excluded.indexOf(currentRouter) !== -1;
  }, [pathname]);

  const hiddenHeader = useMemo(() => {
    const excluded = ["/login", "/register", "/users/password"];
    const currentRouter = pathname;
    return excluded.indexOf(currentRouter) !== -1;
  }, [pathname]);

  // console.log("hiddenHeader", hiddenHeader);

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      setLoading(true);
    });
    router.events.on("routeChangeComplete", (url) => {
      setLoading(false);
    });
    router.events.on("routeChangeError", (err, url) => {
      setLoading(false);
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <ThemeProvider>
            <LanguageProvider>
              <div id="root">
                <Head>
                  <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                  <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
                  <meta name="keywords" content="HTML5 Template" />
                  <meta name="description" content="Social Network" />
                  <meta name="author" content="etheme.com" />
                  <link rel="icon" href="/favicon.ico" />
                  <title>Social Network</title>
                </Head>

                {loading && <LinearProgress className={classes.progress} />}
                {!hiddenHeader && <Header />}
                <main>
                  <Component {...pageProps} />
                </main>
                <ScrollTop>
                  <Fab style={{ backgroundColor: "#03DAC5" }} size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                  </Fab>
                </ScrollTop>
                {!hiddenFooter && <Footer />}
              </div>
            </LanguageProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
