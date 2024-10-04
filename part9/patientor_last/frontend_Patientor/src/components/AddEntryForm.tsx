import { useState } from "react";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { HealthCheckRating, NewHealthCheckEntry, Patient } from "../types";
import axios from "axios";

interface AddEntryFormProps {
    patientId: string;
    onEntryAdded: (entry: Patient) => void;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ patientId, onEntryAdded }) => {
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
    const [specialist, setSpecialist] = useState("");
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newEntry: NewHealthCheckEntry = {
            date,
            description,
            specialist, // You can modify this to allow input
            type:'HealthCheck',
            healthCheckRating
        };

        // Send the new entry to the backend
        try {
            const response = await axios.post(`http://localhost:3001/api/patients/${patientId}/entries`, newEntry);
            if (!response.data) {
                throw new Error("Failed to add entry");
            }

            const addedEntry = await response.data as Patient;
            onEntryAdded(addedEntry);
        } catch (error) {
            console.error(error);
        }

        // Reset form
        setDate("");
        setDescription("");
        setSpecialist('');
        setHealthCheckRating(HealthCheckRating.Healthy);
    };

    return (
        <Card style={{ marginBottom: "1em" }}>
            <CardContent>
                <Typography variant="h5">Add New Entry</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ marginBottom: "1em" }}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={{ marginBottom: "1em" }}
                    />
                    <TextField
                        fullWidth
                        label="specialist"
                        value={specialist}
                        onChange={(e) => setSpecialist(e.target.value)}
                        required
                        style={{ marginBottom: "1em" }}
                    />
                    <TextField
                        fullWidth
                        label="Health Check Rating"
                        select
                        value={healthCheckRating}
                        onChange={(e) => setHealthCheckRating(Number(e.target.value) as HealthCheckRating)}
                        required
                        SelectProps={{
                            native: true,
                        }}
                        style={{ marginBottom: "1em" }}
                    >
                        {Object.entries(HealthCheckRating)
                            .filter(([_key, value]) => typeof value === 'number') // Only get the numeric values
                            .map(([key, value]) => (
                                <option key={value} value={value}>
                                    {key.replace(/([A-Z])/g, ' $1').trim()} {/* Format the enum key */}
                                </option>
                            ))}
                    </TextField>
                    <Button variant="contained" color="primary" type="submit">
                        Add Entry
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddEntryForm;
