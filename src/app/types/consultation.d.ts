import { Reservation } from "./reservation"

export type Consultation = {
    date: Date,
    timeslot: number,
    type: 'consultation' | 'absence',
    reserved: boolean,
    reservation?: Reservation
}
export type ConsultationResponse = {
    date: string,
    timeslot: number,
    type: 'consultation' | 'absence',
    reserved: boolean,
    reservation?: Reservation
}