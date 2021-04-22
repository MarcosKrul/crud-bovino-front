import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            }
        },
        inputSearch: {
            width: '97%',
            color: 'black',
            backgroundColor: '#fff',
        },
        table: {
            marginTop: '30px',
            maxWidth: '97%'
        },
        pagination: {
            display: 'flex',
            marginTop: '30px',
            alignItems: 'center',
            justifyContent: 'center',
        },

        "@keyframes loadingAnimation": {
            "100%": { transform: 'rotate(1turn)' }
        },

        loadingContainer: {
            width: '97%',
            height: '70vh',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        loading: {
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            alignSelf: 'center',
            borderTopColor: 'white',
            border: '15px solid blue',
            animation: `$loadingAnimation 1s infinite`
        }
    })
);

export const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});