import { useMemo, useRef } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import axios from "axios";
import ReactQuill from "react-quill";

interface EditorProps {
  className?: any;
  forwardedRef?: any;
  modules?: any;
  onChange?: any;
  placeholder?: string;
  readOnly?: boolean;
  theme?: string;
  value?: any;
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

function Editor({ readOnly, value, onChange }: EditorProps) {
  const { data: session, status } = useSession();
  const loggedInUser = session?.user;

  const quillRef = useRef<ReactQuill>();

  const imageHandler = () => {
    const input: any = document.getElementById("imageUpload");
    input!.click();

    const changeListener = async () => {
      const files = Object.values(input.files);

      const formData = new FormData();
      if (loggedInUser?.email) {
        formData.append("email", loggedInUser!.email!);
      }

      Object.values(files).forEach((file: any) => {
        formData.append("file", file);
        formData.append("image", encodeURIComponent(file.name));
      });

      // for (let value of formData.values()) {
      //   console.log(value);
      // }

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };

      await axios
        .post("/api/editor", formData, config)
        .then((res) => {
          const editor = quillRef.current!.getEditor();
          const range = editor.getSelection()!;
          const images = Object.values(res.data);
          for (var image of images) {
            editor.insertEmbed(
              range.index,
              "image",
              `${process.env.NEXT_PUBLIC_ENV_HOST}${image}`
            );
          }
          input.removeEventListener("change", changeListener);
        })
        .catch((error) => console.log(error));
    };

    input.addEventListener("change", changeListener);
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
        onChange={onChange}
        placeholder="내용을 입력하세요."
        readOnly={readOnly}
        theme="snow"
        value={value}
      />
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
      />
    </>
  );
}

export default Editor;
