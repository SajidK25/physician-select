import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: 13,
    fontWeight: 500,
  },
  item: {
    fontSize: 11,
    fontWeight: 300,
    marginLeft: theme.spacing(2),
  },
  headingsWithText: {
    fontSize: 11,
    marginLeft: theme.spacing(2),
  },
  text: {
    fontSize: 11,
    marginLeft: theme.spacing(4),
  },
  container: {
    flex: 1,
    overflow: "auto",
    padding: "4px 8px",
  },
}));

export const Heading = ({ heading }) => {
  const classes = useStyles();

  return <Typography className={classes.heading}>{heading}</Typography>;
};

export const HeadingWithText = ({ heading, text, isRed = false }) => {
  const classes = useStyles();

  return (
    <>
      <Typography
        color={isRed ? "error" : "inherit"}
        className={classes.headingsWithText}
      >
        <b>{heading}:</b> {text}
      </Typography>
    </>
  );
};

export const Text = ({ text, isRed = true }) => {
  const classes = useStyles();

  return (
    <>
      {text && (
        <Typography
          color={isRed ? "error" : "inherit"}
          className={classes.text}
        >
          {text}
        </Typography>
      )}
    </>
  );
};

export const Item = ({ text }) => {
  const classes = useStyles();
  return <Typography className={classes.item}>{text}</Typography>;
};

const QueItem = (props) => {
  const { options, heading, text } = props;

  return (
    <>
      <Heading heading={heading} />
      {options.map((o) => (
        <React.Fragment key={o.item}>
          <Item text={o.item} />
          <Text text={text} />
        </React.Fragment>
      ))}
    </>
  );
};

export const CheckBox = (props) => {
  const { answer, option, text } = props;
  const classes = useStyles();
  const color = option === "None" ? "textPrimary" : "error";

  return (
    answer && (
      <>
        <Typography color={color} className={classes.item}>
          {option}
        </Typography>
        <Text text={text} />
      </>
    )
  );
};

export const RadioOption = (props) => {
  const { choices, answer, text } = props;
  const options = [];

  console.log(choices);
  console.log(answer);
  console.log(choices.heading);

  const choice = choices.options.find((c) => c.id === answer);
  if (!choice) return null;
  options.push({ item: choice.label });

  return <QueItem heading={choices.heading} options={options} text={text} />;
};

export const YesNoRadio = ({ heading, answer, text }) => {
  const choices = {
    heading: heading,
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
  };
  const test = answer.toLowerCase();

  return <RadioOption choices={choices} answer={test} text={text} />;
};

export const AnythingElse = ({ q }) => (
  <YesNoRadio
    heading="Anything Else"
    answer={q.anythingElse.answer}
    text={q.anythingElse.explain}
  />
);

export const UnderConstruction = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <p>Under Construction</p>
    </Paper>
  );
};
