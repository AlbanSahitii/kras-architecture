import Head from "next/head";

const SEO = ({title, description, image}) => {
  const siteUrl = "https://krasarchitects.com";
  const imageUrl = image ? `${siteUrl}${image}` : null;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </Head>
  );
};

export default SEO;
