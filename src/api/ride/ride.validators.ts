import { z } from "zod";

export const rideEstimateValidator = z.object({
    customer_id: z.string().min(1, "O id do usuário não pode estar em branco"),
    origin: z.string().min(1, "Os endereços de origem e destino não podem estar em branco"),
    destination: z.string().min(1, "Os endereços de origem e destino não podem estar em branco")
});