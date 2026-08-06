import { createTheme } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";
import shadows from "./shadows";
import components from "./components";

const theme = createTheme({

    palette,

    typography,

    shadows,

    components

});

export default theme;