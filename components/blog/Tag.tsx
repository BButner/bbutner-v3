interface TagProps {
  tag: string;
}

export const Tag: React.FC<TagProps> = ({tag}) => {
  return (
    <button className="py-1 px-2 bg-zinc-500 text-xs rounded-lg text-white">{tag}</button>
  )
}
