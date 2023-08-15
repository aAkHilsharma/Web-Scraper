import React, { useState } from "react";
import { Button } from "antd";
import { getScrapedData } from "../utils/getScrapedData";
import { toast } from "react-hot-toast";

const Textarea = ({ setData }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setUrl(value);
    setError(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (url.trim() === "") {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const data = await getScrapedData(url);
      if (data.success) {
        setData(data.payload);
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setUrl("");
    }
  };

  return (
    <div>
      <div className="form-floating">
        <textarea
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          style={{ height: "100px" }}
          value={url}
          required
          onChange={handleChange}
        ></textarea>
        <label htmlFor="floatingTextarea2">Enter URL</label>
        {error && (
          <div className="invalid-feedback">Please fill in the url.</div>
        )}
      </div>
      <div className="mt-4">
        <Button
          onClick={handleClick}
          style={{
            display: "flex",
            alignItems: "center",
            background: "blue",
            color: "white",
            paddingTop: "1.2rem",
            paddingBottom: "1.2rem",
            justifyContent: "center",
            fontWeight: "500",
            fontSize: "1.1rem",
          }}
          type="primary"
          block
          loading={loading}
        >
          Scrape
        </Button>
      </div>
    </div>
  );
};

export default Textarea;
