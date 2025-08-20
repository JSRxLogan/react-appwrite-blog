import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

function RTE({ name, label, control, defaultValue = "" }) {
    return (
        <div className="w-full max-w-full overflow-hidden">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        apiKey="5wxiz1nyh8oi41r9lj9dbfgjrv9ygodm0f9yyl4bn1x244uu"
                        init={{
                            menubar: true,
                            min_height: 300,
                            width: "100%",
                            resize: true,
                            toolbar_mode: "sliding",
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | " +
                                "alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist outdent indent | removeformat | help",

                            // ✅ Custom CSS for statusbar
                            content_style: `
    body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
    .tox-statusbar { min-height: 40px !important; } 
    .tox-statusbar__path, .tox-statusbar__wordcount {
      line-height: 40px !important; /* centers text vertically */
    }
  `
                        }}

                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
}

export default RTE;
