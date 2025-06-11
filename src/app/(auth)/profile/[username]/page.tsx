import { getProfile } from "@/api/get-profile";
import { formatterDate } from "@/utils/formmaterDate";
import { ModalFollow } from "./modal-follow";
import { getUser } from "@/server-actions/get-user";
import { ActionFollow } from "./action-follow";

interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  totalLikes: number;
  totalComments: number;
}

interface Comment {
  id: string;
  authorId: string;
  content: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  postTitle: string;
}

export default async function ProfilePage({ params }: any) {
  const { username } = await params;

  const { user, posts, comment } = await getProfile({ username });

  const currentUser = await getUser();

  const currentUserFollowsThisUser = user.followersOfUser.some(
    (follower) => follower.followerId === currentUser?.id
  );

  return (
    <main className="max-w-6xl mx-auto p-6 grid grid-cols-[2fr_1fr] gap-10">
      <section className="space-y-10">
        <header className="flex items-center space-x-8 bg-[#1e1e1e] rounded-md p-6 shadow-lg">
          <div className="w-28 h-28 rounded-full bg-violet-700 flex items-center justify-center text-white text-5xl font-bold">
            {user.name[0]}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-bold text-white">{user.name}</h1>
              {currentUser && currentUser.id !== user.id && (
                <ActionFollow
                  actionType={
                    currentUserFollowsThisUser ? "unfollow" : "follow"
                  }
                  currentUserId={currentUser.id}
                  targetUserId={user.id}
                />
              )}
            </div>

            <p className="text-violet-400 text-xl mb-2">@{user.username}</p>

            <div className="flex space-x-8 mt-6 text-zinc-300">
              <div>
                <strong className="text-white">{user.totalPosts}</strong>{" "}
                {user.totalPosts > 1 ? "Posts" : "Post"}
              </div>
              <div>
                <strong className="text-white">{user.totalComments}</strong>{" "}
                {user.totalComments > 1 ? "Comentários" : "Comentário"}
              </div>
              <ModalFollow
                title="Seguidores"
                data={user.followersOfUser}
                key={user.followersOfUser.length}
              >
                <div className="cursor-pointer">
                  <strong className="text-white">
                    {user.followersOfUser.length}
                  </strong>{" "}
                  Seguidores
                </div>
              </ModalFollow>
              <ModalFollow data={user.usersIamFollowing} title="Seguindo">
                <div className="cursor-pointer">
                  <strong className="text-white">
                    {user.usersIamFollowing.length}
                  </strong>{" "}
                  Seguindo
                </div>
              </ModalFollow>
            </div>
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Posts recentes
          </h2>
          <ul className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post: Post) => (
                <li
                  key={post.id}
                  className="bg-[#1e1e1e] p-4 rounded-md shadow hover:shadow-xl transition"
                >
                  <a
                    href={`/post/${post.id}`}
                    className="text-violet-400 font-semibold text-lg hover:underline"
                  >
                    {post.title}
                  </a>
                  <div className="text-zinc-400 text-sm mt-1 flex gap-4">
                    <span>Publicado em {formatterDate(post.createdAt)}</span>
                    <span>
                      ❤️ {post.totalLikes}{" "}
                      {post.totalLikes > 1 ? "likes" : "like"}
                    </span>
                    <span>
                      💬 {post.totalComments}{" "}
                      {post.totalComments > 1 ? "comentários" : "comentário"}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-zinc-500">Nenhum post ainda.</p>
            )}
          </ul>
        </section>
      </section>

      <aside className="space-y-6">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Respostas recentes
        </h2>
        {comment.length > 0 ? (
          <ul className="space-y-4">
            {comment.map((comment: Comment) => (
              <li
                key={comment.id}
                className="bg-[#1e1e1e] p-4 rounded-md shadow hover:shadow-xl transition"
              >
                <a
                  href={`/post/${comment.postId}`}
                  className="text-violet-400 font-semibold hover:underline"
                >
                  {comment.postTitle}
                </a>
                <p className="text-zinc-400 text-sm mt-1 line-clamp-3">
                  {comment.content}
                </p>
                <div className="text-zinc-500 text-xs mt-2">
                  Respondido em {formatterDate(comment.createdAt)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-500">Nenhuma resposta recente.</p>
        )}
      </aside>
    </main>
  );
}
