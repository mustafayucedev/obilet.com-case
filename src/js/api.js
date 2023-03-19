const loader = document.querySelector(".loader");

const api = "https://v2-api.obilet.com/api";

const getData = async (url, params) => {
  try {
    const res = await fetch(`${api}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic JEcYcEMyantZV095WVc3G2JtVjNZbWx1",
      },
      body: JSON.stringify({
        "device-session": {
          "session-id": "PqtdftjloK3Kpka97+ILDzMa6D9740nggLiTzXiLlzA=",
          "device-id": "PqtdftjloK3Kpka97+ILDzMa6D9740nggLiTzXiLlzA=",
        },
        language: "tr-TR",
        data: params || null,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    loader.classList.add("hide");
  }
};

export default getData;
