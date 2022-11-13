import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import axios from "axios";
import clsx from "clsx";
import ReactQuill from "react-quill";
//import { ImageResize } from "quill-image-resize-module";
//Quill.register("modules/imageResize", ImageResize);

interface EditorProps {
  bucket?: string;
  className?: string;
  forwardedRef?: React.Ref<any>;
  modules?: any;
  placeholder?: string;
  readOnly?: boolean;
  theme?: string;
  value?: string;
  onChange?: Dispatch<SetStateAction<string>>;
}

const DynamicReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function comp({ forwardedRef, ...props }: EditorProps) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

function Editor({ bucket, readOnly, value, onChange }: EditorProps) {
  const { data: session, status } = useSession();
  const loggedInUser = session?.user;

  const quillRef = useRef<ReactQuill>();

  const onChangeUploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]!;
    const filename = encodeURIComponent((file as any).name);
    const fileType = encodeURIComponent((file as any).type);

    const res = await fetch(
      `/api/imageUpload/uploadUrl?file=${filename}&fileType=${fileType}&bucket=${bucket}`
    );
    const { url, fields } = await res.json();

    const formData = new FormData();
    if (loggedInUser?.email) {
      formData.append("email", loggedInUser!.email!);
    }
    formData.append("url", url);
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    await axios
      .post(`/api/imageUpload/${bucket}`, formData, config)
      .then(async (res) => {
        const editor = quillRef.current!.getEditor();
        const range = editor.getSelection()!;

        editor.insertEmbed(
          range.index,
          "image",
          `https://storage.cloud.google.com/passersby_${bucket}/${res.data}`
        );
      })
      .catch((error) => console.log(error));
  };

  const imageHandler = () => {
    const input = document.getElementById("imageUpload")! as HTMLInputElement;
    input!.click();
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
        ],
        ...(!readOnly && {
          handlers: {
            image: imageHandler,
          },
        }),
      },
      //ImageResize: {
      //parchment: Quill.import("parchment"),
      //},
    };
  }, [readOnly]);

  return (
    <>
      <DynamicReactQuill
        className={clsx("quill-container editor-height", {
          isShow: readOnly === true,
        })}
        forwardedRef={quillRef}
        modules={modules}
        placeholder="내용을 입력하세요."
        readOnly={readOnly}
        theme="snow"
        value={value}
        onChange={onChange}
      />
      <input
        accept="image/*"
        id="imageUpload"
        onChange={onChangeUploadImage}
        style={{ display: "none" }}
        type="file"
      />
    </>
  );
}

export default Editor;
