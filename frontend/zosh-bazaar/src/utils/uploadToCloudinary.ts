export const uploadToCloudinary = async (file: any) => {
  const cloud_name = "dz2is5pgg";
  const upload_preset = "zoshbazzar";

  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset);

  try {
    const res = await fetch(url, {
      method: "POST",
      body: data,
    });

    const fileData = await res.json();
    return fileData.secure_url;
  } catch (error) {
    return null;
  }
};

