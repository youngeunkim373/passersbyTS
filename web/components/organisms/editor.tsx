import clsx from "clsx";
import { useEffect, useState, useMemo } from "react";

interface EditorProps {
  value?: string;
  readOnly?: boolean;
}

const Editor = ({ value, readOnly = false }: EditorProps) => {
  const [contents, setContents] = useState("");
  const [isOpen, setOpen] = useState(false);

  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;

  useEffect(() => {
    setOpen(true);
  }, []);

  const imageHandler = () => {};

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
        ],
        ...(readOnly && {
          handlers: {
            image: imageHandler,
          },
        }),
      },
    };
  }, [readOnly]);

  return (
    <>
      {!!ReactQuill && isOpen && (
        <ReactQuill
          bounds={".app"}
          theme="snow"
          modules={modules}
          placeholder="내용을 입력하세요."
          value={value}
          readOnly={readOnly}
          className={clsx("quill-container editor-height", {
            isShow: readOnly === true,
          })}
        />
      )}
    </>
  );
};

export default Editor;
