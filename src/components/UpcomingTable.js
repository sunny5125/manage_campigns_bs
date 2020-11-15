import React from "react";
import { Typography, Button } from "@material-ui/core";
import Modal from "./Modal";
import FileIcon from "../images/file.png";
import ReportIcon from "../images/statistics-report.png";
import CalenderIcon from "../images/calendar.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: 'none',

  },
}));

export default function UpcomingTable(props) {
  const classes = useStyles();
  return (
    <>
      <table border="1" className={classes.table}>
        <tr>
          <th>DATE</th>
          <th>CAMPAIGN</th>
          <th>VIEW</th>
          <th>ACTIONS</th>
        </tr>

        {props.data
          .filter((val) => {
            const date = new Date();
            const nicedate = new Date(
              date.getTime() - date.getTimezoneOffset() * 60000
            )
              .toJSON()
              .split("T")[0];
            const todaydate = new Date(nicedate).getTime();

            if (val.createdOn - todaydate > 0) return true;

            return false;
          })
          .map((d) => {
            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];

            return (
              <tr>
                <td>
                  <Typography>
                    {monthNames[
                      parseInt(
                        new Date(d.createdOn)
                          .toISOString()
                          .split("T")[0]
                          .split("-")[1]
                      )
                    ] +
                      " " +
                      new Date(d.createdOn)
                        .toISOString()
                        .split("T")[0]
                        .split("-")[0] +
                      ", " +
                      new Date(d.createdOn)
                        .toISOString()
                        .split("T")[0]
                        .split("-")[2]}
                  </Typography>
                  <Typography variant="caption">
                    {" "}
                    {Math.floor(
                      (d.createdOn -
                        new Date(
                          new Date(Date.now()).toISOString().split("T")[0]
                        ).getTime()) /
                        86400000
                    )}{" "}
                    &nbsp; Days Ahead{" "}
                  </Typography>
                </td>

                <td>
                  <table border="0">
                    <tr>
                      <td rowSpan="2">
                        <img
                          src={d.image_url}
                          height="50px"
                          width="50px"
                        />
                      </td>
                      <td>{d.name}</td>
                    </tr>
                    <tr>
                      <td>{d.region}</td>
                    </tr>
                  </table>
                </td>
                <td>
                  <Modal data={d} />
                </td>
                <td>
                  <Button varient="small">
                    <img src={FileIcon} height="25px" width="20px" />
                    CSV
                  </Button>
                  <Button>
                    <img src={ReportIcon} height="25px" width="20px" />
                    Report
                  </Button>
                  <Button>
                    <img src={CalenderIcon} height="25px" width="20px" />{" "}
                  </Button>

                  <input
                    type="date"
                    onChange={(e) => {
                      props.handleDateChange(e, d);
                    }}
                  />
                </td>
              </tr>
            );
          })}
      </table>
    </>
  );
}
