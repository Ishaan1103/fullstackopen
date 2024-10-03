import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useParams} from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";



const SinglePage = ()=>{
  const [patient,setPatient] = useState<Patient|null>(null);
  const {id} = useParams<{ id: string }>();
  useEffect(()=>{
    const gettingDate = async(id:string)=>{
      try {
        if (id) {
          const response = await patientService.getSingle(id);
          setPatient(response as Patient);
        }
      } catch (error:unknown) {
        console.log(error);
      }
    };
    if (id) {
      void gettingDate(id);
    }
  },[]);
  if (!patient) {
    return <>Not Found</>;
  }
  return(
    <div>
      <Typography variant="h4">{patient.name}<span>
        {patient.gender === 'male' && <MaleIcon/>}
        {patient.gender === 'female' && <FemaleIcon/>}
        {patient.gender === 'other' && <TransgenderIcon/>}
        </span>
        </Typography>
        <p>
          ssn:{patient.ssn} <br />
          occupation:{patient.occupation}
        </p>
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
            <Route path="/patients/:id" element={<SinglePage />}/>
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
