import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import axios from "axios";
import clsx from "clsx";
import ReactQuill, { Quill } from "react-quill";
//import { ImageResize } from "quill-image-resize-module";
//Quill.register("modules/imageResize", ImageResize);

interface EditorProps {
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

function Editor({ readOnly, value, onChange }: EditorProps) {
  const { data: session, status } = useSession();
  const loggedInUser = session?.user;

  const quillRef = useRef<ReactQuill>();

  const imageHandler = () => {
    const input = document.getElementById("imageUpload")! as HTMLInputElement;
    input!.click();

    const changeListener = async () => {
      const files = Object.values(input.files!);

      const formData = new FormData();
      if (loggedInUser?.email) {
        formData.append("email", loggedInUser!.email!);
      }

      Object.values(files).forEach((file: File) => {
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
        multiple
        style={{ display: "none" }}
        type="file"
      />
    </>
  );
}

export default Editor;
