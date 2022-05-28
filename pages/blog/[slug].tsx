import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeCodeTitles from "rehype-code-titles"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import { getArticleFromSlug, getSlug } from "../../lib/blog/articles"
import { serialize } from 'next-mdx-remote/serialize'
import dayjs from "dayjs"
import { NextPage } from "next"
import { MDXRemote } from "next-mdx-remote"
import Head from "next/head"
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import Link from "next/link";

// @ts-ignore TODO
const BlogPage: NextPage = ({ post: { source, frontmatter } }) => {
  return (
    <div className="m-auto">
      <Head>
        <title>{frontmatter.title} | BButner</title>
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
        <h1 className="p-0 m-0">{frontmatter.title}</h1>
        <i className="text-gray-500">
          {dayjs(frontmatter.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
          {frontmatter.readingTime}
        </i>
        <div className="content">
          <MDXRemote {...source} />
        </div>
      </div>
    </div>
  )
}

// dynamically generate the slugs for each article(s)
export async function getStaticPaths() {
  // getting all paths of each article as an array of
  // objects with their unique slugs
  const paths = (await getSlug()).map((slug) => ({ params: { slug } }))

  return {
    paths,
    // in situations where you try to access a path
    // that does not exist. it'll return a 404 page
    fallback: false,
  }
}

// @ts-ignore TODO
export async function getStaticProps({ params }) {
  //fetch the particular file based on the slug
  const { slug } = params
  const { content, frontmatter } = await getArticleFromSlug(slug)

  const mdxSource = await serialize(content, {
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
      post: {
        source: mdxSource,
        frontmatter,
      },
    },
  }
}

export default BlogPage;
