import React from 'react';
import NextDocument, {Html, Head, Main, NextScript} from 'next/document';

class Document extends NextDocument {
    static async getInitialProps(ctx) {
        const initialProps = await NextDocument.getInitialProps(ctx);
        return {...initialProps};
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta title="Daydrink | Find the best drink deals and happy hours in your area." />
                    <link rel="icon" sizes="96x96" href="/favicons/favicon.ico" />
                    <meta name="theme-color" content="#319795"></meta>
                    <link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet" />
                
                </Head>
                <body>
                <div id="fb-root"></div>
                <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0&appId=430622220908966" nonce="drW1AXGI"></script>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default Document;
