import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import UpcomingTable from "./UpcomingTable";
import LiveTable from "./LiveTable";
import PastTable from "./PastTable";
import { data } from "../DataStore/tableData";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function TabsContainers() {
  const classes = useStyles();

  const [state, setState] = React.useState({ value: 0, dataTable: data });

  const handleChange = (event, newValue) => {
    setState({ ...state, value: newValue });
  };

  const handleChangeIndex = (index) => {
    setState({ ...state, value: index });
  };

  const handleDateChange = (e, d) => {
    const updateItem = (d, itemAttributes) => {
      var index = state.dataTable.findIndex((x) => x.id === d.id);
      if (index === -1) console.log("Error");
      else {
        setState({
          value: state.value,
          dataTable: [
            ...state.dataTable.slice(0, index),
            Object.assign({}, state.dataTable[index], itemAttributes),
            ...state.dataTable.slice(index + 1),
          ],
        });
      }
    };

    const updatedval = new Date(e.target.value).getTime();
    const upadtedobj = { createdOn: updatedval };

    updateItem(d, upadtedobj);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={state.value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered={true}
        >
          <Tab label="Upcoming Campaigns" {...a11yProps(0)} />
          <Tab label="Live Campaigns" {...a11yProps(1)} />
          <Tab label="Past Campaigns" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={state.value} index={0}>
        <UpcomingTable
          data={state.dataTable}
          handleDateChange={handleDateChange}
        />
      </TabPanel>
      <TabPanel value={state.value} index={1}>
        <LiveTable data={state.dataTable} handleDateChange={handleDateChange} />
      </TabPanel>
      <TabPanel value={state.value} index={2}>
        <PastTable data={state.dataTable} handleDateChange={handleDateChange} />
      </TabPanel>
    </div>
  );
}
