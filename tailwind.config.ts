import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			backgroundImage: {
				"custom-gradient":
					"linear-gradient(to right, #FF008A 0%, #EA74FD 25%, #93FFB1 50%, #FCFF81 75%, #6DFFFF 100%)",
			},
			colors: {
				yellow: "#FEE500",
				"yellow-600": "#E6D00C",
				"yellow-600-80a": "#E6D00C",
				pearl: "#DFDFDF",
				"pearl-200": "#D6D6D6",
				pink: "#FF0078",
				"pink-200": "#FF4FA2",
				"pink-600": "#E6006C",
				"pink-800": "#930F4D",
				blue: "#0201FF",
				black: "#161616",
				"black-600": "#3E3E3E",
				"purple-grey": "#9A86A9",
				"purple-grey-600": "#6B577B",
				"purple-grey-800": "#493758",
				purple: "#9722C9",
				"purple-400": "#B13FE3",
				"purple-600": "#6E0E97",
				"purple-800": "#4F066E",
				cream: "#FFFEED",
				"cream-400": "#FBFAE0",
				"cream-800": "#E9E8C9",
				"green-200": "#00FF19",
				"green-800": "#011601",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
