const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    height: 520,
    [theme.breakpoints.up("md")]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    backgroundColor: "#e9ecef",
    marginTop: theme.spacing.unit * 8,
    height: 520,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
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
