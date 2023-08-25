import { Client } from "@notionhq/client";
import { GetStaticProps } from "next";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getStaticProps: GetStaticProps<{}> = async () => {
  const database = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
    filter: {
      and: [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });
  // console.dir(database, { depth: null });

  const blocks = await notion.blocks.children.list({
    block_id: "748a33ce-452b-4d4a-961e-36bf713921c7",
  });

  console.dir(blocks, { depth: null });

  return {
    props: {},
  };
};

const Home = () => {
  return <div></div>;
};

export default Home;
