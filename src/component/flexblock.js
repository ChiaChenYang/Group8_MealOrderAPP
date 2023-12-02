import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CenteredContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});

function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={3}>
        <CenteredContent>
          <HomeIcon />
        </CenteredContent>
        <Item>健康</Item>
      </Grid>
      <Grid item xs={3}>
        <CenteredContent>
          <HomeIcon />
        </CenteredContent>
        <Item>台式</Item>
      </Grid>
      <Grid item xs={3}>
        <CenteredContent>
          <HomeIcon />
        </CenteredContent>
        <Item>韓式</Item>
      </Grid>
      <Grid item xs={3}>
        <CenteredContent>
          <HomeIcon />
        </CenteredContent>
        <Item>義式</Item>
      </Grid>
    </React.Fragment>
  );
}

export default function NestedGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} direction="column">
        <Grid container item spacing={1}>
          <FormRow />
        </Grid>
      </Grid>
    </Box>
  );
}
