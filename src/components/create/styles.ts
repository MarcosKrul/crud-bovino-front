import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
            maxWidth: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        },
        form: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        input: {
            width: '60%',
            color: 'black',
            margin: '10px',
            backgroundColor: '#fff',
        },
        title: {
            fontSize: '1.4rem',
            marginBottom: '40px'
        },
        button: {
            width: '60%',
            margin: '20px'
        }

        // table: {
        //     maxWidth: '97%',
        //     marginTop: '30px',
        // },
        // pagination: {
        //     display: 'flex',
        //     marginTop: '30px',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        // },

        // "@keyframes loadingAnimation": {
        //     "100%": { transform: 'rotate(1turn)' }
        // },

        // loadingContainer: {
        //     width: '97%',
        //     height: '70vh',
        //     display: 'flex',
        //     flexDirection: 'row',
        //     justifyContent: 'center',
        // },
        // loading: {
        //     width: '200px',
        //     height: '200px',
        //     borderRadius: '50%',
        //     alignSelf: 'center',
        //     borderTopColor: 'white',
        //     border: '15px solid blue',
        //     animation: `$loadingAnimation 1s infinite`
        // }
    })
);

export default useStyles;