import { Grid} from '@mui/material';
import WorkshopCard from './WorkshopCard.tsx';
import { WorkshopGridProps } from '@/components/Home/types';

const WorkshopGrid = ({ workshops, onWorkshopClick }: WorkshopGridProps) => {
    return (
        <Grid container spacing={3}>
            {workshops.map((workshop) => (
                <Grid
                    key={workshop.id}
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 4
                    }}>
                    <WorkshopCard workshop={workshop} onClick={onWorkshopClick} />
                </Grid>
            ))}
        </Grid>
    );
};

export default WorkshopGrid;