import React from 'react';
import { Drawer } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const makeClasses = makeStyles((theme: Theme) => ({
    drawerContent: {
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
    },
}));

interface IDrawerComponentProps {
    shouldBeOpen: boolean,
}

const DrawerComponent: React.FC<IDrawerComponentProps> = ({ shouldBeOpen }) => {
    const classes = makeClasses();
    const [isOpen, setIsOpen] = React.useState(false);
    const history = useHistory();

	interface RedirectToProps {
		path: string
		name: string
	}
	// FUNCTION
 	//const RedirectTo = (path: string, name: string) => <div onClick={() => history.push(path)}>{name}</div>

	// FUNCTIONAL COMPONENT
    const RedirectTo = ({path, name}: RedirectToProps) => <button onClick={() => history.push(path)}>{name}</button>

    return (
        <div>
            <Drawer
                open={isOpen || shouldBeOpen}
                onClose={() => setIsOpen(false)}
            >
                <div className={classes.drawerContent}>
                        <RedirectTo path="/" name="Home"/>
                        <RedirectTo path="/movie" name="Movie"/>
                        <RedirectTo path="/search" name="Search Movie"/>
                </div>
            </Drawer>
        </div>
    );
};

export default DrawerComponent;