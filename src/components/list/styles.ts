import Switch from '@material-ui/core/Switch';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';


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
        },

        empty: {
            display: 'flex',
            color: '#4F4F4F',
            marginTop: '100px',
            fontStyle: 'italic',
            alignItems: 'center',
            justifyContent: 'center'
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

export const AntSwitch = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 28,
            height: 16,
            padding: 0,
            display: 'flex',
        },
        switchBase: {
            padding: 2,
            color: theme.palette.grey[500],
            '&$checked': {
                transform: 'translateX(12px)',
                color: theme.palette.common.white,
                '& + $track': {
                    opacity: 1,
                    backgroundColor: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                },
            },
        },
        thumb: {
            width: 12,
            height: 12,
            boxShadow: 'none',
        },
        track: {
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: theme.palette.common.white,
        },
        checked: {},
    }),
)(Switch);