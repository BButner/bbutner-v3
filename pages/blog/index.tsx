import {NextPage} from "next";
import Link from "next/link";
import { getAllArticles, Post } from "../../lib/blog/articles";

interface BlogIndexProps {
  posts: Post[];
}

const Index: NextPage<BlogIndexProps> = ({ posts }) => {
  return (
    <div className="m-auto prose prose-amber dark:prose-invert py-8">
      <h1>BButner Blog</h1>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => {
          return <li key={post.slug}>
            <span className="font-bold">[{post.publishedAt}]</span>&nbsp;
            <Link href={`/blog/${post.slug}`} className="text-orange-400">
              {post.title}
            </Link>
            &nbsp;-&nbsp;
            <span className="italic">{post.excerpt}</span>
          </li>
        })}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const articles = await getAllArticles()

  articles
    // @ts-ignore TODO
    .map((article) => article.data)
    .sort((a, b) => {
      if (a.data.publishedAt > b.data.publishedAt) return 1
      if (a.data.publishedAt < b.data.publishedAt) return -1

      return 0
    })

  return {
    props: {
      posts: articles.reverse(),
    },
  }
}

export default Index