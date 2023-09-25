import { useParams } from "next/navigation";
import { useMemo } from "react";


function useClient() {

  const params = useParams()
  
  const slug = useMemo(() => {
    if (!params?.slug) {
      return '';
    }

    return params.slug;
  }, [params?.slug]);

  return useMemo(() => ({
    slug,
  }), [slug]);
};

export default useClient;