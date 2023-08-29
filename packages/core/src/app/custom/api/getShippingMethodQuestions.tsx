/** *
 * Get all additional questions assigned to each shipping methods base on id.
 *
 * @param {Object} storeHash - The current storeHash of the store
 * @returns {Promise<object[]>} A promise resolving to the added product data.
 * @throws {Error} If the product cannot be added to the cart.
 */

export default async function getShippingMethodsQuestion(storeHash: string) {
	try {
		const response = await fetch(`https://tranzetta-bigcommerce-app.server.four13.dev/api/checkout-plus/public/${storeHash}/getQuestions`, {
			method: 'GET'
		});

		if (!response.ok) {
			throw new Error('Failed to load shipping questions. Please reload browser.');
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}