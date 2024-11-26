import { z } from "zod";

export const rideEstimateValidator = z.object({
    customer_id: z.string().min(1, "O id do usuário não pode estar em branco"),
    origin: z.string().min(1, "Os endereços de origem e destino não podem estar em branco"),
    destination: z.string().min(1, "Os endereços de origem e destino não podem estar em branco")
});

export const rideConfirmValidator = z.object({
    customer_id: z.string().min(1, "O id do usuário não pode estar em branco"),
    origin: z.string().min(1, "Os endereços de origem e destino não podem estar em branco"),
    destination: z.string().min(1, "Os endereços de origem e destino não podem estar em branco"),
    distance: z.number({  message: 'distancia inválida'}),
    duration: z.string().min(1, "a duração não pode estar em branco"),
    driver: z.object({
        id: z.number({ message: "id do motorista inválido" }),
        name: z.string().min(1, "O id do usuário não pode estar em branco")
    }),
    value: z.number()
});