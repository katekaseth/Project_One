import { createMuiTheme } from '@material-ui/core/styles';

export const COLORS = {
    PURPLE: '#4b2e83',
    GOLD: '#b7a57a',
    DARK_GOLD: '#85754d',
    BACKGROUND_GREY: '#E5E5E5',
}
export const THEME = createMuiTheme({
  palette: {
    primary: {
        main: COLORS.PURPLE,
    },
    secondary: {
        main: COLORS.GOLD,
    }
  },
});