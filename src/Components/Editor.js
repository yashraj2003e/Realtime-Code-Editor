import { useCallback, useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { xml } from "@codemirror/lang-xml";
import { java } from "@codemirror/lang-java";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import toast from "react-hot-toast";
export default function Editor() {
  const [isLocked, setIsLocked] = useState({ lock: false, mount: 0 });
  const [value, setValue] = useState();
  const onChange = useCallback((val, viewUpdate) => {
    setValue(val);
  }, []);

  useEffect(() => {
    function check() {
      document.addEventListener("keyup", checkIfCode);
    }
    check();
    return () => document.removeEventListener("keyup", checkIfCode);
  });

  function checkIfCode(e) {
    if (
      ((e.keyCode >= 65 && e.keyCode <= 91) ||
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 97 && e.keyCode <= 122)) &&
      isLocked.lock
    ) {
      toast.error("Editor is locked !");
    }
  }

  useEffect(() => {
    if (!isLocked.lock && isLocked.mount > 0) {
      toast.success("Editor is Unlocked !");
    }
  }, [isLocked]);

  return (
    <>
      <button
        className="btn lockBtn"
        onClick={() => {
          setIsLocked((prevState) => ({
            lock: !prevState.lock,
            mount: prevState.mount + 1,
          }));
          toast.dismiss();
        }}
      >
        {isLocked.lock ? " Unlock" : "Lock"}
      </button>
      <CodeMirror
        style={{ fontSize: "1rem" }}
        // autoSave={true}
        autoFocus
        value=""
        className="code-mirror"
        height="100vh"
        theme={okaidia}
        extensions={([javascript({ jsx: true })], [xml()], [java()])}
        onChange={onChange}
        readOnly={isLocked.lock}
      />
    </>
  );
}
