const components = {

    MuiButton: {

        styleOverrides: {

            root: {

                borderRadius: 12,

                textTransform: "none",

                fontWeight: 600,

                padding: "10px 20px"

            }

        }

    },

    MuiCard: {

        styleOverrides: {

            root: {

                borderRadius: 16,

                border: "1px solid #E5E7EB",

                boxShadow: "0 4px 12px rgba(0,0,0,.05)"

            }

        }

    },

    MuiTextField: {

        defaultProps: {

            fullWidth: true

        }

    },

    MuiOutlinedInput: {

        styleOverrides: {

            root: {

                borderRadius: 12,

                background: "#fff"

            }

        }

    },

    MuiPaper: {

        styleOverrides: {

            rounded: {

                borderRadius: 16

            }

        }

    }

};

export default components;