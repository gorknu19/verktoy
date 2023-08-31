import { useForm, SubmitHandler } from "react-hook-form";
import { UploadButton } from "./upload";
import { useRef, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForumPostSchemaType, forumPostSchema } from "@/app/api/post/schema";

export const NewPostModal = () => {
  // const [fileId, setFileId] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<ForumPostSchemaType>({
    // values: {
    //   fileId: fileId ?? "",
    // },
    resolver: zodResolver(forumPostSchema),
  });

  const onSubmit2 = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    let url = "/api/upload";

    var formData = new FormData();
    if (!file) return console.log("no file uploaded!");

    formData.append("file", file, file.name);

    let res = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setValue("fileId", res.data.imageDataDB.id);
    onSubmit(e);
  };

  const onSubmit = handleSubmit(async (e) => {
    let data = {
      title: e.title,
      content: e.content,
      fileId: e.fileId,
    };
    let post = await axios.post("/api/post", data);
  });

  return (
    <>
      <div>
        <form
          onSubmit={onSubmit2}
          className="flex flex-col text-black space-y-2"
        >
          <input
            type="text"
            {...register("title")}
            className="rounded-md ring-1 ring-black shadow-md"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
          <textarea
            {...register("content")}
            className="rounded-md ring-1 ring-black shadow-md"
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
          <UploadButton setFile={setFile} file={file} />
          {errors.fileId && (
            <p className="text-red-500">{errors.fileId.message}</p>
          )}
          <input
            type="submit"
            className={`text-gray-300 bg-gray-700 hover:bg-gray-800 hover:text-white rounded-md px-3 py-4 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
          />
        </form>
      </div>
    </>
  );
};
