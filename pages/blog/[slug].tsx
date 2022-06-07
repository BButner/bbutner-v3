import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeCodeTitles from "rehype-code-titles"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import { Article, getArticleFromSlug, getSlugs } from "../../lib/blog/articles"
import { serialize } from 'next-mdx-remote/serialize'
import { NextPage } from "next"
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import { ArticleRender } from "../../components/blog/ArticleRender"

export interface BlogPageProps {
  source: any,
  article: Article,
}

const BlogPage: NextPage<BlogPageProps> = ({ source, article }) => {
  return (
    <ArticleRender source={source} article={article}/>
  )
}

export async function getStaticPaths() {
  const paths = (await getSlugs()).map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  }
}

// @ts-ignore
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const articleData = await getArticleFromSlug(slug)

  if (!articleData) return null;

  const mdxSource = await serialize(articleData.body, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: 'blog-heading',
            }
          }
        ],
        rehypeHighlight,
        rehypeCodeTitles,
      ],
    },
  })

  return {
    props: {
      source: mdxSource,
      article: articleData
    },
  }
}

export default BlogPage;
