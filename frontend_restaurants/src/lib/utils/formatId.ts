export default function formatId(id: number) {
	// Format id into eight digit with trailing zero
	// 123 -> #00000123
	// 1234 -> #00001234
	const stringId = id.toString();
	const formatId = stringId.padStart(8, '0');
	return '#' + formatId;
}
