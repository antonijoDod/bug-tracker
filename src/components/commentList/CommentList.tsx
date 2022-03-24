import React from "react";
import { List, Comment, Avatar } from "antd";
import moment from "moment";

const CommentList = ({ comments, commentsIsLoading }) => {
  return (
    <List
      loading={commentsIsLoading}
      dataSource={comments?.data}
      /* header={`${comments?.data.length} ${
        comments?.data.length > 1 ? "replies" : "reply"
      }`} */
      itemLayout="horizontal"
      renderItem={({ id, attributes }) => (
        <List.Item>
          <Comment
            content={attributes.message}
            author={attributes.author.data.attributes.username}
            datetime={moment(attributes.createdAt).format(
              "DD MMM, YYYY, HH:mm"
            )}
            avatar={
              <Avatar
                children={"A"}
                style={{
                  backgroundColor:
                    attributes.author.data.attributes.avatar_color,
                  color: "white",
                }}
              />
            }
          />
        </List.Item>
      )}
    />
  );
};

export default CommentList;
