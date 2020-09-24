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

export const HeadingWithText = ({ heading, text, isRed }) => {
  const classes = useStyles();

  return (
    <>
      <Typography color={isRed ? "error" : "inherit"} className={classes.headingsWithText}>
        <b>
          {heading}
          {text ? `:` : ``}
        </b>{" "}
        {text}
      </Typography>
    </>
  );
};

HeadingWithText.defaultProps = {
  isRed: false,
};

export const HeadingWithOptions = ({ heading, value, options, isRed }) => {
  const option = options.find((c) => c.id.toLowerCase() === value.toLowerCase());
  if (!option) return null;

  return <HeadingWithText heading={heading} text={option.label} isRed={isRed} />;
};

HeadingWithOptions.defaultProps = {
  isRed: false,
};

export const HeadingWithYesNo = ({ heading, value, isRed }) => {
  const options = [
    { id: "yes", label: "Yes" },
    { id: "no", label: "No" },
  ];

  return <HeadingWithOptions heading={heading} options={options} value={value} isRed={isRed} />;
};

HeadingWithYesNo.defaultProps = {
  isRed: false,
};

export const Text = (props) => {
  const { text, isRed } = props;
  const classes = useStyles();

  return (
    <>
      {text && (
        <Typography color={isRed ? "error" : "inherit"} className={classes.text}>
          {text}
        </Typography>
      )}
    </>
  );
};

Text.defaultProps = {
  isRed: true,
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

export const CheckBox = ({ answer, option, text, isRed }) => {
  if (!answer) return null;

  const shouldBeRed = option !== "None" || isRed === true;

  return answer && <HeadingWithText heading={option} text={text} isRed={shouldBeRed} />;
};

CheckBox.defaultProps = {
  isRed: false,
};

export const RadioOption = (props) => {
  const { choices, answer, text } = props;
  const options = [];

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
  if (test === "no") text = "";

  return <RadioOption choices={choices} answer={test} text={text} />;
};

export const AnythingElse = ({ q }) => (
  <YesNoRadio heading="Anything Else" answer={q.anythingElse.answer} text={q.anythingElse.explain} />
);

export const UnderConstruction = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <p>Under Construction</p>
    </Paper>
  );
};
