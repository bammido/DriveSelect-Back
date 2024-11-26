import express, { Router } from 'express'
import RideController from './ride.controller'

export const rideRouter: Router = express.Router()
const rideController = new RideController()

rideRouter.post('/estimate', rideController.estimate)
rideRouter.patch('/confirm', rideController.estimate)