import express, { Router } from 'express'
import RideController from './ride.controller'

export const rideRouter: Router = express.Router()
const rideController = new RideController()

rideRouter.patch('/confirm', rideController.confirm)
rideRouter.post('/estimate', rideController.estimate)
rideRouter.get('/:customer_id', rideController.getRide)