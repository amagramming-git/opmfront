export const CUSTOMER_PASSWORD_VALIDATION = {
	required: "こちらは入力が必須です。",
	maxLength: {
		value: 16,
		message: "最大16文字まで入力可能です。",
	},
};
export const CUSTOMER_EMAIL_VALIDATION = {
	required: "こちらは入力が必須です。",
	pattern: {
		value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		message: "Invalid email format",
	},
};
export const CUSTOMER_USERNAME_VALIDATION = {
	required: "こちらは入力が必須です。",
	maxLength: {
		value: 16,
		message: "最大16文字まで入力可能です。",
	},
};
