import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

export const ThemeChanger = ({
	...props
}: React.ComponentPropsWithoutRef<typeof IconButton>) => {
	const { theme, systemTheme, setTheme } = useTheme();

	return (
		<>
			<style>{`
        :root, .light, .light-theme {
          --theme-toggle-sun-icon-display: block;
          --theme-toggle-moon-icon-display: none;
        }
        .dark, .dark-theme {
          --theme-toggle-sun-icon-display: none;
          --theme-toggle-moon-icon-display: block;
        }
      `}</style>

			<IconButton
				size="2"
				variant="ghost"
				color="gray"
				onClick={() => {
					// Set 'system' theme if the next theme matches the system theme
					const resolvedTheme = theme === "system" ? systemTheme : theme;
					const newTheme = resolvedTheme === "dark" ? "light" : "dark";
					const newThemeMatchesSystem = newTheme === systemTheme;
					setTheme(newThemeMatchesSystem ? "system" : newTheme);
				}}
				{...props}
			>
				<SunIcon
					width="20"
					height="20"
					style={{ display: "var(--theme-toggle-sun-icon-display)" }}
				/>
				<MoonIcon
					width="20"
					height="20"
					style={{ display: "var(--theme-toggle-moon-icon-display)" }}
				/>
			</IconButton>
		</>
	);
};
