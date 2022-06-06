import path from "path";
import fs from "fs";
import matter from "gray-matter";
import readingTime, {ReadTimeResults} from "reading-time";
import { sync } from "glob";

const articlesPath = path.join(process.cwd(), 'data/articles')

export const getSlugs = async (): Promise<string[]> => {
  const paths = sync(`${articlesPath}/*.mdx`);

  return paths.map(path => {
    const content = path.split('/');
    return content[content.length - 1].replace('.mdx', '');
  });
}

export const getArticleFromSlug = async (slug: string): Promise<Article | null> => {
  const articlePath: string = path.join(articlesPath, slug + '.mdx');

  if (fs.existsSync(articlePath)) {
    const rawData: string = fs.readFileSync(articlePath, 'utf-8');

    return getArticleFromData(slug, rawData);
  }

  return null;
}

export interface Article {
  slug: string;
  headerData: ArticleHeaderData;
  body: string;
}

interface ArticleHeaderData {
  title: string;
  publishedAt: string;
  excerpt: string;
  readingTime: string;
}

export const getAllArticles = async (): Promise<Article[]> => {
  const articles: string[] = fs.readdirSync(articlesPath);
  console.log('articles', articles);

  return articles.map(article => {
    const slug: string = article.replace('.mdx', '');
    const rawData = fs.readFileSync(path.join(articlesPath, article), 'utf-8');

    return getArticleFromData(slug, rawData);
  })
}

const getArticleFromData = (slug: string, rawData: string): Article => {
  const { content, data } = matter(rawData);

  return {
    slug,
    headerData: {
      ...data as ArticleHeaderData,
      readingTime: readingTime(rawData).text
    },
    body: content
  }
}
