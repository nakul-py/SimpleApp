import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/config";
import { addPost } from "../../store/postSlice";

function PostForm({ post }) {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        id: post?.id || "",
        message: post?.message || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (data) => {
    setIsSubmitting(true);
    try {
      if (post) {
        console.log("Submitted Data:", data);
        const file =
          data.image && data.image.length > 0
            ? await service.createFile(data.image[0])
            : null;

        if (file) {
          await service.deleteFile(post.featuredImage);
        }

        const postDb = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (postDb) {
          dispatch(addPost(postDb));
          navigate(`/`);
        }
      } else {
        const file =
          data.image && data.image.length > 0
            ? await service.createFile(data.image[0])
            : null;

        const postPayload = {
          ...data,
          userId: user.$id,
          featuredImage: file ? file.$id : null,
        };

        const postDb = await service.createPost(postPayload);

        if (postDb) {
          dispatch(addPost(postDb));
          navigate(`/`);
        }
      }
    } catch (error) {
      console.error("Post submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const idTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "~")
        .replace(/\s/g, "~");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("id", idTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, idTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Enter image title"
          className="mb-4 "
          textarea
          {...register("title", { required: true })}
        />
        <Input
          label="Id :"
          placeholder="Id"
          className="mb-4"
          {...register("id", { required: true })}
          onInput={(e) => {
            setValue("id", idTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <Input
          label="Message :"
          placeholder="Type your message"
          className="mb-4"
          textarea
          {...register("message", { required: true })}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full hover:bg-lime-500 text-white font-bold text-lg transition-all duration-200 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <span className="loader border-white border-t-transparent border-2 rounded-full w-4 h-4 animate-spin"></span>
              {post ? "Updating..." : "Submitting..."}
            </>
          ) : post ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
