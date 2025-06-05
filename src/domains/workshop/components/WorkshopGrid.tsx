import { Grid} from '@mui/material';
import WorkshopCard from './WorkshopCard';
import { WorkshopGridProps } from '../types';

const WorkshopGrid = ({ workshops, onWorkshopClick }: WorkshopGridProps) => {
    return (
        <Grid container spacing={3}>
            {workshops.map((workshop) => (
                <Grid item xs={12} sm={6} lg={4} key={workshop.id}>
                    <WorkshopCard workshop={workshop} onClick={onWorkshopClick} />
                </Grid>
            ))}
        </Grid>
    );
};

export default WorkshopGrid;