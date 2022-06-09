interface TagProps {
  tag: string;
}

export const Tag: React.FC<TagProps> = ({tag}) => {
  return (
    <div>{tag}</div>
  )
}