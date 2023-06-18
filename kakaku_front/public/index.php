<!DOCTYPE html>
<html lang="en">

<head prefix="og: https://ogp.me/ns#">
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Compare DIY PC parts' price" />
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
  <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <meta property="og:url" content="https://estimate-pc.uouo.fish/" />
    <meta property="og:type" content="website" />
    <?php
        $composition_name = '';
        if(isset($_GET['Name'])) {
            $encoded_composition_name = $_GET['Name'];
            $decode_composition_name_result = base64_decode($encoded_composition_name, true);
            if(is_string($decode_composition_name_result)){
                $composition_name = $decode_composition_name_result;
            }
        }
        $total_price = '';
        if(isset($_GET['Price'])) {
            $encoded_total_price = $_GET['Price'];
            $decode_total_price_result = base64_decode($encoded_total_price, true);
            if(is_string($decode_total_price_result)){
                $total_price = $decode_total_price_result . "円";
            }
        }
        echo("<meta property=\"og:title\" content=\"{$composition_name}\" />");
        echo("<meta property=\"og:description\" content=\"{$total_price}\" />");
    ?>
    <meta property="og:site_name" content="Estimate PC" />

  <title>Estimate PC</title>
</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
</body>

</html>