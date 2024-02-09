export class Slug {
	public value: string;

	constructor(value: string) {
		this.value = value;
	}

	/**
	 * Receives a string and normalize it as a slug
	 *
	 * Example: "An example title" => "an-example-title"
	 *
	 * @param text {string}
	 */
	static createFromText(text: string) {
		const GET_ALL_WHITE_SPACE_REGEX = /\s+/g;
		const GET_ALL_NO_WORDS_REGEX = /[^\w-]+/g;
		const GET_ALL_UNDERLINE_REGEX = /_/g;
		const GET_ALL_DOUBLE_DASH_REGEX = /--+/g;
		const GET_DASH_IN_LAST_CHARACTER_REGEX = /-$/g;

		const slugText = text
			.normalize("NFKD")
			.toLowerCase()
			.trim()
			.replace(GET_ALL_WHITE_SPACE_REGEX, "-")
			.replace(GET_ALL_NO_WORDS_REGEX, "")
			.replace(GET_ALL_UNDERLINE_REGEX, "-")
			.replace(GET_ALL_DOUBLE_DASH_REGEX, "-")
			.replace(GET_DASH_IN_LAST_CHARACTER_REGEX, "");

		return new Slug(slugText);
	}
}
