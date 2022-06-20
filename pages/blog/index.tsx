import {NextPage} from "next";
import Link from "next/link";
import {getAllArticles, Article} from "../../lib/blog/articles";
import {NextSeo} from "next-seo";
import {useRouter} from "next/router";
import {Tag} from "../../components/blog/Tag";
import {useState} from "react";

interface BlogIndexProps {
  articles: Article[];
}

const Index: NextPage<BlogIndexProps> = ({articles}) => {
  const [filter, setFilter] = useState<string>('');
  const router = useRouter();

  const tag = router.query.tag as string | undefined;

  if (tag) articles = articles.filter(article => article.headerData.tags.includes(tag))

  return (
    <div className="m-auto prose prose-amber dark:prose-invert w-3/4 lg:w-2/3 max-w-full py-8">
      <NextSeo
        title="BButner - Blog"
        description="A blog for development, tech, and more!"/>
      <h1>BButner - Blog</h1>
      <Link href="/">
        &lt; Back to macOS
      </Link>
      <h2>Posts</h2>
      {tag && <div
        className="italic">
        Filtering for tag &quot;{tag}&quot;&nbsp;<Link href="/blog" className="font-bold text-red-500">X</Link>
      </div>}
      <ul>
        {articles
          .sort((a, b) => Date.parse(b.headerData.publishedAt) - Date.parse(a.headerData.publishedAt))
          .map(post => {
            return <li key={post.slug}>
              <span className="font-bold">[{post.headerData.publishedAt}]</span>&nbsp;
              <Link href={`/blog/${post.slug}`} className="text-orange-400">
                {post.headerData.title}
              </Link>
              &nbsp;-&nbsp;
              <span className="italic">{post.headerData.excerpt}</span>
              <br/>
              <div className="flex items-center space-x-2">
                {post.headerData.tags.map(tag => <Tag key={tag} tag={tag}/>)}
              </div>
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
