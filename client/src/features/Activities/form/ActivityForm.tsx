import { Button, Form, FormInput, FormTextArea, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../models/activity";
import LoadingComponents from "../../../app/layout/loadingComponents";
import {v4 as uuid} from "uuid";

export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity])

    function handleSubmit() {
        if(!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if(loadingInitial) return <LoadingComponents content="Loading activity"/>

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <FormInput placeholder="Title" value={activity.title} name="title" onChange={handleInputChange}/>
                <FormTextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange}/>
                <FormInput placeholder="Category" value={activity.category} name="category" onChange={handleInputChange}/>
                <FormInput type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange}/>
                <FormInput placeholder="City" value={activity.city} name="city" onChange={handleInputChange}/>
                <FormInput placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange}/>
                <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
                <Button as={Link} to='/activities' floated="right" type="submit" content="Cancel"/>
            </Form>
        </Segment>
    )
})