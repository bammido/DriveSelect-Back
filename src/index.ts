import { rideRouter } from "./api/ride/ride.router";
import { app } from "./app";

app.use('/ride', rideRouter)

app.listen(8080, () => {
    console.log(`Server rodando http://localhost:${8080}`);
})