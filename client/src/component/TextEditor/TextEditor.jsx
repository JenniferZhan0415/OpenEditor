import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./TextEditor.scss";
import { useParams } from "react-router-dom";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];
export default function TextEditor() {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const { id: documentId } = useParams();
  console.log(documentId);
  useEffect(() => {
    const s = io("http://localhost:5231");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    try {
      if (!socket || !quill) {
        return;
      }
      socket.once("load-document", (document) => {
        quill.setContents(document);
        quill.enable();
      });
      socket.emit("get-document", documentId);
    } catch (error) {
      console.log(error);
    }
  }, [socket, quill, documentId]);

  useEffect(() => {
    try {
      if (!socket || !quill) {
        return;
      }
      const handler = (delta) => {
        quill.updateContents(delta);
      };
      socket.on("receive-changes", handler);

      return () => {
        socket.off("receive-changes", handler);
      };
    } catch (error) {
      console.log(error);
    }
  }, [socket, quill]);

  useEffect(() => {
    try {
      if (!socket || !quill) return;
      const handler = (delta, oldDelta, source) => {
        if (source !== "user") {
          return;
        }
        socket.emit("send-changes", delta);
      };
      quill.on("text-change", handler);

      return () => {
        quill.off("text-change", handler);
      };
    } catch (error) {
      console.log(error);
    }
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;

    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.enable(false);
    q.setText("Loading.....");
    setQuill(q);
  }, []);

  return <div className="container" ref={wrapperRef}></div>;
}
