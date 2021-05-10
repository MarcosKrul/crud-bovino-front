import Switch from '@material-ui/core/Switch';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
            width: '100%',
            color: 'black',
            backgroundColor: '#fff',
        },
        table: {
            marginTop: '30px',
            width: '100%'
        },
        pagination: {
            display: 'flex',
            marginTop: '30px',
            alignItems: 'center',
            justifyContent: 'center',
        },

        loadingContainer: {
            width: '97%',
            height: '70vh',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        },

        handleErrorEmpty: {
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
    expandContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    menuButton: {
        border: 0,
        width: '100%',
        padding: '0 5px',
        backgroundColor: 'white',
    },
    modal: {
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
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

export const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

export const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);