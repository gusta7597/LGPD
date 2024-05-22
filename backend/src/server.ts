import { app } from "./app";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`template_api.backend inicou em http://localhost:${PORT}.`))

process.on("SIGINT", () => {
    server.close();
    console.log("Back-end finalizado.");
});