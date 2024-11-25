import { IcallComputeRoutesArgs, IcallcomputeRoutesRes, RouteApiError } from "./routeApi.dto"
import { googleRouteApi } from "./googleRouteApi";

export default class RouteApiService {

    constructor() {
        this.callComputeRoutes = this.callComputeRoutes.bind(this);
    }

    async callComputeRoutes({ origin, destination }: IcallComputeRoutesArgs): Promise<IcallcomputeRoutesRes | RouteApiError> {
        try {
            const request = {
                origin,
                destination,
              };
      
              const response = await googleRouteApi.post<IcallcomputeRoutesRes>('/directions/v2:computeRoutes', request, {
                  headers: {
                      "Content-Type": "application/json",
                      "X-Goog-FieldMask": "routes.legs",
                      "X-Goog-Api-Key": process.env.GOOGLE_API_KEY
                  }
              })
      
              return response.data
        } catch (error: any) {
            if (error.response.status === 403) {
                return {
                    status: 403,
                    message: 'A chave api está faltando ou está inválida',
                    error: true,
                    originalMessage: error.response.data.error.message
                }
            }

            if(error.response.status == 400) {
                return {
                    status: 400,
                    message: 'Parametros inválidos',
                    error: true,
                    originalMessage: error.response.data.error.message
                }
            }

            return {
                status: 500,
                message: 'Erro no servidor',
                error: true,
                originalMessage: error.message
            }
        }

    }

    isRouteApiError(response: IcallcomputeRoutesRes | RouteApiError): response is RouteApiError {
        return (response as RouteApiError).error === true;
    }
}