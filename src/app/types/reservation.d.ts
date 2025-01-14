export type Reservation = {
  firstConsultationId: string;
  consultationLength: number;
  consultationType: string;
  note: string;
  patientData: {
    name: string;
    age: number;
    gender: string;
  };
};
