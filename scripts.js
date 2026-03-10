// endpoint da API
const API_URL = "http://localhost:8000/predict";

// captura o formulário
const form = document.querySelector("#wellness-form");

// função para converter o formulário em JSON
function formToJSON(formElement) {
  const formData = new FormData(formElement);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = Number(value); // converte para número (necessário para ML)
  }

  return data;
}

// função que chama a API
async function sendPrediction(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Erro ao consumir API:", error);
    throw error;
  }
}

// handler do submit
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = formToJSON(form);

  console.log("Dados enviados:", data);

  try {
    const result = await sendPrediction(data);

    console.log("Resposta da API:", result);

    document.querySelector("#resultado").innerText =
      `Burnout Risk: ${result.prediction}`;

  } catch (error) {
    document.querySelector("#resultado").innerText =
      "Erro ao processar a requisição.";
  }
});