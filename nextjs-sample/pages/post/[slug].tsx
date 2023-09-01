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

const PostPage: NextPage<StaticProps> = ({ post }) => {
  if (!post) return null;
  return <div>{JSON.stringify(post)}</div>;
};

export default PostPage;
