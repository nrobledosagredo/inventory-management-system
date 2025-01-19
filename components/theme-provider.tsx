"use client";

import * as React from "react";
import {
  ThemeProvider as AmplifyThemeProvider,
  defaultDarkModeOverride,
} from "@aws-amplify/ui-react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const theme = {
    name: "dark",
    overrides: [defaultDarkModeOverride],
    tokens: {
      components: {
        authenticator: {
          router: {
            backgroundColor: "hsl(20 14.3% 4.1%)",
            borderColor: "hsl(20.4 89.3% 33.9%)",
          },
          form: {},
        },
        button: {
          primary: {
            color: "hsl(20 14.3% 4.1%)",
            backgroundColor: "hsl(24.6 95% 53.1%)",
            _hover: {
              backgroundColor: "hsl(20.4 89.3% 33.9%)",
            },
            _disabled: {
              backgroundColor: "hsl(20.4 89.3% 33.9%)",
            },
            _active: {
              backgroundColor: "hsl(20.4 89.3% 33.9%)",
            },
            _focus: {
              backgroundColor: "hsl(20.4 89.3% 33.9%)",
            },
            _pressed: {
              backgroundColor: "hsl(20.4 89.3% 33.9%)",
            },
          },
          link: {
            color: "hsl(24.6 95% 53.1%)",
            _hover: {
              backgroundColor: "hsl(20 14.3% 4.1%)",
              color: "hsl(20.4 89.3% 33.9%)",
            },
          },
        },
        fieldcontrol: {
          _focus: {
            borderColor: "hsl(24.6 95% 53.1%)",
            boxShadow: "0 0 0 2px hsl(24.6 95% 53.1%)",
          },
          borderColor: "hsl(24.6 95% 53.1%)",
        },
        tabs: {
          item: {
            _active: {
              color: "hsl(24.6 95% 53.1%)",
              borderColor: "hsl(24.6 95% 53.1%)",
            },
            _hover: {
              color: "hsl(24.6 95% 53.1%)",
            },
            _panel: {
              backgroundColor: "hsl(20 14.3% 4.1%)",
            },
            borderColor: "hsl(20.4 89.3% 33.9%)",
          },
        },
      },
    },
  };

  return (
    <NextThemesProvider {...props}>
      <AmplifyThemeProvider colorMode="dark" theme={theme}>
        {children}
      </AmplifyThemeProvider>
    </NextThemesProvider>
  );
}
