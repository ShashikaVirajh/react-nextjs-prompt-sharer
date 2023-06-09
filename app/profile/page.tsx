'use client';

import { useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Profile from '@components/profile';
import { Post, SessionUser } from '@types';

const MyProfile: FC = (): JSX.Element => {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user as SessionUser;

  const [myPosts, setMyPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      const response = await fetch(`/api/users/${user?.id}/posts`);
      const data: Post[] = await response.json();

      setMyPosts(data);
    };

    if (user?.id) fetchPosts();
  }, [user?.id]);

  const handleEdit = (post: Post): void => {
    router.push(`/prompt/update?id=${post._id}`);
  };

  const handleDelete = async (post: Post): Promise<void> => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id?.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = myPosts.filter((post: Post) => post._id !== post._id);

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
