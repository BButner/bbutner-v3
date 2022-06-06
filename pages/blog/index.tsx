import {NextPage} from "next";
import Link from "next/link";
import { getAllArticles, Article } from "../../lib/blog/articles";

interface BlogIndexProps {
  articles: Article[];
}

const Index: NextPage<BlogIndexProps> = ({ articles }) => {
  console.log(articles);
  return (
    <div className="m-auto prose prose-amber dark:prose-invert w-3/4 lg:w-2/3 max-w-full py-8">
      <h1>BButner Blog</h1>
      <h2>Posts</h2>
      <ul>
        {articles.map(post => {
          return <li key={post.slug}>
            <span className="font-bold">[{post.headerData.publishedAt}]</span>&nbsp;
            <Link href={`/blog/${post.slug}`} className="text-orange-400">
              {post.headerData.title}
            </Link>
            &nbsp;-&nbsp;
            <span className="italic">{post.headerData.excerpt}</span>
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
      articles: articles.reverse(),
    },
  }
}

export default Index
