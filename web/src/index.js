import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material';
// import { ToastProvider } from './components/Toast'
import SystemProvider from './store/systemcontext';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: "#92b611",
      dark: "#fff",
      light: "#fff"
    },
    // secondary: "#fff",
  },

  components: {
    MuiButton: {
      defaultProps: {
        size: 'medium',
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: 8,
          textTransform: 'unset',
          '.MuiButton-endIcon>*:nth-of-type(1)': {
            height: 20,
            width: 20,
          }
        },
        contained: {
          ':hover': {
            boxShadow: 'none',
          }
        },
        sizeLarge: { padding: '14px 16px' },
        sizeMedium: { padding: '10px 16px' },
        sizeSmall: { padding: '6px 12px', fontSize: 12 },
      }
    },
    MuiIconButton: {
      defaultProps: {
        color: 'secondary'
      },
      variants: [
        {
          props: { varient: 'outlined' },
          style: {
            border: '1px solid',
            borderRadius: 8,
            'svg': {
              width: 18,
              height: 18,
            }
          }
        }
      ]
    },
    MuiToolbar: {
      defaultProps: {
        variant: 'dense'
      },
      styleOverrides: {
        regular: (state) => {
          return {
            [state.theme.breakpoints.up('sm')]: {
              minHeight: 72,
            }
          }
        }
      }
    },
    MuiTypography: {
      defaultProps: {
        variant: 'uiLarge',
        variantMapping: {
          uiLarge: 'p',
          uiMedium: 'p',
          uiSmall: 'p'
        }
      }
    },
    MuiTooltip: {
      defaultProps: {
        placement: 'top',
      }
    },
    // default medium is 1.5rem
    MuiIcon: {
      styleOverrides: {
        fontSizeSmall: '1rem',
        fontSizeLarge: '2rem',
      }
    },
    MuiFormControl: {
      styleOverrides: {
        marginDense: { marginBottom: 24 }
      }
    },
    MuiInputBase: {
      defaultProps: {

      },
      styleOverrides: {
        root: {
          fontSize: 14,
          '&.MuiInputBase-multiline': { padding: 0 }
        },
        input: {
          '&.MuiInputBase-input': {
            padding: '12px',
            // lineHeight: 1,
            '&.MuiInputBase-inputSizeSmall': {
              padding: '8px 12px'
            },
            '&.MuiInputBase-inputMultiline': {
              // lineHeight: 1.5
            }
          }
        },

      }
    },
    // MuiSelect: {

    // },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
        fullWidth: true
      },
      styleOverrides: {
        root: {
          '&.MuiFormControl-marginDense': {
            marginBottom: 24,
          },
        }
      }
    }
  },
});


root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <ToastProvider> */}
      <BrowserRouter>
        <SystemProvider> <App /></SystemProvider>

      </BrowserRouter>
      {/* </ToastProvider> */}
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
