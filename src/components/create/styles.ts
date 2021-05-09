import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        },
        form: {
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'repeat(6, 1fr)',
            gridTemplateColumns: 'repeat(2, 1fr)'
        },
        input: {
            width: '80%',
            maxWidth: '600px',
            color: 'black',
            margin: '10px',
            backgroundColor: '#fff',
        },
        title: {
            width: 'auto',
            fontSize: '1.4rem',
            marginBottom: '40px'
        },
        button: {
            width: '70%',
            maxWidth: '900px',
            margin: '20px'
        },
        handleErrorSuccess: { 
            width: '70%',
            maxWidth: '900px',
            gridColumn: '1/3',
            justifySelf: 'center', 
        },
        "@media (max-width: 1000px)": {
            input: { width: '90%' },
            button: { width: '90%' },
            handleErrorSuccess: { width: '90%' } 
        },
        "@media (max-width: 600px)": {
            button: { margin: '10px' },
            form: {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
            }
        }
    })
);

export default useStyles;