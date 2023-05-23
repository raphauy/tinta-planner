
interface SlugProps {
  params: {
    slug: string;
  };
}

function SlugHome({ params }: SlugProps) {
  const { slug } = params;
  console.log(slug);
  
  return (
    <div className="flex items-center justify-center w-full mt-52">
      <div className="text-5xl font-bold">{slug.charAt(0).toUpperCase() + slug.slice(1)}</div>
    </div>
  );
}

export default SlugHome;
