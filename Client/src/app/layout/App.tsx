import {useEffect, useState } from "react";
import { CssBaseline, Container, Box } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar"
import ActivityDashboard from "../../features/activities/Dashboard/ActivityDashboard";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    
    useEffect(() => {
        axios.get<Activity[]>('https://localhost:5001/api/activities')
            .then(response => setActivities(response.data))
    }, [])
    
    return (
        <Box sx={{bgcolor: '#eeeeee'}}>
            <CssBaseline />
            <NavBar />
            <Container maxWidth={false} sx={{mt: 3}}>
                <ActivityDashboard activities={activities}/>
            </Container>
        </Box>
    )
}

export default App
