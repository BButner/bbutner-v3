import Link from "next/link";

interface TagProps {
  tag: string;
}

export const Tag: React.FC<TagProps> = ({tag}) => {
  return (
    <Link
      href={`/blog/?tag=${tag}`}
      className="py-1 px-2 block bg-zinc-500 text-xs rounded-lg text-white no-underline">
      {tag}
    </Link>
  )
}
