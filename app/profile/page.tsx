"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/profile";
import { Post, User } from "@types";

const MyProfile = () => {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user as User;

  const [myPosts, setMyPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${user?.id}/posts`);
      const data: Post[] = await response.json();

      setMyPosts(data);
    };

    if (user?.id) fetchPosts();
  }, [user?.id]);

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id?.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter(
          (post: Post) => post._id !== post._id
        );

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
