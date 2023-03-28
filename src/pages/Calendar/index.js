import React from "react";


import List from "./List";
import { default as Scheduler } from "./SchedulerView";
import appointments from "./today-appointments";

import { createTheme, Pivot, PivotItem, ThemeProvider } from "@fluentui/react";

const myTheme = createTheme({
	palette: {
		themePrimary: "#0078d4",
		themeLighterAlt: "#eff6fc",
		themeLighter: "#deecf9",
		themeLight: "#c7e0f4",
		themeTertiary: "#71afe5",
		themeSecondary: "#2b88d8",
		themeDarkAlt: "#106ebe",
		themeDark: "#005a9e",
		themeDarker: "#004578",
		neutralLighterAlt: "#faf9f8",
		neutralLighter: "#f3f2f1",
		neutralLight: "#edebe9",
		neutralQuaternaryAlt: "#e1dfdd",
		neutralQuaternary: "#d0d0d0",
		neutralTertiaryAlt: "#c8c6c4",
		neutralTertiary: "#a19f9d",
		neutralSecondary: "#605e5c",
		neutralPrimaryAlt: "#3b3a39",
		neutralPrimary: "#323130",
		neutralDark: "#201f1e",
		black: "#000000",
		white: "#ffffff"
	}
});



function Calendar() {

	return (
		<ThemeProvider applyTo="body" theme={myTheme}>
			<Pivot>
				<PivotItem headerText="Calendar">
					<Scheduler data={appointments} />
				</PivotItem>
				<PivotItem headerText="List">
					<List data={appointments} />
				</PivotItem>
			</Pivot>
		</ThemeProvider>
	);
}

export default Calendar;
