import { getCurrentTip } from "@/api/get-current-tip";
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

  async function fetchCurrentTip() {
    return getCurrentTip();
  }

  const { data: tip, isLoading: tipIsLoading } = useQuery({
    queryKey: ['tip'], queryFn: fetchCurrentTip
  });

  return {
    posts,
    postsIsFetching,
    postIsLoading,
    tip,
    tipIsLoading
  }
}