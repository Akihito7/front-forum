import { getManyPost } from "@/api/get-many-post";
import { useQuery } from "@tanstack/react-query";

export function useFeed() {

  async function fetchPosts() {
    return getManyPost();
  }

  const { data: posts, isFetching: postsIsFetching, isLoading: postIsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })

  return {
    posts,
    postsIsFetching,
    postIsLoading
  }
}