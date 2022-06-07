import {BlogPageProps} from "../../pages/blog/[slug]";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import dayjs from "dayjs";
import {MDXRemote} from "next-mdx-remote";
import dynamic from "next/dynamic";
import {MDXComponents} from "mdx/types";

const componentRegEx: RegExp = new RegExp(/\<.* \/\>/);

const getDynamicComponent = (name: string) => dynamic(() => import(`./post_specific/${name}`).catch(err => () => {
  console.log(err)
  return <p>❌ Component not found.</p>
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
      <Head>
        <title>{article.headerData.title} | BButner</title>
      </Head>
      <div className="prose prose-amber prose-pre:shadow-xl dark:prose-invert w-3/4 lg:w-2/3 max-w-full m-auto py-8">
        <div className="pb-8 w-fit">
          <Link href="/blog">
            <a className="pb-8 text-zinc-900 dark:text-zinc-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
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
          <MDXRemote {...source} components={components}/>
        </div>
      </div>
    </div>
  )
}
