import moment from "moment";
import React from "react";
import { Rating } from "react-simple-star-rating";

const Comment = ({ comment }) => {
  return (
    <>
      <div className="py-4 border-bottom d-flex flex-column">
        <Rating
          className="rating"
          initialValue={comment.Star}
          size={15}
          readonly
        />
        <div>
          <strong className="text-primary">
            {comment.PostedBy.FirstName + " " + comment.PostedBy.LastName}
          </strong>{" "}
          on{" "}
          <strong className="text-primary">
            {moment(comment.DateAt).format("MMM DD, YYYY")}
          </strong>
        </div>
        <span className="mt-2">{comment.Comment}</span>
      </div>
    </>
  );
};

export default Comment;
