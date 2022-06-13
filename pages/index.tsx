import {NextPage} from "next";
import { Desktop } from "../components/layout/Desktop";
import { Layout } from "../components/layout/layout";
import {NextSeo} from "next-seo";
import {useRouter} from "next/router";

const Index: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <NextSeo
        title="Beau Butner"
        description="Personal portfolio website, in the style of macOS."
        openGraph={{
          url: router.asPath,
          type: 'website',
          title: 'Beau Butner',
          description: 'Personal portfolio website, in the style of macOS.',
          locale: 'en_US',
          images: [
            {
              url: '/images/avatar_small.webp',
              width: 300,
              height: 300,
              alt: 'Beau Butner'
            }
          ],
        }}
      />
      <Desktop/>
    </Layout>
  )
}

export default Index
