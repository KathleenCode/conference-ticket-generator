import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FaCloudDownloadAlt } from "react-icons/fa";


const AvatarUpload = ({ onUpload }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "avatar_upload");

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/dkqachiai/image/upload`,
          formData
        );
        onUpload(res.data.secure_url);
      } catch (err) {
        setError("Upload failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div {...getRootProps()} className="dropzone" >
      <label htmlFor="upload">Upload profile photo</label>
      <div className="dropzon">
        <input {...getInputProps()} aria-describedby="avatarError" id="upload" /> 
        
        {/* aria-invalid={errors.avatar && touched.avatar ? "true" : "false"}
        aria-describedby={errors.avatar && touched.avatar ? "avatarError" : undefined} */}
                    {/* <ErrorMessage component="p" id="avatarError" name="avatar" role="alert" /> */}
        <div className="dropzo"><span><FaCloudDownloadAlt /></span><p>Drag & drop, or click to <br/> upload</p></div>
        {loading && <p>Uploading...</p>}
        {error && <p className="error" id="avatarError">{error}</p>}
      </div>
    </div>
  );
};

export default AvatarUpload;


// const handleFileChange = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   setLoading(true);
//   setError("");

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

//   try {
//     const res = await axios.post(
//       `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
//       formData
//     );
//     onUpload(res.data.secure_url);
//   } catch (err) {
//     setError("Upload failed. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };