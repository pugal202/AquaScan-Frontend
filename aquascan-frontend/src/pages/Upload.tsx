import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  // -----------------------------------------
  // HANDLE FILE
  // -----------------------------------------

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("File size must be less than 10 MB.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setMessage("");
  };

  // -----------------------------------------
  // FILE INPUT
  // -----------------------------------------

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  // -----------------------------------------
  // DRAG & DROP
  // -----------------------------------------

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  // -----------------------------------------
  // REMOVE IMAGE
  // -----------------------------------------

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl(null);
    setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // -----------------------------------------
  // CONVERT IMAGE TO BASE64
  // -----------------------------------------

  const convertToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Unable to read image."));
        }
      };

      reader.onerror = () => {
        reject(new Error("Unable to read image."));
      };

      reader.readAsDataURL(file);
    });
  };

  // -----------------------------------------
  // ANALYZE
  // -----------------------------------------

  const handleAnalyze = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Please upload a sonar image first.");
      return;
    }

    if (analyzing) {
      return;
    }

    try {
      setAnalyzing(true);
      setMessage("");

      // Convert uploaded image so Results page
      // can display it even before backend integration.
      const imageData = await convertToDataUrl(selectedFile);

      // Temporary frontend analysis ID.
      // Later this will come from the backend.
      const analysisId = Date.now().toString();

      const analysisData = {
        id: analysisId,

        fileName: selectedFile.name,

        fileSize: selectedFile.size,

        image: imageData,

        location:
          location.trim() || "Location not provided",

        description:
          description.trim() || "No additional notes provided.",

        createdAt: new Date().toISOString(),

        // Temporary demo AI values.
        // These will later come from the ML/backend response.
        objectType: "Pipe / Cable",

        confidence: 94.6,

        status: "Pending Review",
      };

      // Save current analysis.
      sessionStorage.setItem(
        `aquascan-analysis-${analysisId}`,
        JSON.stringify(analysisData)
      );

      // Also keep track of analysis IDs.
      const existingIds = JSON.parse(
        sessionStorage.getItem("aquascan-analysis-ids") || "[]"
      );

      existingIds.unshift(analysisId);

      sessionStorage.setItem(
        "aquascan-analysis-ids",
        JSON.stringify(existingIds)
      );

      setMessage("Analysis submitted successfully.");

      // Small delay so the user sees the loading state.
      setTimeout(() => {
        navigate(`/results/${analysisId}`);
      }, 700);
    } catch (error) {
      console.error(error);

      setAnalyzing(false);
      setMessage(
        "Something went wrong while preparing the analysis."
      );
    }
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          AquaScan AI
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-100 sm:text-4xl">
          New Analysis
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
          Upload underwater sonar imagery to detect and classify
          potential marine debris using AI.
        </p>
      </div>


      {/* MAIN FORM */}

      <form
        onSubmit={handleAnalyze}
        className="grid grid-cols-1 gap-6 xl:grid-cols-3"
      >

        {/* UPLOAD SECTION */}

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7 xl:col-span-2">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-100">
              Sonar Image
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Upload a sonar or underwater image for analysis.
            </p>
          </div>


          {/* DROPZONE */}

          {!selectedFile ? (

            <div
              onDragEnter={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                setDragActive(false);
              }}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex min-h-[360px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition ${
                dragActive
                  ? "border-cyan-400 bg-cyan-400/10"
                  : "border-slate-700 bg-slate-950 hover:border-cyan-400/60 hover:bg-slate-950/80"
              }`}
            >

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-400/10 text-4xl text-cyan-400">
                ↑
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-200">
                Drop your sonar image here
              </h3>

              <p className="mt-2 max-w-md text-sm text-slate-500">
                Drag and drop your image here, or click to browse
                files from your computer.
              </p>

              <span className="mt-5 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Browse Files
              </span>

              <p className="mt-4 text-xs text-slate-600">
                Supported: JPG, JPEG, PNG • Maximum size: 10 MB
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="hidden"
              />

            </div>

          ) : (

            /* IMAGE PREVIEW */

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">

              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-200">
                    Selected Image
                  </p>

                  <p className="mt-1 break-all text-xs text-slate-500">
                    {selectedFile.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  disabled={analyzing}
                  className="w-fit rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remove
                </button>

              </div>


              {/* PREVIEW */}

              <div className="overflow-hidden rounded-xl border border-slate-800 bg-black">

                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Selected sonar preview"
                    className="max-h-[430px] w-full object-contain"
                  />
                )}

              </div>


              {/* FILE INFO */}

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                  <p className="text-xs text-slate-500">
                    File Name
                  </p>

                  <p className="mt-1 break-all text-sm text-slate-200">
                    {selectedFile.name}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                  <p className="text-xs text-slate-500">
                    File Size
                  </p>

                  <p className="mt-1 text-sm text-slate-200">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

              </div>

            </div>
          )}

        </section>


        {/* ANALYSIS DETAILS */}

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-100">
              Analysis Details
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Add optional information about the detection area.
            </p>
          </div>


          {/* LOCATION */}

          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Detection Location
            </label>

            <input
              id="location"
              type="text"
              value={location}
              disabled={analyzing}
              onChange={(event) =>
                setLocation(event.target.value)
              }
              placeholder="Example: Chennai Coast"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <p className="mt-2 text-xs text-slate-600">
              Enter the approximate survey or detection location.
            </p>
          </div>


          {/* DESCRIPTION */}

          <div className="mt-5">

            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Additional Notes
            </label>

            <textarea
              id="description"
              rows={5}
              value={description}
              disabled={analyzing}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Add any observations about the sonar image..."
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            />

          </div>


          {/* AI INFORMATION */}

          <div className="mt-5 rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-4">

            <div className="flex items-start gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-xs font-bold text-cyan-400">
                AI
              </div>

              <div>
                <p className="text-sm font-medium text-slate-200">
                  AI Detection
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  The uploaded image will be analyzed for
                  potential underwater debris and classified
                  based on the available AI model.
                </p>
              </div>

            </div>

          </div>


          {/* MESSAGE */}

          {message && (
            <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-sm text-cyan-400">
              {message}
            </div>
          )}


          {/* SUBMIT */}

          <button
            type="submit"
            disabled={analyzing}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {analyzing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                Preparing Analysis...
              </>
            ) : (
              "Analyze Sonar Image →"
            )}
          </button>

          <p className="mt-3 text-center text-xs text-slate-600">
            Analysis results will appear on the Results page.
          </p>

        </section>

      </form>


      {/* PROCESS INFORMATION */}

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          <div>
            <p className="text-sm font-semibold text-slate-200">
              01 · Upload
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Provide a clear underwater or sonar image.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-200">
              02 · AI Analysis
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              The detection model identifies possible debris
              and estimates confidence.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-200">
              03 · Review
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Review the detected object, confidence and
              location on the Results page.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Upload;