import client from "@components/graphql";
import { gql } from '@apollo/client'
import { NextPage } from "next";

const Blogs: NextPage = () => {
  return (
    <div>
      Blogs
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Blogs {
        blogCollection(limit: 10) {
          items{
            sys{
              id
            }
            title
            content {
              json
            }
          }
        }
      }
    `,
  });
  console.log({ data })

  return {
    props: {
      Blogs: data
    },
  };
}

export default Blogs;
