const styles = (theme) => ({
  main: {
    width: "auto",
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    justifyContent: "center",
    height: "auto",
    [theme.breakpoints.up("md")]: {
      width: 1200,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  query: {
    width: "100%",
    padding: 0,
  },
  paper: {
    backgroundColor: "#e9ecef",
    marginTop: theme.spacing.unit * 8,
    width: "auto",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    marginLeft: "0",
    marginRight: "0",
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: "#5eaaa8",
  },
});
export default styles;
