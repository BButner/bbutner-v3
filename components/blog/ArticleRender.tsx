import {BlogPageProps} from "../../pages/blog/[slug]";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import {MDXRemote} from "next-mdx-remote";
import dynamic from "next/dynamic";
import {MDXComponents} from "mdx/types";
import {NextSeo} from "next-seo";
import {Tag} from "components/blog/Tag";

const componentRegEx: RegExp = new RegExp(/\<.* \/\>/);
const getDynamicComponent = (name: string) => dynamic(() => import(`./post_specific/${name}.tsx`).catch(err => () => {
  console.log(err)
}), {ssr: false});

export const ArticleRender: React.FC<BlogPageProps> = ({source, article}) => {
  const components: MDXComponents = {}

  const matches = componentRegEx.exec(article.body);

  if (matches) {
    matches.forEach(match => {
      const name = match.replace('<', '').replace(' />', '');

      components[name] = getDynamicComponent(name);
    });
  }

  return (
    <div className="m-auto">
      <NextSeo
        title={`BButner Blog - ${article.headerData.title}`}
        description={article.headerData.excerpt}/>
      <Head>
        <title>{article.headerData.title} | BButner</title>
      </Head>
      <div className="prose prose-amber prose-pre:shadow-xl dark:prose-invert w-3/4 lg:w-2/3 max-w-full m-auto py-8">
        <div className="pb-8 w-fit">
          <Link href="/blog">
            <a className="pb-8 dark:text-zinc-100">
              &lt; Back
            </a>
          </Link>
        </div>
        <div className="space-y-2">
          <h1 className="p-0 m-0">{article.headerData.title}</h1>
          <i className="text-gray-500">
            {dayjs(article.headerData.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
            {article.headerData.readingTime}
          </i>
          <div className="flex items-center space-x-2">
            {article.headerData.tags.map(tag => <Tag key={tag} tag={tag}/>)}
          </div>
        </div>
        <div className="content">
          <MDXRemote {...source} components={components}/>
        </div>
      </div>
    </div>
  )
}
