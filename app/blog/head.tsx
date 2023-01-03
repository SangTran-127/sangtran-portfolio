import React from "react";

const Head = () => {
  return (
    <>
      <title>Sang | Blog page</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="title" content={"Welcome to Sang's blog page"} />
      <meta
        name="description"
        content={"This my blog, hope you find something interesting"}
      />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${process.env.WEB_URL}/blog` || ""} />
      <meta property="og:title" content={"Welcome to Sang's blog page"} />
      <meta
        property="og:description"
        content={"This my blog, hope you find something interesting"}
      />
      <meta property="og:image" content="" />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={`${process.env.WEB_URL}/blog` || ""}
      />
      <meta property="twitter:title" content={"Welcome to Sang's blog page"} />
      <meta
        property="twitter:description"
        content={"This my blog, hope you find something interesting"}
      />
      <meta property="twitter:image" content="" />
    </>
  );
};

export default Head;