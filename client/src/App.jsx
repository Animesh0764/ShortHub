import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleShortenUrl = async () => {
    try {
      const response = await fetch("http://localhost:3500/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setShortenedUrl(`http://localhost:3500/${data.id}`);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%"
      }}
    >
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={handleInputChange}
        style={{ width: "300px", padding: "10px", marginRight: "10px" }}
      />
      <button onClick={handleShortenUrl} style={{ padding: "10px", marginTop: "10px" }}>
        Shorten URL
      </button>
      {shortenedUrl && (
        <div style={{ marginTop: "20px" }}>
          <h2>Shortened URL:</h2>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
