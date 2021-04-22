import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: { display: 'flex' },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            }
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: { width: drawerWidth },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        }
    })
);

export default useStyles;