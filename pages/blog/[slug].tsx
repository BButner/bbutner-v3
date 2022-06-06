import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeCodeTitles from "rehype-code-titles"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import { Article, getArticleFromSlug, getSlugs } from "../../lib/blog/articles"
import { serialize } from 'next-mdx-remote/serialize'
import dayjs from "dayjs"
import { NextPage } from "next"
import { MDXRemote } from "next-mdx-remote"
import Head from "next/head"
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import Link from "next/link";

interface BlogPageProps {
  source: any,
  article: Article,
}

const BlogPage: NextPage<BlogPageProps> = ({ source, article }) => {
  console.log(source);
  console.log(article);

  return (
    <div className="m-auto">
      <Head>
        <title>{article.headerData.title} | BButner</title>
      </Head>
      <div className="prose prose-amber prose-pre:shadow-xl dark:prose-invert w-3/4 lg:w-2/3 max-w-full m-auto py-8">
        <div className="pb-8 w-fit">
          <Link href="/blog">
            <a className="pb-8 text-zinc-900 dark:text-zinc-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </a>
          </Link>
        </div>
        <h1 className="p-0 m-0">{article.headerData.title}</h1>
        <i className="text-gray-500">
          {dayjs(article.headerData.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
          {article.headerData.readingTime}
        </i>
        <div className="content">
          <MDXRemote {...source} />
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = (await getSlugs()).map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  }
}

// @ts-ignore TODO
export async function getStaticProps({ params }) {
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
