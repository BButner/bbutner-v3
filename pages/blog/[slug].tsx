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

const BlogPage: NextPage = ({ post: { source, frontmatter } }) => {
  console.log(source);
  return (
    <div className="m-auto">
      <Head>
        <title>{frontmatter.title} | BButner</title>
      </Head>
      <div className="prose w-3/4 lg:w-2/3 max-w-full m-auto my-8">
        <h1 className="p-0 m-0">{frontmatter.title}</h1>
        <p className="text-gray-500 italic">
          {dayjs(frontmatter.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
          {frontmatter.readingTime}
        </p>
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

export async function getStaticProps({ params }) {
  //fetch the particular file based on the slug
  const { slug } = params
  const { content, frontmatter } = await getArticleFromSlug(slug)

  console.log(content)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: { className: ['anchor'] },
          },
          { behaviour: 'wrap' },
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