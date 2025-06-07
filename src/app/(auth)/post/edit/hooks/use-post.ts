import { getPostById } from "@/api/get-post-by-id";
import { updatePost } from "@/api/update-post";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  title: string;
  content: string;
  tags: string[];
};

export function usePost() {
  const { id: postId } = useParams();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      content: "",
      tags: [],
      title: "",
    },
  });

  const router = useRouter();

  const { data: post, isLoading: postIsLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById({ postId: postId!.toString() }),
  });

  const { mutateAsync } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success("Post atualizado com sucesso.");
      router.push("/");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  async function handleUpdatePost(data: FormData) {
    await mutateAsync({
      ...data,
      id: postId!.toString(),
    });
  }

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setValue("tags", [...tags, newTag]);
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("content", post.content);
      setValue("tags", post.tags);
      setTags(post.tags || []);
    }
  }, [post, setValue]);


  return {
    post,
    postIsLoading,
    register,
    setValue,
    handleSubmit,
    handleUpdatePost,
    handleAddTag,
    handleRemoveTag,
    tags,
    tagInput,
    setTagInput
  }
}