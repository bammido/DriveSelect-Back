import { Request, Response } from "express";
import { rideRouter } from "./api/ride/ride.router";
import { app } from "./app";

app.use('/ride', rideRouter)

app.get('/health', (req: Request, res: Response) => {
    res.status(200).send()
})

app.listen(8080, () => {
    console.log(`Server rodando http://localhost:${8080}`);
})