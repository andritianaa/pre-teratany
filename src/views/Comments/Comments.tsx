import React, { useEffect } from "react";
import Button from "../../components/common/Button";
import { withAsync } from "../../helpers/withAsync";
import useToken from "../../hooks/useToken";
import { deleteComment, getComments, postComment } from "../../api/CommentApi";
import { IComment } from "../../types/comment.type";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { FileServerURL } from "../../api/FileApi";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import profileDefault from "../../assets/userPics.jpg";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";

interface CommentProps {
  publicationId: string;
}

const Comments: React.FC<CommentProps> = ({ publicationId }) => {
  const token = useToken();
  const [content, setContent] = React.useState<string>();
  const [comments, setComments] = React.useState<IComment[]>();
  const { profile } = useAppSelector((state) => state.teratany_user);

  const addComment = async () => {
    const { error } = await withAsync(() =>
      postComment(token, profile?._id, content, publicationId)
    );
    if (error instanceof AxiosError) {
      const error_message: string =
        error?.response?.data.description ||
        error?.response?.data ||
        error.message;
      toast.error(error_message);
    } else {
      const newCom = {
        content,
        date: Date.now(),
        profile: {
          name: profile?.name,
          image: profile?.image,
        },
      };
      setComments((com: any) => [...com, newCom]);
      setContent("");
    }
  };

  const removeComment = async (commentId: string) => {
    const { error } = await withAsync(() => deleteComment(token, commentId));
    if (error instanceof AxiosError) {
      const error_message: string =
        error?.response?.data.description ||
        error?.response?.data ||
        error.message;
      toast.error(error_message);
    } else {
      window.location.reload();
      setTimeout(() => {
        toast.success("Comment removed");
      }, 1000);
    }
  };

  const fetchComments = async () => {
    console.log("comments fetching...");

    const { error, response } = await withAsync(() =>
      getComments(token, publicationId)
    );
    if (error instanceof AxiosError) {
      const error_message: string =
        error?.response?.data.description ||
        error?.response?.data ||
        error.message;
      toast.error(error_message);
    } else {
      console.log("comments fetched...");
      setComments(response?.data as Array<IComment>);
    }
  };
  const { t } = useTranslation();

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicationId]);

  return (
    <div className="w-full max-w-[600px] bg-white rounded-lg -mt-6 my-4 mx-6 z-50">
      <h3 className="font-bold -mt-6 pb-2">{t("comments.name")}</h3>
      <div className="flex flex-col h-full custom-height-comment">
        <div className="flex flex-col h-[40%] pb-8 overflow-y-scroll">
          {comments?.map((comment) => (
            <div className=" rounded-md p-3 border my-1 ">
              <div className="flex gap-3 items-center">
                <Link
                  className="flex gap-3 items-center"
                  to={`/profile/${comment?.profile?._id}`}
                >
                  <img
                    src={
                      comment?.profile?.image
                        ? FileServerURL + comment?.profile?.image
                        : profileDefault
                    }
                    className="object-cover w-8 h-8 rounded-full   shadow-emerald-400 "
                    alt="comments"
                  />

                  <h3 className="font-bold">{comment?.profile?.name}</h3>
                </Link>
              </div>

              <p className="flex text-left text-gray-600 mt-2">
                {comment.content}
              </p>
              <div className="flex">
                <p className="text-left text-xs text-gray-400 font-normal mr-2">
                  {moment(comment.date).startOf("second").fromNow()}
                </p>

                {comment?.profile?._id === profile?._id && (
                  <Popover
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <PopoverHandler>
                      <p className="text-left text-xs hover:underline font-normal text-red-500 cursor-pointer">
                        {t("comments.delete")}
                      </p>
                    </PopoverHandler>
                    <PopoverContent
                      placeholder=""
                      className="ml-4 z-1000 shadow-2xl"
                    >
                      {t("comments.deleteConfirm")}
                      <div className="flex">
                        <p
                          className="text-left text-xs hover:underline font-normal text-red-500 cursor-pointer"
                          onClick={() => removeComment(comment?._id!)}
                        >
                          {t("comments.deleteValidate")}
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white w-full custom-form-comment max-w-[600px]">
          <textarea
            className="bg-gray-100 rounded  border leading-normal resize-none w-full h-20 py-2 pl-3 font-normal placeholder-gray-700 focus:outline-none focus:bg-white"
            name="body"
            placeholder={t("comments.yourComment")}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>

          <Button
            name={t("comments.postComment")}
            className="w-full flex justify-end px-3 mt-2"
            onClick={addComment}
            isDisabled={!content ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
