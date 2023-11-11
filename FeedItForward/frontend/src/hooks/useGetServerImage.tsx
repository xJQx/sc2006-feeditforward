import { useState, useEffect } from "react";
import useFetch from "./useFetch";

export const useGetServerImage = (filePath: string) => {
  /**
   * @returns imageUrl: string
   */
  const [imageUrl, setImageUrl] = useState("");
  const fetch = useFetch();

  useEffect(() => {
    const getImageFile = async () => {
      try {
        const url = await fetch.retrieve_image(filePath);
        setImageUrl(url);
      } catch (e: any) {
        console.log(e);
      }
    };
    getImageFile();
  }, []);

  return imageUrl;
};
