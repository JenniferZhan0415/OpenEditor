import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./TextEditor.scss";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const template = queryParams.get("template");

  // console.log(documentId);
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

      const fetchDocument = async () => {
        let templateContent = null;
        if (template) {
          const response = await axios.get(
            `http://localhost:5231/template/${template}`
          );
          templateContent = response.data;
        }

        socket.once("load-document", (document) => {
          try {
            quill.setContents(templateContent || JSON.parse(document));
          } catch (err) {
            quill.setContents("");
          }
          quill.enable();
        });
        // socket.emit("get-document", documentId, (res) => {
        //   console.dir(res);
        //   if (res.data) quill.setContents(res.data);
        // });
        socket.emit("get-document", documentId);
      };
      fetchDocument();
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

    // add save button
    const toolbar = wrapper.querySelector(".ql-toolbar");
    const saveButton = document.createElement("button");
    saveButton.id = "save-button";
    saveButton.innerText = "SAVE";
    const saveButtonSpan = document.createElement("span");
    saveButtonSpan.classList.add("ql-formats");
    saveButtonSpan.appendChild(saveButton);
    toolbar.appendChild(saveButtonSpan);

    saveButton.addEventListener("click", () => {
      const contentBody = q.getContents();
      navigate("/documents");
      // console.log(documentId);
      // console.dir(contentBody);
      try {
        axios.post(`http://localhost:5231/save/${documentId}`, contentBody);
      } catch (error) {
        console.log(error);
      }
    });

    const cancelButton = document.createElement("button");
    cancelButton.id = "cancel-button";
    cancelButton.innerText = "CANCEL";
    const cancelButtonSpan = document.createElement("span");
    cancelButtonSpan.classList.add("ql-formats");
    cancelButtonSpan.appendChild(cancelButton);
    toolbar.appendChild(cancelButtonSpan);

    cancelButton.addEventListener("click", () => {
      console.log("clicking on ");
      navigate("/documents");
    });

    q.disable();
    q.enable(false);
    q.setText("Loading.....");
    setQuill(q);
  }, []);

  return (
    <>
      <div className="container" ref={wrapperRef}></div>
    </>
  );
}
