// HalfRating.js
import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";

const BiggerRating = styled(Rating)({
  fontSize: "3rem",
});

const HalfRating = ({ onRatingChange }) => {
  return (
    <Stack spacing={2}>
      <BiggerRating
        name="half-rating"
        defaultValue={5}
        precision={0.5}
        onChange={(event, newValue) => onRatingChange(newValue)}
      />
    </Stack>
  );
};

export default HalfRating;
