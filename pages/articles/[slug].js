import Layout from 'components/Layout';
import Head from 'next/head';
import { getArticle, getListOfArticles } from 'services/articles';

export const getStaticPaths = async () => {
  const articles = getListOfArticles();

  return {
    paths: articles.map((article) => ({ params: { slug: article.slug } })),
    fallback: false
  };
};

export const getStaticProps = async (req) => {
  const { slug } = req.params;
  const article = await getArticle(slug);

  return {
    props: { article }
  };
};

export default function Article({ article }) {
  return (
    <Layout>
      <Head>
        <title>{article.title}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/prism-themes@1.7.0/themes/prism-material-dark.css"
        />
      </Head>
      <div>
        <h1 className="text-center text-3xl mb-10">{article.title}</h1>
        <div
          className="max-w-3xl mx-auto articleBody"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </Layout>
  );
}
