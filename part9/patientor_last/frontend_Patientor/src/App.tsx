import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import { Button, Divider, Container, Typography, Card, CardContent } from '@mui/material';
import { Patient, Entry, Diagnosis, OccupationalHealthcareEntry, HospitalEntry, HealthCheckEntry } from "./types";
import { apiBaseUrl } from "./constants";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import FavoriteIcon from '@mui/icons-material/Favorite';

const HospitalEntryDetails = ({ entry }: { entry: Entry }) => {
  const hospitalEntry = entry as HospitalEntry; // Type assertion
  return (
    <Card style={{ marginBottom: "1em" }}>
      <CardContent>
        <Typography variant="h6">{hospitalEntry.date} - Hospital Entry</Typography>
        <Typography>{hospitalEntry.description}</Typography>
        <Typography>Discharge Date: {hospitalEntry.discharge.date}</Typography>
        <Typography>Discharge Criteria: {hospitalEntry.discharge.criteria}</Typography>
      </CardContent>
    </Card>
  );
};

const OccupationalEntryDetails = ({ entry }: { entry: Entry }) => {
  const occupationalEntry = entry as OccupationalHealthcareEntry; // Type assertion
  return (
    <Card style={{ marginBottom: "1em" }}>
      <CardContent>
        <Typography variant="h6">{occupationalEntry.date} - Occupational Healthcare Entry</Typography>
        <Typography>Employer: {occupationalEntry.employerName}</Typography>
        <Typography>{occupationalEntry.description}</Typography>
        {occupationalEntry.sickLeave && (
          <Typography>Sick Leave: {occupationalEntry.sickLeave.startDate} - {occupationalEntry.sickLeave.endDate}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

const HealthCheckEntryDetails = ({ entry }: { entry: Entry }) => {
  const healthCheckEntry = entry as HealthCheckEntry; // Type assertion

  const healthRatingColor = (rating: number) => {
    switch (rating) {
      case 0: return "green";
      case 1: return "yellow";
      case 2: return "orange";
      case 3: return "red";
      default: return "grey";
    }
  };

  return (
    <Card style={{ marginBottom: "1em" }}>
      <CardContent>
        <Typography variant="h6">{healthCheckEntry.date} - Health Check Entry</Typography>
        <Typography>{healthCheckEntry.description}</Typography>
        <FavoriteIcon style={{ color: healthRatingColor(healthCheckEntry.healthCheckRating) }} />
      </CardContent>
    </Card>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export const assertNever = (entry: never): never => {
  throw new Error(`Unhandled case: ${JSON.stringify(entry)}`);
};

const SinglePage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]); // Specify Diagnosis type

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const gettingData = async (id: string) => {
      try {
        if (id) {
          const response = await patientService.getSingle(id);
          setPatient(response as Patient);
          const resDiagnoses = await patientService.getDiagnoses();
          setDiagnoses(resDiagnoses);
        }
      } catch (error: unknown) {
        console.log(error);
      }
    };
    if (id) {
      void gettingData(id);
    }
  }, [id]); // Add id to dependencies

  if (!patient) {
    return <>Not Found</>;
  }

  return (
    <div>
      <Typography variant="h4">{patient.name}
        {patient.gender === 'female' && <FemaleIcon/>}
        {patient.gender === 'male' && <MaleIcon/>}
        {patient.gender === 'other' && <TransgenderIcon/>}
      </Typography>
      <p>
        SSN: {patient.ssn} <br />
        Occupation: {patient.occupation}
      </p>
      <div>
        <Typography variant="h5"><b>Entries</b></Typography>
        <div>
          {patient?.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
          {patient?.entries.map((e) => (
            <div key={e.id}>
              <ul>
                {e.diagnosisCodes?.map((code) => {
                  const found = diagnoses.find(d => d.code === code);
                  if (!found) {
                    return null;
                  }
                  return (
                    <li key={code}>{code} {found.name}</li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<SinglePage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;

