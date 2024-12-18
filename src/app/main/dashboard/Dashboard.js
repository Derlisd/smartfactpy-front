import FusePageSimple from '@fuse/core/FusePageSimple';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import HomeTab from './tabs/HomeTab';

const useStyles = makeStyles((theme) => ({
  content: {
    '& canvas': {
      maxHeight: '100%',
    },
  },
}));

function ProjectDashboardApp(props) {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);

  const classes = useStyles(props);
  const pageLayout = useRef(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  if (_.isEmpty(widgets)) {
    return null;
  }

  return (
    <FusePageSimple
      classes={{
        header:
          'min-h-160 h-160 lg:ltr:rounded-br-20 lg:rtl:rounded-bl-20 lg:ltr:mr-12 lg:rtl:ml-12',
        toolbar: 'min-h-56 h-56 items-end',
        rightSidebar: 'w-288 border-0 py-12',
        content: classes.content,
      }}
      header={<DashboardHeader pageLayout={pageLayout} />}
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="off"
          className="w-full px-24 -mx-4 min-h-40"
          classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
          TabIndicatorProps={{
            children: <Divider className="w-full h-full rounded-full opacity-50" />,
          }}
        >
          {/*<Tab
            className="text-14 font-semibold min-h-40 min-w-64 mx-4"
            disableRipple
            label="Budget Summary"
          />
          <Tab
            className="text-14 font-semibold min-h-40 min-w-64 mx-4"
            disableRipple
            label="Team Members"
          />*/}
        </Tabs>
      }

      rightSidebarContent={<DashboardSidebar />}
      ref={pageLayout}
    />
  );
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);
