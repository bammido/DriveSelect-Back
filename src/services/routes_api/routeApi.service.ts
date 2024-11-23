import { v2 } from "@googlemaps/routing"
import { IcallComputeRoutesArgs } from "./routeApi.dto";

export default class RouteApiService {
    private routingClient = new v2.RoutesClient()

    async callComputeRoutes({ origin, destination }: IcallComputeRoutesArgs) {
        const request = {
          origin,
          destination,
        };

        const response = await this.routingClient.computeRoutes(request, {
          otherArgs: {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": "YOUR_API_KEY",
              "X-Goog-FieldMask":
                "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
            },
          },
        });
        console.log(response);

        return response
    }
}