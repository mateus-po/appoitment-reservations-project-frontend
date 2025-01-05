export type Consultation = {
    date: Date,
    timeslot: number,
    type: 'consultation' | 'absence'
}
export type ConsultationResponse = {
    date: string,
    timeslot: number,
    type: 'consultation' | 'absence'
}