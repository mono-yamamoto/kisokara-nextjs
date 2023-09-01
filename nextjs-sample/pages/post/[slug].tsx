import { GetStaticPaths, GetStaticProps } from "next";
import { Post, getPostContents, getPosts } from "..";

type StaticProps = {
  post?: Post;
};

type StaticPathsParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<StaticProps, StaticPathsParams> = async ({ params, preview }) => {
  const notFoundProps = {
    props: {},
    redirect: {
      destination: "/404",
    },
  };
  if (!params) {
    return notFoundProps;
  }
  const { slug } = params;
  const posts = await getPosts(slug);
  const post = posts.shift();
  if (!post) {
    return notFoundProps;
  }
  const contents = await getPostContents(post);
  post.contents = contents;
  return {
    props: {
      post,
    },
  };
};

import { NextPage } from "next";
import prism from "prismjs";
import { useEffect } from "react";
import { Layout } from "@/lib/component/Lauout";
import { PostComponent } from "@/lib/component/Post";

const PostPage: NextPage<StaticProps> = ({ post }) => {
  useEffect(() => {
    prism.highlightAll();
  }, []);

  if (!post) return null;

  return (
    <Layout>
      <PostComponent post={post} />
    </Layout>
  );
};

export default PostPage;
