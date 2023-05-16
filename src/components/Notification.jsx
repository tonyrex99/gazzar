import React from "react";
import { Button, Divider } from "antd";
import moment from "moment";

const Post = ({ url, title, date }) => {
  const formattedDate = moment(date).format("Do MMM YYYY");

  return (
    <div
      style={{
        borderBottom: "1px solid var(--grey-600)",
        margin: "4px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          paddingTop: 10,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 16,
              fontFamily: "Satoshi",
              fontWeight: "Regular",
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "var(--grey-800)",
              fontSize: 14,
              fontFamily: "Satoshi",
              fontWeight: "Regular",
              marginTop: 12,
            }}
          >
            {formattedDate}
          </div>
        </div>
        <div style={{ alignSelf: "flex-end", display: "flex" }}>
          <Button
            style={{
              background: "var(--navy-blue-50)",
              color: "var(--primary-navy-blue)",
              height: 30,
              borderRadius: 3,
            }}
            type="primary"
          >
            View details
          </Button>
        </div>
      </div>
    </div>
  );
};

const posts = [
  {
    url: "https://example.com/post-1",
    title: "First post",
    date: "2022-05-13",
  },
  {
    url: "https://example.com/post-2",
    title: "Second post ",
    date: "2022-05-14",
  },
  {
    url: "https://example.com/post-1",
    title: "First post",
    date: "2022-05-13",
  },
  {
    url: "https://example.com/post-2",
    title: "Second post ",
    date: "2022-05-14",
  },
  {
    url: "https://example.com/post-1",
    title: "First post",
    date: "2022-05-13",
  },
  {
    url: "https://example.com/post-2",
    title: "Second post ",
    date: "2022-05-14",
  },
  {
    url: "https://example.com/post-1",
    title: "First post",
    date: "2022-05-13",
  },
  {
    url: "https://example.com/post-2",
    title: "Second post ",
    date: "2022-05-14",
  },
  {
    url: "https://example.com/post-1",
    title: "First post",
    date: "2022-05-13",
  },
  {
    url: "https://example.com/post-2",
    title: "Second post ",
    date: "2022-05-14",
  },
  {
    url: "https://example.com/post-1",
    title: "First post",
    date: "2022-05-13",
  },
  {
    url: "https://example.com/post-2",
    title: "Second p222ost ",
    date: "2022-05-14",
  },
  {
    url: "https://example.com/post-1",
    title: "First post",
    date: "2022-05-13",
  },
  {
    url: "https://example.com/post-2",
    title: "Second post ",
    date: "2022-05-14",
  },
  {
    url: "https://example.com/post-1",
    title: "First post",
    date: "2022-05-13",
  },
  {
    url: "https://example.com/post-2",
    title: "Second p222ost ",
    date: "2022-05-14",
  },
  {
    url: "https://example.com/post-1",
    title: "First post",
    date: "2022-05-13",
  },
  {
    url: "https://example.com/post-2",
    title: "Second post ",
    date: "2022-05-14",
  },
  {
    url: "https://example.com/post-1",
    title: "First post",
    date: "2022-05-13",
  },
  {
    url: "https://example.com/post-2",
    title: "@@@@S@econd p222ost ",
    date: "2022-05-14",
  },
];

const PostList = ({ data = posts }) => {
  return (
    <div>
      {data.map((data) => (
        <Post
          key={data.url}
          url={data.url}
          title={data.title}
          date={data.date}
        />
      ))}
    </div>
  );
};

export default PostList;
