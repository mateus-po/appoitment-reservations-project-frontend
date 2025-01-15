export type Reservation = {
  _id: string,
  firstConsultationId: string;
  consultationLength: number;
  consultationType: string;
  note: string;
  patientData: {
    name: string;
    age: number;
    gender: string;
  };
  cancelled: boolean;
  timeslot: number;
  date: string;
  doctorNickname: string;
};
