(() => {
    // DOM-level hardlock — only run if nothing exists
    if (
      document.querySelector("#poolpal-button") ||
      document.querySelector("#poolpal-chat")
    ) return;
  
    const chatButton = document.createElement("button");
    chatButton.id = "poolpal-button";
    chatButton.innerText = "Chat with PoolPal";
    Object.assign(chatButton.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "12px 16px",
      background: "#2563EB",
      color: "#fff",
      border: "none",
      borderRadius: "9999px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      cursor: "pointer",
      zIndex: "9998"
    });
    document.body.appendChild(chatButton);
  
    chatButton.addEventListener("click", function () {
      const existing = document.getElementById("poolpal-chat");
      if (existing) {
        existing.remove();
      } else {
        const iframe = document.createElement("iframe");
        iframe.id = "poolpal-chat";
        iframe.src = "https://poolpal-ai-chat.vercel.app";
        Object.assign(iframe.style, {
          position: "fixed",
          bottom: "80px",
          right: "20px",
          width: "420px",
          height: "600px",
          border: "none",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          zIndex: "9999"
        });
        document.body.appendChild(iframe);
      }
    });
  })();